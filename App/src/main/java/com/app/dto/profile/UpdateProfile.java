package com.app.dto.profile;

import org.springframework.web.multipart.MultipartFile;

import com.app.validator.ValidImage;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa los datos necesarios para actualizar el perfil de un usuario.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfile {
    
    /**
     * El nombre del usuario.
     */
    @NotBlank(message="Este campo es obligatorio")
    private String name;

    /**
     * El correo electrónico del usuario.
     */
    @NotBlank(message="Este campo es obligatorio")
    @Email(message = "No es un email válido")
    private String email;

    /**
     * El número de teléfono del usuario.
     */
    @NotBlank(message="Este campo es obligatorio")
    private String phone;

    /**
     * La imagen de perfil del usuario. Debe ser una imagen válida.
     */
    @ValidImage
    @Nullable
    private MultipartFile imgPath = null;
}
