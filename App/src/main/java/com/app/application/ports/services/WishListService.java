package com.app.application.ports.services;

/**
 * Interfaz de servicio para la gestión de la lista de deseos de un usuario.
 */
public interface WishListService {

    /**
     * Agrega una serie a la lista de deseos de un usuario.
     *
     * @param userId  ID del usuario al que se va a agregar la serie a la lista de deseos
     * @param serieId ID de la serie que se va a agregar a la lista de deseos
     */
    void add(Long userId, Long serieId);

    /**
     * Elimina una serie de la lista de deseos de un usuario.
     *
     * @param userId  ID del usuario del que se va a eliminar la serie de la lista de deseos
     * @param serieId ID de la serie que se va a eliminar de la lista de deseos
     */
    void remove(Long userId, Long serieId);
}

