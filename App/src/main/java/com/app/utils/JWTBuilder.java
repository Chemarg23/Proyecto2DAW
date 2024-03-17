package com.app.utils;



import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.aspectj.lang.annotation.SuppressAjWarnings;

import com.app.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTBuilder {

    private JWTBuilder() {}

    private static String secret = "mhZ6Slm7aq2yNHGFr9qzisqreCZ5VvmkatR3DcJnZfxXubnuZRMpxO4Z2yfHhw63";

    private static final SecretKey SECRET_KEY = new SecretKeySpec(secret.getBytes(), "HmacSHA512");

    @SuppressAjWarnings("deprecation")
    public static String generateToken(User user, Boolean remember) {
        Long expire = remember ? Long.MAX_VALUE : 10000L;
        return Jwts.builder()
                .setSubject(Long.toString(user.getId()))
                .claim("rol", user.getRol())
                .setExpiration(new Date(expire))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}