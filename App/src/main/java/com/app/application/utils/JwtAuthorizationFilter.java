package com.app.application.utils;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.core.Ordered;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthorizationFilter extends OncePerRequestFilter implements Ordered {

    private static String secret = "mhZ6Slm7aq2yNHGFr9qzisqreCZ5VvmkatR3DcJnZfxXubnuZRMpxO4Z2yfHhw63";

    private static final SecretKey SECRET_KEY = new SecretKeySpec(secret.getBytes(), "HmacSHA512");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain)
            throws java.io.IOException, ServletException {
        String path = request.getRequestURI();
        
        /*Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            logger.info(headerName + ": " + headerValue);
        }*/

        String bearerToken = request.getHeader("Authentication");
        if (!path.equals("/api/auth/login") && !path.equals("/api/auth/register")) {
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                String token = bearerToken.replace("Bearer ", "");
                logger.info("Token: " + token);
                try {
                    logger.info("aqui2");
                    Claims claims = Jwts.parser()
                            .setSigningKey(SECRET_KEY)
                            .build()
                            .parseClaimsJws(token)
                            .getBody();
                    logger.info("Claims subject: " + claims.getSubject());
                    String username = claims.getSubject();                    
                    if (username != null) {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                username, null, Collections.emptyList());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (Exception e) {
                    logger.error("Error al validar el token: " + e.getMessage());
                }
            }
        }
        filterchain.doFilter(request, response);
    }
    

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
