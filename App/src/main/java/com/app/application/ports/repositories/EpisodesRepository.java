package com.app.application.ports.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.Episode;

/**
 * Interfaz de repositorio para acceder a los datos de los episodios en la base
 * de datos.
 */
@Repository
public interface EpisodesRepository extends JpaRepository<Episode, Long> {

    /**
     * Busca un episodio por su nombre.
     *
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado, encapsulado en un objeto
     *         Optional
     */
    public Optional<Episode> findByName(String name);

    /**
     * Busca un episodio por su nombre completo.
     *
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado, encapsulado en un objeto
     *         Optional
     */
    public Optional<Episode> findByFullname(String name);

    /**
     * Obtiene todos los episodios de una serie específica.
     *
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    public List<Episode> findBySerieId(Long id);

    @Query(value = "SELECT e.* " +
            "FROM episodes e " +
            "JOIN series s ON e.serie_id = s.id " +
            "JOIN serie_category sc ON s.id = sc.serie_id " +
            "JOIN categories c ON sc.category_id = c.id " +
            "WHERE c.id = COALESCE( " +
            "( " +
            "    SELECT c.id " +
            "    FROM wishlist w " +
            "    JOIN series s ON w.serie_id = s.id " +
            "    JOIN serie_category sc ON s.id = sc.serie_id " +
            "    JOIN categories c ON sc.category_id = c.id " +
            "    WHERE w.user_id = :userId " +
            "    GROUP BY c.id " +
            "    ORDER BY COUNT(*) DESC " +
            "    LIMIT 1 " +
            "), " +
            "( " +
            "    SELECT FLOOR(1 + (RAND() * 10)) " +
            ")) " +
            "ORDER BY RAND() " +
            "LIMIT 12;", nativeQuery = true)

    List<Episode> findRecomendedEpisodes(@Param("userId") Long userId);
}
