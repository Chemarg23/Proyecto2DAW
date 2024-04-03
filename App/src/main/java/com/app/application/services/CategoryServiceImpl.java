package com.app.application.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.application.ports.repositories.CategoryRepository;
import com.app.application.ports.services.CategoryService;
import com.app.domain.entity.Category;

import lombok.RequiredArgsConstructor;

/**
 * Implementación del servicio para la gestión de categorías.
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    
    private final CategoryRepository repo;

    /**
     * Obtiene todas las categorías.
     *
     * @return Lista de todas las categorías
     */
    @Override
    public List<Category> getAll() {
        return repo.findAll();
    }
}
