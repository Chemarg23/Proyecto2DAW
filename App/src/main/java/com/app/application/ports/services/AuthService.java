package com.app.application.ports.services;

import com.app.dto.auth.AuthenticatedUser;
import com.app.dto.auth.Credentials;
import com.app.dto.auth.NewUserDTO;

public interface AuthService {
      /**
     * 
     * @param credentials Credenciales del usuario
     * @return El usuario con sus datos y token
    */
    AuthenticatedUser logIn(Credentials credentials);

    /**
     * 
     * @param credentials Credenciales del usuario a crear
     * @return El usuario con su token y datos
     */
    AuthenticatedUser register(NewUserDTO credentials);
}
