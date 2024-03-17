package com.app.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.auth.AuthenticatedUser;
import com.app.dto.auth.Credentials;
import com.app.services.auth.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService service;

    /**
     * Función para el inicio de sesion de un usuario
     * @param credentials Credenciales del usuario
     * @return Respuesta con llos datos del usuario necesarios para navegar por la aplicación
     */
    @PostMapping("auth/login")
    public ResponseEntity<AuthenticatedUser> logIn(@Valid @RequestBody Credentials credentials) {
        return ResponseEntity.ok(this.service.logIn(credentials));
    }
    


}
