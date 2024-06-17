package com.app.config;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.application.utils.JwtAuthorizationFilter;;

@Configuration
@EnableWebSecurity
@SpringBootApplication
public class SecurityConfig {

    /*
     * @Bean
     * public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws
     * Exception {
     * return httpSecurity
     * .csrf().disable()
     * .authorizeHttpRequests()
     * .requestMatchers("/api/auth/login").permitAll()
     * .anyRequest().authenticated()
     * .build();
     * }
     */

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors->cors.disable())
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/auth/login").permitAll();
                    auth.requestMatchers("/api/auth/register").permitAll();
                    auth.requestMatchers("/api/stream/**").permitAll();
                    auth.requestMatchers("chat/**").permitAll();
                    auth.requestMatchers("/{path:^(?!.*\\.).*$}").permitAll();
                    auth.requestMatchers("/", "/index.html", "/static/**", "/{path:^(?!api$).*$}").permitAll();
                    auth.anyRequest().permitAll();
                })
                
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}
