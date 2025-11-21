package com.audrio.backendbakrie.utils.Exceptions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {

    private static final DateTimeFormatter DTF = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        String uri = request.getRequestURI();
        String method = request.getMethod();
        String clientIp = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        String authHeader = request.getHeader("Authorization");
        String timestamp = LocalDateTime.now().format(DTF);

        if (uri.contains("/error")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Unauthorized\"}");
            return;
        }

        String maskedAuth = (authHeader != null && authHeader.startsWith("Bearer "))
                ? "Bearer " + maskToken(authHeader.substring(7))
                : authHeader != null ? "Invalid/Malformed Header" : "Missing";

        log.warn("""
                === UNAUTHORIZED ACCESS DETECTED ===
                [{}] 401 Unauthorized
                Time      : {}
                IP        : {}
                Method    : {} {}
                User-Agent: {}
                Auth      : {}
                Reason    : {}
                ======================================""",
                timestamp,
                timestamp,
                clientIp,
                method, uri,
                userAgent != null ? userAgent : "Unknown",
                maskedAuth,
                authException.getMessage()
        );

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("""
                {"timestamp":"%s","status":401,"error":"Unauthorized","message":"%s","path":"%s"}"""
                .formatted(timestamp, authException.getMessage(), uri));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // Kalau lewat proxy biasanya format: clientIp, proxy1, proxy2
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip != null ? ip : "Unknown";
    }

    private String maskToken(String token) {
        if (token == null || token.length() <= 20) return "****";
        return token.substring(0, 8) + "..." + token.substring(token.length() - 4);
    }
}