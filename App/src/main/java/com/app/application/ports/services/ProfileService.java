package com.app.application.ports.services;

import com.app.dto.profile.NewPassword;
import com.app.dto.profile.UpdateProfile;
import com.app.dto.user.GetUserDTO;

/**
 * Interfaz de servicio para la gestión de perfiles de usuario.
 */
public interface ProfileService {

    /**
     * Actualiza el perfil de un usuario.
     *
     * @param profile Objeto UpdateProfile con los datos actualizados del perfil
     * @param id      ID del usuario cuyo perfil se va a actualizar
     * @return Objeto GetUserDTO con el perfil actualizado del usuario
     */
    GetUserDTO updateProfile(UpdateProfile profile, Long id);

    /**
     * Cambia la contraseña de un usuario.
     *
     * @param passwords Objeto NewPassword con la nueva contraseña y su confirmación
     * @param id        ID del usuario cuya contraseña se va a cambiar
     */
    void changePassword(NewPassword passwords, Long id);

    /**
     * Da de baja a un usuario.
     *
     * @param id ID del usuario que se va a dar de baja
     */
    void discharge(Long id);
}
