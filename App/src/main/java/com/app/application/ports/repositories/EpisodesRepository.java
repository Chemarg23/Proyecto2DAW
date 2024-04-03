package com.app.application.ports.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.domain.entity.Episode;


/**
 * Interfaz de repositorio para acceder a los datos de los episodios en la base de datos.
 */
@Repository
public interface EpisodesRepository extends JpaRepository<Episode, Long> {

    /**
     * Busca un episodio por su nombre.
     *
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado, encapsulado en un objeto Optional
     */
    public Optional<Episode> findByName(String name);

    /**
     * Obtiene todos los episodios de una serie específica.
     *
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    public List<Episode> findBySerieId(Long id);
}
