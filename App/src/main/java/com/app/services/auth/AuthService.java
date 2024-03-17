package com.app.services.auth;

import com.app.dto.auth.AuthenticatedUser;
import com.app.dto.auth.Credentials;

public interface AuthService {
      /**
     * 
     * @param credentials Credenciales del usuario
     * @return El usuario con sus datos y token
    */
    AuthenticatedUser logIn(Credentials credentials);
}
