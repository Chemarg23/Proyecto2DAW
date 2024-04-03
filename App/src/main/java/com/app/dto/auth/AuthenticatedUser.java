package com.app.dto.auth;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.app.domain.entity.Serie;
import com.app.dto.profile.UpdateProfile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Clase que representa un usuario autenticado en el sistema.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticatedUser {

    /**
     * El ID del usuario.
     */
    private Long id;

    /**
     * El nombre del usuario.
     */
    private String name;

    /**
     * El correo electrónico del usuario.
     */
    private String email;

    /**
     * El número de teléfono del usuario.
     */
    private String phone;

    /**
     * La fecha de creación del usuario.
     */
    private String createdAt;

    /**
     * La fecha de baja del usuario.
     */
    private LocalDate dischargeDate;

    /**
     * El token de autenticación del usuario.
     */
    private String token;

    /**
     * El rol del usuario.
     */
    private int rol;

    /**
     * El conjunto de series asociadas al usuario.
     */
    private Set<Serie> series = new HashSet<>();

    /**
     * El nombre del archivo de imagen del usuario.
     */
    private String imgPath = "default.png";

    /**
     * Agrega una serie al conjunto de series asociadas al usuario.
     * @param serie La serie a agregar.
     */
    public void addSerie(Serie serie) {
        this.series.add(serie);
    }

    /**
     * Elimina una serie del conjunto de series asociadas al usuario.
     * @param serie La serie a eliminar.
     */
    public void removeSerie(Serie serie) {
        this.series.remove(serie);
    }

    /**
     * Actualiza los datos del usuario con la información proporcionada en el perfil.
     * @param profile El perfil con la información actualizada.
     */
    public void update(UpdateProfile profile) {
        setEmail(profile.getEmail());
        setName(profile.getName());
        setPhone(profile.getPhone());
    }
}
