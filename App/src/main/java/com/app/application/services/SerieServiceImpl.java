package com.app.application.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.CategoryRepository;
import com.app.application.ports.repositories.SerieRepository;
import com.app.application.ports.services.SerieService;
import com.app.application.utils.Utils;
import com.app.domain.entity.Category;
import com.app.domain.entity.Serie;
import com.app.dto.series.PostSerieDTO;

import lombok.RequiredArgsConstructor;

/**
 * Servicio para manejar operaciones relacionadas con las series.
 */
@Service
@RequiredArgsConstructor
public class SerieServiceImpl implements SerieService {

    private final SerieRepository repo;
    private final CategoryRepository categoryRepository;
    private final String UPLOAD_DIR = "C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/series";

    /**
     * Obtiene todas las series paginadas.
     *
     * @param page Número de página.
     * @return Página de series.
     */
    public Map<String, Object> getAll(int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());
        Page<Serie> series = repo.findAll(pageable);
        return createResultMap(series);
    }

    /**
     * Obtiene una serie por su identificador.
     * 
     * @param id El identificador de la serie
     * @return La serie con el identificador especificado
     * @throws ResponseStatusException si la serie no se encuentra en la base de
     *                                 datos
     */
    public Serie get(Long id) {
        var serie = repo.findById(id);
        return serie.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Obtiene una serie por término de búsqueda.
     *
     * @param search Término de búsqueda.
     * @return La serie encontrada.
     * @throws ResponseStatusException Si no se encuentra ninguna serie para el
     *                                 término de búsqueda.
     */
    public Serie getBySearch(String search) {
        Optional<Serie> serie = repo.findBySearch(search);
        return serie.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Busca series por nombre.
     *
     * @param name Nombre de la serie a buscar.
     * @param page Número de página.
     * @return Mapa que contiene las series encontradas y el número total de
     *         páginas.
     */
    public Map<String, Object> searchByName(String name, int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());
        Page<Serie> seriesPage = repo.findBySearchContaining(name, pageable);
        return createResultMap(seriesPage);
    }

    /**
     * Busca series por categoría.
     *
     * @param name Nombre de la categoría.
     * @param page Número de página.
     * @return Mapa que contiene las series encontradas, la categoría y el número
     *         total de páginas.
     */
    public Map<String, Object> searchByCategory(String name, int page) {
        Pageable pageable = PageRequest.of(page - 1, 10, Sort.by("id").descending());
        Page<Object[]> seriesPage = repo.findByCategoryNameWithCategory(name, pageable);
        Map<String, Object> result = createResultMap(seriesPage);
        result.put("category", seriesPage.getContent().isEmpty() ? null : seriesPage.getContent().get(0)[1]);
        List<Object> series = new ArrayList<>();
        for (Object[] array : seriesPage) {
            var serie = array[0];
            series.add(serie);
        }
        result.put("series", series);
        return result;
    }

    /**
     * Crea una nueva serie en la base de datos junto con su imagen y categorías
     * asociadas.
     *
     * @param serie      La serie que se va a crear.
     * @param categories El conjunto de identificadores de categorías asociadas a la
     *                   serie.
     * @param img        El archivo de imagen de la serie.
     * @return La serie creada.
     * @throws ResponseStatusException Si ocurre un error durante la creación de la
     *                                 serie.
     */
    public Serie createOrUpdate(PostSerieDTO dto, Long id) {
        Serie serie = id != null ? repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serie no encontrada"))
                : new Serie();
        Set<Category> categorySet = getCategorySet(dto.getCategories());
        serie.setCategories(categorySet);
        serie.setDescr(dto.getDescr());
        serie.setName(dto.getName());
        serie.setSearch(dto.getName());
        
        if (dto.getImgPath() != null) {
            try {
                String originalFilename = dto.getImgPath().getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String fileName = Utils.generateRandomString(40) + UUID.randomUUID().toString() + extension;
                Path path = Paths.get(UPLOAD_DIR + "/" + fileName);
                if (id != null) {
                    Path toDelete = Paths.get(UPLOAD_DIR + "/" + serie.getImgPath());
                    Files.delete(toDelete);
                }
                Files.copy(dto.getImgPath().getInputStream(), path);
                serie.setImgPath(fileName);

            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
            }
        }
        return repo.save(serie);
    }


    /**
     * Elimina una serie de la base de datos junto con su archivo de imagen
     * asociado.
     *
     * @param id El identificador de la serie a eliminar.
     * @throws ResponseStatusException Si ocurre un error durante la eliminación de
     *                                 la serie.
     */
    public void delete(Long id) {
        Serie serie = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la serie"));
        try {
            Path path = Paths.get(UPLOAD_DIR + "/" + serie.getImgPath());
            Files.delete(path);
            repo.delete(serie);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    /**
     * Crea un mapa de resultados a partir de una página de resultados.
     *
     * @param page La página de resultados.
     * @return El mapa de resultados.
     * @throws ResponseStatusException Si no se encuentra ninguna serie en la página
     *                                 de resultados.
     */
    private Map<String, Object> createResultMap(Page<?> page) {
        if (page.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se ha encontrado ninguna serie");
        }
        Map<String, Object> result = new HashMap<>();
        result.put("series", page.getContent());
        result.put("totalPages", page.getTotalPages());
        return result;
    }

    /**
 * Obtiene un conjunto de categorías a partir de un conjunto de IDs de categorías.
 *
 * @param categoryIds El conjunto de IDs de categorías.
 * @return Un conjunto de categorías.
 * @throws ResponseStatusException Si no se encuentra una categoría con alguno de los IDs proporcionados.
 */
private Set<Category> getCategorySet(Set<Long> categoryIds) {
    Set<Category> categorySet = new HashSet<>();
    for (Long categoryId : categoryIds) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No existe la categoría con el ID: " + categoryId));
        categorySet.add(category);
    }
    return categorySet;
}

}
