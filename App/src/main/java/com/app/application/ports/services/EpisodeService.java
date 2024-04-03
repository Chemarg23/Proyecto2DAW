package com.app.application.ports.services;

import java.util.List;

import com.app.domain.entity.Episode;

/**
 * Interfaz que define los métodos para acceder a los datos de los episodios.
 */
public interface EpisodeService {

    /**
     * Obtiene todos los episodios.
     * 
     * @return Lista de todos los episodios
     */
    public List<Episode> getAll();

    /**
     * Busca un episodio por su nombre.
     * 
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado
     */
    public Episode getByName(String name);

    /**
     * Obtiene todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    public List<Episode> getBySerie(Long id);
}
