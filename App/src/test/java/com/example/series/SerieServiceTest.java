package com.example.series;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.app.application.ports.repositories.CategoryRepository;
import com.app.application.ports.repositories.SerieRepository;
import com.app.application.ports.services.SerieService;
import com.app.application.services.SerieServiceImpl;
import com.app.domain.entity.Serie;

public class SerieServiceTest {

    private SerieService serieService;

    private SerieRepository serieRepository;
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        serieRepository = mock(SerieRepository.class);
        categoryRepository = mock(CategoryRepository.class);
        serieService = new SerieServiceImpl(serieRepository, categoryRepository);
    }


    @Test
    void testGet() {
        Serie serie = new Serie();
        serie.setId(1L);
        serie.setName("Nombre de la Serie");
        serie.setDescr("Descripción de la Serie");
        serie.setImgPath("ruta/de/imagen.jpg");
        when(serieRepository.findById(1L)).thenReturn(Optional.of(serie));

        Serie result = serieService.get(1L);
        assertEquals(serie, result);
    }

    @Test
    void testGetBySearch() {
        Serie serie = new Serie();
        serie.setId(1L);
        serie.setName("Nombre de la Serie");
        serie.setDescr("Descripción de la Serie");
        serie.setImgPath("ruta/de/imagen.jpg");
        when(serieRepository.findBySearch("Búsqueda")).thenReturn(Optional.of(serie));

        Serie result = serieService.getBySearch("Búsqueda");
        assertEquals(serie, result);
    }

    @Test
    void testSearchByName() {
        Serie serie1 = new Serie();
        serie1.setId(1L);
        serie1.setName("Nombre de la Serie 1");
        serie1.setDescr("Descripción de la Serie 1");
        serie1.setImgPath("ruta/de/imagen1.jpg");

        Serie serie2 = new Serie();
        serie2.setId(2L);
        serie2.setName("Nombre de la Serie 2");
        serie2.setDescr("Descripción de la Serie 2");
        serie2.setImgPath("ruta/de/imagen2.jpg");

        when(serieRepository.findBySearchContaining("Nombre", null)).thenReturn(serieRepository.findBySearchContaining("Nombre", null));

        Map<String, Object> result = serieService.searchByName("Nombre", 1);
        List<Serie> seriesResult = (List<Serie>) result.get("series");
        assertEquals(2, seriesResult.size());
        assertEquals(serie1, seriesResult.get(0));
        assertEquals(serie2, seriesResult.get(1));
    }

}

