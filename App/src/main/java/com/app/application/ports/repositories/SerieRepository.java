package com.app.application.ports.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.Serie;

/**
 * Interfaz de repositorio para acceder a los datos de las series en la base de datos.
 */
@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {

    /**
     * Busca una serie por su nombre.
     *
     * @param name Nombre de la serie a buscar
     * @return La serie con el nombre especificado, encapsulada en un objeto Optional
     */
    public Optional<Serie> findByName(String name);

    /**
     * Busca una serie por su campo de búsqueda.
     *
     * @param name Campo de búsqueda de la serie
     * @return La serie con el campo de búsqueda especificado, encapsulada en un objeto Optional
     */
    public Optional<Serie> findBySearch(String name);

    /**
     * Busca series cuyo campo de búsqueda contenga una cadena dada.
     *
     * @param name     Cadena a buscar en el campo de búsqueda de las series
     * @param pageable Objeto Pageable para controlar la paginación de los resultados
     * @return Una página de series cuyo campo de búsqueda contiene la cadena especificada
     */
    public Page<Serie> findBySearchContaining(String name, Pageable pageable);
 
    /**
     * Realiza una consulta personalizada para buscar series por el nombre de una categoría.
     * Devuelve una página de objetos, donde cada objeto es una tupla (serie, categoría).
     *
     * @param categoryName Nombre de la categoría a buscar
     * @param pageable     Objeto Pageable para controlar la paginación de los resultados
     * @return Una página de tuplas (serie, categoría) que corresponden a la categoría especificada
     */
    @Query("SELECT s, c FROM Serie s " +
           "JOIN CategorySerie sc ON s.id = sc.serie.id " +
           "JOIN Category c ON sc.category.id = c.id " +
           "WHERE c.search = :categoryName")
    Page<Object[]> findByCategoryNameWithCategory(@Param("categoryName") String categoryName, Pageable pageable);
}

