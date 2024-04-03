package com.app.adapters.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.application.ports.services.CategoryService;
import com.app.domain.entity.Category;

import lombok.RequiredArgsConstructor;


/**
 * Controlador para manejar las operaciones relacionadas con las categorías.
 */
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    
    /**
     * Servicio para realizar operaciones relacionadas con las categorías.
     */
    @Autowired
    private final CategoryService service;

    /**
     * Obtiene todas las categorías.
     * 
     * @return ResponseEntity con la lista de categorías y el estado de la respuesta.
     */
    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
    
}

