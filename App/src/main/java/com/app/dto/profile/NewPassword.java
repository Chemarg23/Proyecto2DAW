package com.app.dto.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Clase que representa los datos necesarios para cambiar la contraseña de un usuario.
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class NewPassword {

    /**
     * La contraseña actual del usuario.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String password;
    
    /**
     * La nueva contraseña que se desea establecer.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String newPassword;
    
    /**
     * La confirmación de la nueva contraseña.
     */
    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 8, message = "La nueva contraseña debe tener al menos 8 caracteres")
    private String confirmPassword;

    /**
     * Verifica si la nueva contraseña y su confirmación coinciden.
     * 
     * @return true si la nueva contraseña y su confirmación coinciden, false de lo contrario.
     */
    public boolean confirm() {
        return this.newPassword.equals(this.confirmPassword);
    }
    
}
