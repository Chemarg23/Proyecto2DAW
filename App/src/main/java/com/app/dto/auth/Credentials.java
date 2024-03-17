package com.app.dto.auth;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO utilizado para representar las credenciales de un usuario
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Credentials {
    
    @Email(message = "Este email no es válido")
    @NotBlank(message = "Este campo es obligatorio")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    @Length(max =20,message = "Demasiado larga")
    @Length(min =8, message = "Demasiado corta")
    private String password;

    private Boolean remember = false;
}
