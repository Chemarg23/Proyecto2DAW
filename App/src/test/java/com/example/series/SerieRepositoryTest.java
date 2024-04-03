package com.example.series;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.app.Application;
import com.app.application.ports.repositories.SerieRepository;
import com.app.domain.entity.Category;
import com.app.domain.entity.Serie;

@SpringBootTest(classes = Application.class)
public class SerieRepositoryTest {

    @Autowired
    private SerieRepository serieRepository;


    @Test
    void testFindByName() {
        Serie serie = new Serie();
        serie.setName("Nombre de la Serie");
        serie.setDescr("Descripción de la Serie");
        serie.setImgPath("/ruta/de/imagen.jpg");
        serie.setReleaseDate(LocalDate.now());
        serie.setFinishDate(null);
        serie.setSearch("Búsqueda de la Serie");
        serie.setCategories(new HashSet<>());
        serieRepository.save(serie);
        Optional<Serie> foundSerieOptional = serieRepository.findByName("Nombre de la Serie");
        assertTrue(foundSerieOptional.isPresent());
        Serie foundSerie = foundSerieOptional.get();
        assertEquals(serie.getId(), foundSerie.getId());
        assertEquals(serie.getName(), foundSerie.getName());
        assertEquals(serie.getDescr(), foundSerie.getDescr());
    }

    @Test
    void testSaveAndFindByName() {
        Serie serie = new Serie();
        serie.setName("Nombre de la Serie");
        serie.setDescr("Descripción de la Serie");
        serie.setImgPath("/ruta/de/imagen.jpg");
        serie.setReleaseDate(LocalDate.now());
        serie.setFinishDate(null);
        serie.setSearch("Búsqueda de la Serie");
        serie.setCategories(new HashSet<Category>());
        Serie savedSerie = serieRepository.save(serie);

        Optional<Serie> foundSerieOptional = serieRepository.findByName("Nombre de la Serie");

        assertTrue(foundSerieOptional.isPresent());

        Serie foundSerie = foundSerieOptional.get();
        assertEquals(savedSerie.getId(), foundSerie.getId());
        assertEquals(savedSerie.getName(), foundSerie.getName());
        assertEquals(savedSerie.getDescr(), foundSerie.getDescr());
    }

    @Test
    void testFindBySearchContaining() {
        Serie serie1 = new Serie();
        serie1.setName("Serie 1");
        serie1.setSearch("Búsqueda 1");
        serie1.setCategories(new HashSet<>());
        serie1.setDescr("descricion");
        serie1.setImgPath("img");
        serieRepository.save(serie1);

        Serie serie2 = new Serie();
        serie2.setName("Serie 2");
        serie2.setSearch("Búsqueda 2");
        serie2.setDescr("descricion");
        serie2.setImgPath("img");
        serie2.setCategories(new HashSet<>());
        serieRepository.save(serie2);

        Serie serie3 = new Serie();
        serie3.setName("Serie 3");
        serie3.setSearch("Búsqueda 1");
        serie3.setDescr("descricion");
        serie3.setImgPath("img");
        serie3.setCategories(new HashSet<>());
        serieRepository.save(serie3);

        // Realizar la búsqueda por término de búsqueda
        Page<Serie> foundSeries = serieRepository.findBySearchContaining("Búsqueda 1", PageRequest.of(0, 10));

        assertEquals(2, foundSeries.getTotalElements());
        assertTrue(foundSeries.stream().anyMatch(serie -> serie.getName().equals("Serie 1")));
        assertTrue(foundSeries.stream().anyMatch(serie -> serie.getName().equals("Serie 3")));
        assertFalse(foundSeries.stream().anyMatch(serie -> serie.getName().equals("Serie 2")));
    }

}
