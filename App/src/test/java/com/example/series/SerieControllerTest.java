package com.example.series;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import com.app.Application;
import com.app.adapters.controllers.SerieController;
import com.app.application.services.SerieServiceImpl;
import com.app.domain.entity.Serie;
import com.app.dto.series.PostSerieDTO;


@SpringBootTest(classes = Application.class)
public class SerieControllerTest {

    private SerieController serieController;
    private SerieServiceImpl serieService;

    @BeforeEach
    void setUp() {
        serieService = mock(SerieServiceImpl.class);
        serieController = new SerieController(serieService);
    }

    @Test
    void testCreate() {
        PostSerieDTO dto = new PostSerieDTO();
        dto.setName("Nombre de la Serie");
        dto.setDescr("Descripción de la Serie");
        dto.setSearch("Búsqueda");
        dto.setCategories(new HashSet<>(Arrays.asList(1L, 2L)));
        MockMultipartFile file = new MockMultipartFile("imgPath", "imagen.jpg", "image/jpeg", new byte[0]);
        Serie serie = new Serie();
        serie.setId(1L);
        when(serieService.createOrUpdate(any(), nullable(Long.class))).thenReturn(serie);
        ResponseEntity<Serie> response = serieController.create(file, "Nombre de la Serie", "Descripción de la Serie", "Búsqueda", new HashSet<>(Arrays.asList(1L, 2L)));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(serie, response.getBody());
    }

    @Test
    void testUpdate() {
        PostSerieDTO dto = new PostSerieDTO();
        dto.setName("Nombre de la Serie");
        dto.setDescr("Descripción de la Serie");
        dto.setSearch("Búsqueda");
        dto.setCategories(new HashSet<>(Arrays.asList(1L, 2L)));
        MockMultipartFile file = new MockMultipartFile("imgPath", "imagen.jpg", "image/jpeg", new byte[0]);

        Serie serie = new Serie();
        serie.setId(1L);
        when(serieService.createOrUpdate(any(), nullable(Long.class))).thenReturn(serie);
        ResponseEntity<Serie> response = serieController.update(1L, file, "Nombre de la Serie", "Descripción de la Serie", "Búsqueda", new HashSet<>(Arrays.asList(1L, 2L)));
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(serie, response.getBody());
    }

    @Test
    void testGetAll() {
        Map<String, Object> seriesData = new HashMap();
        seriesData.put("series", Collections.emptyList());
        when(serieService.getAll(anyInt())).thenReturn(seriesData);
        ResponseEntity<Map<String, Object>> response = serieController.getAll(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(seriesData, response.getBody());
    }

    @Test
    void testGet() {
        Serie serie = new Serie();
        serie.setId(1L);
        when(serieService.get(1L)).thenReturn(serie);
        ResponseEntity<Serie> response = serieController.get(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(serie, response.getBody());
    }


}

  
