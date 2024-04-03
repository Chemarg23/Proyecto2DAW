package com.app.application.ports.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.Message;;

/**
 * Interfaz de repositorio para la entidad Message.
 * Extiende JpaRepository para aprovechar las funcionalidades proporcionadas por Spring Data JPA.
 */
@Repository
public interface ChatRepository extends JpaRepository<Message, Long> {

    /**
     * Método personalizado para buscar mensajes por sala con paginación.
     *
     * @param room     ID de la sala
     * @param pageable Objeto Pageable para controlar la paginación de los resultados
     * @return Una página de mensajes correspondientes a la sala especificada
     */
    Optional<Page<Message>> findByRoom(int room, Pageable pageable);
}