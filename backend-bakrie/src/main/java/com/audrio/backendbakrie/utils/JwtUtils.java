package com.audrio.backendbakrie.utils;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtils {

    @Value("${JWT_SECRET_KEY}")
    String SECRET_KEY;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    private final static long EXPIRATION_TIME = 86400000;

    public String generateToken(String email){
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token){
        return !isTokenExpired(token);
    }

    public String extractEmail(String token){
        JwtParser jwtPaser = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();
        return jwtPaser.parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build();
        return jwtParser.parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
}
