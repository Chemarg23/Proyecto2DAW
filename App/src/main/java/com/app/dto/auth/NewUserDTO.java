package com.app.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Clase que representa los datos de un nuevo usuario.
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NewUserDTO {

    /**
     * El nombre del nuevo usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String name;

    /**
     * El correo electrónico del nuevo usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    @Email(message = "Este campo no es un email válido")
    private String email;

    /**
     * La contraseña del nuevo usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String password;

    /**
     * El número de teléfono del nuevo usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String phone;

    /**
     * Indica si se debe recordar la sesión del nuevo usuario.
     */
    private Boolean remember;
}

