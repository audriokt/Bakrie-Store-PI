package com.audrio.backendbakrie.config;

import com.audrio.backendbakrie.service.impl.UserDetailsServiceImpl;
import com.audrio.backendbakrie.utils.JwtUtils;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    private static final List<String> WHITELIST = List.of(
            "/public/auth/**",
            "/req/signup/**"
    );

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();
        String cleanPath = path.split("\\?")[0]; // hapus query string

        log.debug(">>> Request {} {}", method, cleanPath);

        if (isWhitelisted(cleanPath)) {
            log.debug("Whitelisted path – skipping JWT check");
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Missing or invalid Authorization header | Header: {}", authHeader);
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        log.debug("Token received (first 20 chars): {}", token.length() > 20 ? token.substring(0, 20) + "..." : token);

        String email = null;
        try {
            email = jwtUtils.extractEmail(token);
        } catch (JwtException e) {
            log.warn("Failed to parse JWT: {}", e.getMessage());
            sendUnauthorized(response, "Invalid or malformed token");
            return;
        }

        if (email == null) {
            log.warn("JWT does not contain email claim");
            sendUnauthorized(response, "Invalid or malformed token");
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            log.debug("User already authenticated in this request");
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = null;
        try {
            userDetails = userDetailsService.loadUserByUsername(email);
        } catch (Exception e) {
            log.error("Error loading user by email {}: {}", email, e.getMessage());
        }

        if (userDetails == null) {
            log.warn("User not found for email: {}", email);
            sendUnauthorized(response, "User not found");
            return;
        }

        log.info("Authorities for {}: {}", userDetails.getUsername(), userDetails.getAuthorities());

        boolean tokenValid = false;
        try {
            tokenValid = jwtUtils.validateToken(token, userDetails);
        } catch (JwtException e) {
            log.warn("Token validation failed for {}: {}", email, e.getMessage());
            sendUnauthorized(response, "Invalid token");
            return;
        }

        if (!tokenValid) {
            log.warn("Token invalid for user: {}", email);
            sendUnauthorized(response, "Invalid token");
            return;
        }

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        log.debug("Authenticated user from JWT: {}", email);
        log.info("Authenticated user: {}", SecurityContextHolder.getContext().getAuthentication().getName());
        log.info("Authorities: {}", userDetails.getAuthorities());


        filterChain.doFilter(request, response);
    }

    private boolean isWhitelisted(String path) {
        boolean matched = WHITELIST.stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, path));
        if (matched) {
            log.debug("Path {} matches whitelist pattern", path);
        }
        return matched;
    }

    private void sendUnauthorized(HttpServletResponse response, String message) throws IOException {
        log.warn("Sending 401 – {}", message);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write(String.format("{\"error\": \"%s\"}", message));
    }
}