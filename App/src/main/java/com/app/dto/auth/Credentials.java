package com.app.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Clase que representa las credenciales de inicio de sesión de un usuario.
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Credentials {
    
    /**
     * El correo electrónico del usuario.
     */
    @Email(message = "Este campo no es un email válido")
    @NotBlank(message = "Este campo es obligatorio")
    private String email;

    /**
     * La contraseña del usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String password;

    /**
     * Indica si se debe recordar la sesión del usuario.
     */
    private Boolean remember = false;
}

