package com.app.dto.user;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO utilizado para representar un usuario al obtenerlo de la base de datos.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserDTO {

    private Long id;

    @NotBlank(message = "Este campo es obligatorio")
    private String name;

    @NotBlank(message = "Este campo es obligatorio")
    @Email(message = "No es una dirección válida de correo")
    private String email;

    @NotBlank(message = "Este campo es obligatorio")
    private String phone;
    
    private int rol = 0;
    
    private String createdAt = LocalDate.now().toString();

    private LocalDate dischargeDate = null;

    private String imgPath = "default.png";
}
