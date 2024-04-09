package com.app.adapters.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.application.ports.services.UserService;
import com.app.dto.user.GetUserDTO;
import com.app.dto.user.PostUserDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Controlador REST para manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en recursos de usuario.
 */
@RestController // Indica que esta clase es un controlador REST
@RequiredArgsConstructor // Genera un constructor con argumentos para las propiedades
@RequestMapping("/api/users") // Mapea las solicitudes que comienzan con /users a este controlador
@CrossOrigin(origins={"*"})
public class UserController {
    
    private final UserService userService; // Inyecta una instancia de UserService al controlador

    /**
     * Maneja las solicitudes GET a /users.
     * @return ResponseEntity con una lista de usuarios y un estado OK (200).
     */
    @GetMapping
    public ResponseEntity<List<GetUserDTO>> getAll() {
        return ResponseEntity.ok(userService.index());
    }

    /**
     * Maneja las solicitudes GET a /users/{id}.
     * @param id El ID del usuario a obtener.
     * @return ResponseEntity con el usuario correspondiente y un estado OK (200).
     */
    @GetMapping("/{id}")
    public ResponseEntity<GetUserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.get(id));
    }

    /**
     * Maneja las solicitudes POST a /users.
     * @param request Los datos del usuario a crear.
     * @return ResponseEntity con el usuario creado y un estado CREATED (201).
     */
    @PostMapping
    public ResponseEntity<GetUserDTO> addUser(@Valid @RequestBody PostUserDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }

    /**
     * Maneja las solicitudes PUT a /users/{id}.
     * @param request Los datos del usuario a actualizar.
     * @param id El ID del usuario a actualizar.
     * @return ResponseEntity con el usuario actualizado y un estado OK (200).
     */
    @PutMapping("/{id}")
    public ResponseEntity<GetUserDTO> updateUser(@Valid @RequestBody GetUserDTO request, @PathVariable Long id) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    /**
     * Maneja las solicitudes delete a /users/{id}.
     * @param id El ID del usuario a eliminar.
     * @return ResponseEntity con un estado NO CONTENT (204).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
