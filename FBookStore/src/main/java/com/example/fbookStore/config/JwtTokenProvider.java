package com.example.fbookStore.config;
import com.example.fbookStore.entities.Account;
import io.jsonwebtoken.*;

import java.util.Date;

import io.jsonwebtoken.security.SignatureException;
import org.springframework.context.annotation.Configuration;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;


@Configuration
public class JwtTokenProvider {

    // Tạo khóa bí mật an toàn cho HS512
    private SecretKey jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // Thời gian hết hạn của JWT
    private long jwtExpirationInMs = 3600000;

    // Tạo JWT từ thông tin người dùng
    public String generateToken(Account account) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(account.getEmail()) // Đặt subject là username
                .claim("role", account.getRole())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    // Xác thực và lấy thông tin từ JWT
    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
    public String getRoleFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("role", String.class); // Assuming role is stored as a String
    }



    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SignatureException | IllegalArgumentException | UnsupportedJwtException | ExpiredJwtException |
                 MalformedJwtException ex) {
            return false;
        }

    }

}

