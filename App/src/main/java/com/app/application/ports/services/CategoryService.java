package com.app.application.ports.services;

import java.util.List;

import com.app.domain.entity.Category;

/**
 * Interfaz de servicio para la gestión de categorías.
 */
public interface CategoryService {

    /**
     * Obtiene todas las categorías.
     *
     * @return Lista de todas las categorías disponibles
     */
    List<Category> getAll();
}
