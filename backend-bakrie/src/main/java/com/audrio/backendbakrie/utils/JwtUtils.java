package com.audrio.backendbakrie.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

    @Value("${JWT_EXPIRATION_MS:86400000}") // default 24 jam untuk login biasa
    private long LOGIN_EXPIRATION_MS;

    private SecretKey key;
    private JwtParser jwtParser;

    @PostConstruct
    public void init() {
        if (SECRET_KEY == null || SECRET_KEY.isBlank()) {
            throw new IllegalStateException("JWT_SECRET_KEY must be set in application.yml");
        }
        if (SECRET_KEY.length() < 32) {
            throw new IllegalStateException("JWT_SECRET_KEY must be at least 32 characters (256-bit) for HS256");
        }
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        this.jwtParser = Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build();
    }

    // ==================== TOKEN UNTUK LOGIN (biasa) ====================
    public String generateToken(Map<String, Object> claims, String subject) {
        return generateToken(claims, subject, LOGIN_EXPIRATION_MS);
    }

    public String generateToken(Map<String, Object> claims, String subject, long expirationMs) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String email = extractEmail(token);
            return email != null
                    && email.equals(userDetails.getUsername())
                    && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    // ==================== KHUSUS TOKEN RESET PASSWORD ====================
    public String generatePasswordResetToken(String email) {
        Map<String, Object> claims = Map.of(
                "purpose", "password-reset",
                "email", email
        );

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1_800_000)) // 30 menit
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validasi token reset password + langsung ambil email
     * @throws RuntimeException jika token tidak valid
     */
    public String validateAndExtractEmailFromResetToken(String token) {
        try {
            Claims claims = jwtParser.parseClaimsJws(token).getBody();

            // Cek purpose
            String purpose = claims.get("purpose", String.class);
            if (!"password-reset".equals(purpose)) {
                throw new RuntimeException("Token bukan untuk reset password");
            }

            // Cek expiry
            if (claims.getExpiration() == null || claims.getExpiration().before(new Date())) {
                throw new RuntimeException("Token sudah kadaluarsa");
            }

            // Ambil email
            String email = claims.get("email", String.class);
            if (email == null || email.isBlank()) {
                throw new RuntimeException("Token tidak mengandung informasi email");
            }

            return email;

        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token sudah kadaluarsa");
        } catch (SignatureException e) {
            throw new RuntimeException("Token tidak valid (signature salah)");
        } catch (MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            throw new RuntimeException("Token tidak valid");
        }
    }

    // Boolean version (untuk GET validate token kalau masih mau pakai)
    public boolean isResetTokenValid(String token) {
        try {
            validateAndExtractEmailFromResetToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // ==================== UTILS UMUM ====================
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claims != null ? claimsResolver.apply(claims) : null;
    }

    private boolean isTokenExpired(String token) {
        Date exp = extractClaim(token, Claims::getExpiration);
        return exp != null && exp.before(new Date());
    }

    private Claims extractAllClaims(String token) {
        try {
            return jwtParser.parseClaimsJws(token).getBody();
        } catch (Exception e) {
            return null;
        }
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}