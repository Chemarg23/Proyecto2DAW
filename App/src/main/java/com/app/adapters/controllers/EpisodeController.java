package com.app.adapters.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.application.ports.services.EpisodeService;
import com.app.domain.entity.Episode;
import com.app.dto.episodes.EpisodeDTO;
import com.app.validator.ValidImage;
import com.app.validator.ValidVideo;

import lombok.RequiredArgsConstructor;

/**
 * Controlador para manejar las solicitudes relacionadas con los episodios de
 * una serie.
 */
@RestController
@RequestMapping("/api/episodes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class EpisodeController {

   private final EpisodeService service;

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
        return ResponseEntity.ok(service.getByFullName(name));
    }

    /**
     * Devuelve todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    @GetMapping("/{id}")
    public ResponseEntity<List<Episode>> getEpisodes(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBySerie(id));
    }

    /**
     * Devuelve todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    @GetMapping("/recommended/{id}")
    public ResponseEntity<List<Episode>> getRecommendedEpisodes(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRecommendedEpisodes(id));
    }
    /**
     * Agrega un nuevo episodio.
     *
     * @param img           La imagen del episodio (opcional).
     * @param name          El nombre del episodio.
     * @param video         El video del episodio.
     * @param fullname      El nombre completo del episodio.
     * @param serieId       El ID de la serie a la que pertenece el episodio.
     * @param episodeNumber El número del episodio.
     * @return La respuesta HTTP con el episodio creado.
     */
    @PostMapping
    public ResponseEntity<Episode> add(
            @RequestParam(value = "img", required = false) @ValidImage MultipartFile img,
            @RequestParam("name") String name,
            @RequestParam("video") @ValidVideo MultipartFile video,
            @RequestParam("fullname") String fullname,
            @RequestParam("serieId") Long serieId,
            @RequestParam("episode_number") int episodeNumber) {
        EpisodeDTO dto = new EpisodeDTO();
        dto.setEpisodeNumber(episodeNumber);
        dto.setFullName(fullname);
        dto.setImg(img);
        dto.setName(name);
        dto.setVideo(video);
        dto.setSerieId(serieId);
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.createOrUpdate(dto, null));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Actualiza un episodio existente.
     *
     * @param img           La nueva imagen del episodio (opcional).
     * @param name          El nuevo nombre del episodio.
     * @param video         El nuevo video del episodio (opcional).
     * @param fullname      El nuevo nombre completo del episodio.
     * @param episodeNumber El nuevo número del episodio.
     * @param id            El ID del episodio a actualizar.
     * @return La respuesta HTTP con el episodio actualizado.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Episode> update(
            @RequestParam(value = "img", required = false) @ValidImage MultipartFile img,
            @RequestParam("name") String name,
            @RequestParam(value = "video", required = false) @ValidVideo MultipartFile video,
            @RequestParam("fullname") String fullname,
            @RequestParam("episode_number") int episodeNumber,
            @PathVariable Long id) {
        EpisodeDTO dto = new EpisodeDTO();
        dto.setEpisodeNumber(episodeNumber);
        dto.setFullName(fullname);
        dto.setImg(img);
        dto.setName(name);
        dto.setVideo(video);
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.createOrUpdate(dto, id));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
