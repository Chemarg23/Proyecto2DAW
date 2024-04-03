package com.app.application.ports.services;

import java.util.Map;

import com.app.domain.entity.Serie;
import com.app.dto.series.PostSerieDTO;
/**
 * Interfaz que define los métodos para el servicio relacionado con las series.
 */
public interface SerieService {

    /**
     * Obtiene una serie por su identificador.
     * 
     * @param id El identificador de la serie.
     * @return La serie correspondiente al identificador especificado.
     */
    public Serie get(Long id);

    /**
     * Obtiene una serie por su término de búsqueda.
     * 
     * @param search El término de búsqueda para encontrar la serie.
     * @return La serie correspondiente al término de búsqueda especificado.
     */
    public Serie getBySearch(String search);

    /**
     * Busca series por su nombre.
     * 
     * @param name El nombre de la serie a buscar.
     * @param page El número de página de resultados.
     * @return Un mapa que contiene los resultados de la búsqueda por nombre de serie.
     */
    public Map<String, Object> searchByName(String name, int page);

    /**
     * Busca series por una categoría específica.
     * 
     * @param name El nombre de la categoría a buscar.
     * @param page El número de página de resultados.
     * @return Un mapa que contiene los resultados de la búsqueda por categoría.
     */
    public Map<String, Object> searchByCategory(String name, int page);

    /**
     * Crea una nueva serie.
     * 
     * @param serie La serie a crear.
     * @param categories Las categorías asociadas a la serie.
     * @param file El archivo multimedia asociado a la serie.
     * @return La serie creada.
     */
    public Serie createOrUpdate(PostSerieDTO dto, Long id);

    
    /**
     * Elimina una serie por su identificador.
     * 
     * @param id El identificador de la serie a eliminar.
     */
    public void delete(Long id);
}
