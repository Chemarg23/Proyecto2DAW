package com.app.adapters.controllers;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.server.ResponseStatusException;

import com.app.application.services.SerieServiceImpl;
import com.app.domain.entity.Serie;
import com.app.dto.series.PostSerieDTO;
import com.app.validator.ValidImage;

import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

/**
 * Controlador REST para manejar operaciones relacionadas con las series.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/series")
@CrossOrigin(origins = "*")
public class SerieController {

    /**
     * Servicio de implementación de la serie.
     */
    @Autowired
    private final SerieServiceImpl service;

    /**
     * Obtiene todas las series paginadas.
     *
     * @param page El número de página.
     * @return ResponseEntity que contiene las series paginadas.
     */
    @GetMapping("/all/{page}")
    public ResponseEntity<Map<String, Object>> getAll(@PathVariable int page) {
        return ResponseEntity.ok(service.getAll(page));
    }

    /**
     * Obtiene una serie por su ID.
     *
     * @param id El ID de la serie.
     * @return ResponseEntity que contiene la serie encontrada.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Serie> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    /**
     * Obtiene una serie por su nombre.
     *
     * @param search El nombre de la serie.
     * @return ResponseEntity que contiene la serie encontrada.
     */
    @GetMapping("/name/{search}")
    public ResponseEntity<Serie> getByName(@PathVariable String search) {
        return ResponseEntity.ok(service.getBySearch(search));
    }

    /**
     * Busca series por un término de búsqueda.
     *
     * @param search El término de búsqueda.
     * @param page El número de página.
     * @return ResponseEntity que contiene las series encontradas.
     */
    @GetMapping("/search/{search}/{page}")
    public ResponseEntity<Map<String, Object>> search(@PathVariable String search, @PathVariable int page) {
        Map<String, Object> data = service.searchByName(search, page);
        return ResponseEntity.ok(data);
    }

    /**
     * Busca series por una categoría.
     *
     * @param name El nombre de la categoría.
     * @param page El número de página.
     * @return ResponseEntity que contiene las series encontradas.
     */
    @GetMapping("/category/{name}/{page}")
    public ResponseEntity<Map<String, Object>> searchByCategory(@PathVariable String name, @PathVariable int page) {
        Map<String, Object> data = service.searchByCategory(name, page);
        return ResponseEntity.ok(data);
    }

    /**
     * Crea una nueva serie con imagen y categorías asociadas.
     *
     * @param imgPath El archivo de imagen de la serie.
     * @param name El nombre de la serie.
     * @param descr La descripción de la serie.
     * @param search El término de búsqueda de la serie.
     * @param categories El conjunto de identificadores de categorías asociadas.
     * @return ResponseEntity que contiene la serie creada.
     */
    @PostMapping()
    public ResponseEntity<Serie> create(
            @RequestParam(value = "img") @ValidImage MultipartFile img,
            @RequestParam("name") @NotBlank(message = "Este campo es obligatorio") String name,
            @RequestParam("descr") @NotBlank(message = "Este campo es obligatorio") String descr,
            @RequestParam("search") String search,
            @RequestParam("categories") Set<Long> categories) {
        try {
            PostSerieDTO serie = new PostSerieDTO();
            serie.setDescr(descr);
            serie.setName(name);
            serie.setSearch(search.trim().replaceAll("\\s", "-"));
            serie.setImg(img);
            serie.setCategories(categories);
            return ResponseEntity.status(HttpStatus.CREATED).body(service.createOrUpdate(serie,null));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
    
/**
 * Actualiza una serie existente.
 * 
 * @param id Identificador de la serie a actualizar.
 * @param imgPath Imagen de la serie a subir (opcional).
 * @param name Nuevo nombre de la serie.
 * @param descr Nueva descripción de la serie.
 * @param search Nueva cadena de búsqueda de la serie.
 * @param categories Conjunto de identificadores de categorías asociadas a la serie.
 * @return ResponseEntity con la serie actualizada y el estado de la respuesta.
 */
@PutMapping("/{id}")
public ResponseEntity<Serie> update(
    @PathVariable Long id,
    @RequestParam(value = "img", required = false) @ValidImage MultipartFile imgPath,
    @RequestParam("name") @NotBlank(message = "Este campo es obligatorio") String name,
    @RequestParam("descr") @NotBlank(message = "Este campo es obligatorio") String descr,
    @RequestParam("search") String search,
    @RequestParam("categories") Set<Long> categories) {
    try {
        PostSerieDTO serie = new PostSerieDTO();
        serie.setDescr(descr);
        serie.setName(name);
        serie.setSearch(search.trim().replaceAll("\\s", "-"));
        serie.setImg(imgPath);
        serie.setCategories(categories);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createOrUpdate(serie,id));
    } catch (Exception e) {
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }
}


    /**
     * Elimina una serie por su ID.
     *
     * @param id El ID de la serie a eliminar.
     * @return ResponseEntity que indica si la operación fue exitosa.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
