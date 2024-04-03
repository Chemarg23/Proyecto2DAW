package com.app.application.ports.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.User;

/**
 * Repositorio para la entidad User que gestiona la interacción con la base de datos.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Busca un usuario por su dirección de correo electrónico.
     *
     * @param email Dirección de correo electrónico del usuario a buscar
     * @return El usuario con la dirección de correo electrónico especificada, encapsulado en un objeto Optional
     */
    Optional<User> findByEmail(String email);
}
