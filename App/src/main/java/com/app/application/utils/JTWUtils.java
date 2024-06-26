package com.app.application.utils;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import com.app.domain.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * Clase utilitaria para la construcción de tokens JWT.
 */
@Component
public class JTWUtils {

    // Clase utilitaria, por lo que el constructor es privado para evitar
    // instanciación.
    private JTWUtils() {
    }

    // Clave secreta para firmar el token JWT
    private static String secret = "mhZ6Slm7aq2yNHGFr9qzisqreCZ5VvmkatR3DcJnZfxXubnuZRMpxO4Z2yfHhw63";

    // Clave secreta como instancia de SecretKey
    private static final SecretKey SECRET_KEY = new SecretKeySpec(secret.getBytes(), "HmacSHA512");

    /**
     * Genera un token JWT para el usuario dado.
     *
     * @param user     El usuario para el que se generará el token.
     * @param remember Booleano que indica si se debe recordar la sesión del
     *                 usuario.
     * @return El token JWT generado.
     */
    public static String generateToken(User user, Boolean remember) {
        long expire = remember ? TimeUnit.DAYS.toMillis(1000) : TimeUnit.HOURS.toMillis(6);
        return Jwts.builder()
        .setSubject(Long.toString(user.getId()))
        .claim("username", user.getName())
        .claim("rol", user.getRol())
        .setExpiration(new Date(System.currentTimeMillis() + expire))
        .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
        .compact();
    }

    
}
