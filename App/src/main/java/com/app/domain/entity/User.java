package com.app.domain.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;

import com.app.dto.profile.UpdateProfile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa a un usuario del sistema.
 */
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * El nombre del usuario.
     */
    private String name;

    /**
     * El correo electrónico del usuario (debe ser único en la base de datos).
     */
    @Column(unique = true)
    private String email;

    /**
     * La contraseña del usuario.
     */
    private String password;

    /**
     * El número de teléfono del usuario.
     */
    private String phone;

    /**
     * La fecha de creación del usuario.
     */
    @Column(name = "created_at")
    @ColumnDefault("CURRENT_TIMESTAMP")
    private String createdAt = LocalDate.now().toString();

    /**
     * La fecha de baja del usuario, si está dado de baja.
     */
    @Column(name = "discharge_date", nullable = true)
    private LocalDate dischargeDate;

    /**
     * El rol del usuario en el sistema.
     */
    private int rol; 

    /**
     * Las series que el usuario ha añadido a su lista de deseos.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "wishList",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "serie_id"))
    private Set<Serie> series = new HashSet<>();

    /**
     * La ruta de la imagen de perfil del usuario.
     */
    @Column(name = "img_path")
    private String imgPath = "default.png";
    
    /**
     * Agrega una serie a la lista de deseos del usuario.
     * @param serie La serie que se va a añadir.
     */
    public void addSerie(Serie serie){
        this.series.add(serie);
    }

    /**
     * Elimina una serie de la lista de deseos del usuario.
     * @param serie La serie que se va a eliminar.
     */
    public void removeSerie(Serie serie){
        this.series.remove(serie);
    }

    /**
     * Actualiza los datos del usuario con la información proporcionada en el perfil.
     * @param profile El perfil con la información actualizada.
     */
    public void update(UpdateProfile profile){
        setEmail(profile.getEmail());
        setName(profile.getName());
        setPhone(profile.getPhone());
    }
}
