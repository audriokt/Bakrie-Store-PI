package com.audrio.backendbakrie.config;

import com.audrio.backendbakrie.service.impl.UserDetailsServiceImpl;
import com.audrio.backendbakrie.utils.JwtUtils;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;
    private static final List<String> WHITELIST = List.of(
            "/public/auth/login/customer",
            "/public/auth/login/employee",
            "/public/register/customer",
            "/req/signup/verify"
    );


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        System.out.println("Path: " + request.getRequestURI());

        if (isWhitelisted(path)) {
            filterChain.doFilter(request, response);
            return;
        }


        //Ambil token dari header Authorization
        final String authHeader = request.getHeader("Authorization");
        System.out.println("authHeader: " + authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);

        final String email;
        final String role;
        try{
            email = jwtUtils.extractEmail(token);
            role = jwtUtils.extractRole(token);
        }catch (JwtException e){
            filterChain.doFilter(request, response);
            return;
        }

        //Cegah klo udh ada authentication di context
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Validasi token dan set autentikasi
            if (userDetails != null && jwtUtils.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isWhitelisted(String path) {
        return WHITELIST.stream().anyMatch(path::equals);
    }
}
