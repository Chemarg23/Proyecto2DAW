package com.app.adapters.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.application.ports.services.EpisodeService;
import com.app.domain.entity.Episode;

/**
 * Controlador para manejar las solicitudes relacionadas con los episodios de una serie.
 */
@RestController
@RequestMapping("/api/episodes")
@CrossOrigin(origins = "*")
public class EpisodeController {

    @Autowired
    EpisodeService service;

    /**
     * Devuelve todos los episodios.
     * 
     * @return Lista de todos los episodios
     */
    @GetMapping
    public ResponseEntity<List<Episode>> all() {
        return ResponseEntity.ok(service.getAll());
    }

    /**
     * Busca un episodio por su nombre.
     * 
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<Episode> getByName(@PathVariable String name) {
        return ResponseEntity.ok(service.getByName(name));
    }

    /**
     * Devuelve todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    @GetMapping("/episodes/{id}")
    public ResponseEntity<List<Episode>> getEpisodes(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBySerie(id));
    }
}
