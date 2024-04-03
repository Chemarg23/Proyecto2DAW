package com.app.application.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.UserRepository;
import com.app.application.ports.services.AuthService;
import com.app.application.utils.JWTBuilder;
import com.app.domain.entity.User;
import com.app.dto.auth.AuthenticatedUser;
import com.app.dto.auth.Credentials;
import com.app.dto.auth.NewUserDTO;

import lombok.RequiredArgsConstructor;

/**
 * Implementación de UserService que maneja operaciones CRUD (Crear, Leer,
 * Actualizar, Eliminar) en usuarios.
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    // Repositorio para manejar las operaciones relacionadas con el usuario.
    @Autowired
    UserRepository repo;

    // Codificador de contraseñas utilizado para cifrar y verificar las contraseñas
    // de los usuarios.
    @Autowired
    PasswordEncoder passwordEncoder;

    // Utilidad para mapear objetos entre distintos modelos de datos.
    @Autowired
    ModelMapper modelMapper;

    /**
     * Autentica a un usuario utilizando las credenciales proporcionadas.
     *
     * @param credentials Las credenciales del usuario que intenta autenticarse.
     * @return El usuario autenticado con un token JWT generado.
     * @throws ResponseStatusException Si las credenciales son inválidas lanza
     *                                 codigo 401, y si el usuario no existe, codigo
     *                                 404.
     */
    public AuthenticatedUser logIn(Credentials credentials) {
        return this.repo.findByEmail(credentials.getEmail()).map(user -> {
            if (passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
                AuthenticatedUser authUser = modelMapper.map(user, AuthenticatedUser.class);
                authUser.setToken(JWTBuilder.generateToken(user, credentials.getRemember()));
                return authUser;
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales erróneas");
            }
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Este usuario no existe"));
    }

/**
 * Registra un nuevo usuario con los datos proporcionados.
 * @param userData Los datos del nuevo usuario.
 * @return El usuario autenticado recién registrado.
 * @throws ResponseStatusException Si el email proporcionado ya ha sido tomado.
 */
public AuthenticatedUser register(NewUserDTO userData){
    try{
        User newUser = modelMapper.map(userData, User.class);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        this.repo.save(newUser);
        AuthenticatedUser user = modelMapper.map(newUser, AuthenticatedUser.class);
        user.setToken(JWTBuilder.generateToken(newUser, userData.getRemember()));
        return user;
    } catch(DataIntegrityViolationException e){
        throw new ResponseStatusException(HttpStatus.CONFLICT,"Este email ya ha sido tomado");
    }
}

}
