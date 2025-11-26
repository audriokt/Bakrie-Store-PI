package com.audrio.backendbakrie.utils.Exceptions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        String currentUser = "anonymous";
        String authorities = "none";
        try {
            var auth = org.springframework.security.core.context.SecurityContextHolder
                    .getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
                currentUser = auth.getName(); // biasanya email
                authorities = auth.getAuthorities().toString();
            }
        } catch (Exception ignored) {}

        String uri = request.getRequestURI();
        String method = request.getMethod();
        String clientIp = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        String timestamp = LocalDateTime.now().format(DTF);

        if (uri.contains("/error")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write("{\"error\": \"Forbidden\"}");
            return;
        }

        log.warn("""
            === ACCESS DENIED (403) DETECTED ===
            [{}] 403 Forbidden
            Time        : {}
            User        : {}
            Authorities : {}
            IP          : {}
            Method      : {} {}
            User-Agent  : {}
            Reason      : {}
            ========================================""",
                timestamp,
                timestamp,
                currentUser,
                authorities,
                clientIp,
                method, uri,
                userAgent != null ? userAgent : "Unknown",
                accessDeniedException.getMessage()
        );

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("""
            {
              "timestamp": "%s",
              "status": 403,
              "error": "Forbidden",
              "message": "Access denied. You do not have permission to access this resource.",
              "path": "%s",
              "required_roles": "Check your role/authority"
            }""".formatted(timestamp, uri));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip != null ? ip : "Unknown";
    }
}