package com.app.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO utilizado para representar un usuario para introducirlo de la base de datos.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostUserDTO {

    @NotBlank(message = "Este campo es obligatorio")
    private String name;

    @Email(message = "Este email no válido")
    @NotBlank(message = "Este campo es obligatorio")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    private String password;

    @NotBlank(message = "Este campo es obligatorio")
    private String phone;

    private int rol = 0;

}
