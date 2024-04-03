package com.app.application.ports.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.domain.entity.User;
import com.app.domain.entity.WishList;

/**
 * Repositorio para la entidad WishList que gestiona la interacción con la base de datos.
 */
public interface WishListRepository extends JpaRepository<WishList, Long> {
    
    /**
     * Busca elementos de la lista de deseos por usuario y los paginas.
     *
     * @param user   Usuario cuyos elementos de la lista de deseos se desean buscar
     * @param page   Información de paginación
     * @return Una página de elementos de lista de deseos asociados con el usuario
     */
    Page<WishList> findByUser(User user, Pageable page);
}
