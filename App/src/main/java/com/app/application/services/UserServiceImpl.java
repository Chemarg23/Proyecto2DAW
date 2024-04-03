package com.app.application.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.UserRepository;
import com.app.application.ports.services.UserService;
import com.app.domain.entity.User;
import com.app.dto.user.GetUserDTO;
import com.app.dto.user.PostUserDTO;

import lombok.RequiredArgsConstructor;

/**
 * Implementación de UserService que maneja operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en usuarios.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repo; // Repositorio para interactuar con la base de datos de usuarios
    private final ModelMapper modelMapper; // Utilizado para mapear entidades a DTOs y viceversa
    private final PasswordEncoder passwordEncoder; // Utilizado para codificar contraseñas

    /**
     * Obtiene todos los usuarios.
     * @return Lista de DTOs de usuarios.
     */
    public List<GetUserDTO> index() {
        return repo.findAll().stream()
                .map(user -> modelMapper.map(user, GetUserDTO.class))
                .toList();
    }

    /**
     * Obtiene un usuario por su ID.
     * @param id El ID del usuario a buscar.
     * @return DTO del usuario encontrado.
     * @throws ResponseStatusException Si el usuario no es encontrado, lanza una excepción con estado NOT_FOUND.
     */
    public GetUserDTO get(Long id) {
        return repo.findById(id)
                .map(user -> modelMapper.map(user, GetUserDTO.class))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no fue encontrado"));
    }

    /**
     * Crea un nuevo usuario.
     * @param user DTO del usuario a crear.
     * @return DTO del usuario creado.
     * @throws ResponseStatusException Si el email ya está en uso, lanza una excepción con estado CONFLICT.
     */
    public GetUserDTO create(PostUserDTO user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword())); 
            User newUser = repo.save(modelMapper.map(user, User.class)); 
            return modelMapper.map(newUser, GetUserDTO.class); 
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este email ya ha sido tomado"+e.getMessage());
        }
    }

    /**
     * Actualiza un usuario existente.
     * @param id El ID del usuario a actualizar.
     * @param user DTO del usuario con los nuevos datos.
     * @return DTO del usuario actualizado.
     * @throws ResponseStatusException Si el usuario no es encontrado o si el email ya está en uso, lanza una excepción con estado NOT_FOUND o CONFLICT respectivamente.
     */
    public GetUserDTO update(Long id, GetUserDTO user) {
        try {
            return this.repo.findById(id).map(newUser -> {
                newUser.setName(user.getName());
                newUser.setPhone(user.getPhone());
                newUser.setEmail(user.getEmail());
                this.repo.save(newUser);
                return modelMapper.map(newUser, GetUserDTO.class);
            }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "El usuario no se encontró"));
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este email ya ha sido tomado");
        }
    }

    /**
     * Elimina un usuario por su ID.
     * @param id El ID del usuario a eliminar.
     * @throws ResponseStatusException Si el usuario no es encontrado, lanza una excepción con estado NOT_FOUND.
     */
    public void delete(Long id) {
        Optional<User> userOptional = repo.findById(id);
        if (userOptional.isPresent()) {
            repo.delete(userOptional.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
    }

}
