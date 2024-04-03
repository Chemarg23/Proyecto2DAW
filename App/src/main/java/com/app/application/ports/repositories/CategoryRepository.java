package com.app.application.ports.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.Category;

/**
 * Interfaz de repositorio para la entidad Category.
 * Extiende JpaRepository para aprovechar las funcionalidades proporcionadas por Spring Data JPA.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {}
