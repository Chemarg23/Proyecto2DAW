package com.app.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.EpisodesRepository;
import com.app.application.ports.services.EpisodeService;
import com.app.domain.entity.Episode;

/**
 * Implementación de la interfaz EpisodeService que proporciona métodos para acceder a los datos de los episodios.
 */
@Service
public class EpisodeServiceImpl implements EpisodeService {

    @Autowired
    EpisodesRepository repo;

    /**
     * Obtiene todos los episodios.
     * 
     * @return Lista de todos los episodios
     */
    public List<Episode> getAll(){
        Pageable pageable = PageRequest.of(0, 20, Sort.by("id").descending());
        Page<Episode> page = repo.findAll(pageable);
        return page.getContent();
    }

    /**
     * Busca un episodio por su nombre.
     * 
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado
     * @throws ResponseStatusException si el episodio no se encuentra en la base de datos
     */
    public Episode getByName(String name){
        var episode =  repo.findByName(name);
        if(episode.isPresent()){
            return episode.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    /**
     * Obtiene todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    public List<Episode> getBySerie(Long id){
        return  repo.findBySerieId(id);
    }
}
