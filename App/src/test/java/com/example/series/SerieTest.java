package com.example.series;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.HashSet;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.Application;
import com.app.domain.entity.Category;
import com.app.domain.entity.Serie;

@SpringBootTest(classes = Application.class)
public class SerieTest {

    @Test
    void testSerieEntity() {
        Serie serie = new Serie();
        serie.setId(1L);
        serie.setName("Nombre de la Serie");
        serie.setDescr("Descripción de la Serie");
        serie.setImgPath("/ruta/de/imagen.jpg");
        serie.setReleaseDate(LocalDate.now());
        serie.setFinishDate(null);
        serie.setSearch("Búsqueda de la Serie");
        serie.setCategories(new HashSet<Category>());

        assertEquals(1L, serie.getId());
        assertEquals("Nombre de la Serie", serie.getName());
        assertEquals("Descripción de la Serie", serie.getDescr());
        assertEquals("/ruta/de/imagen.jpg", serie.getImgPath());
        assertEquals(LocalDate.now(), serie.getReleaseDate());
        assertEquals(null, serie.getFinishDate());
        assertEquals("Búsqueda de la Serie", serie.getSearch());
        assertNotNull(serie.getCategories());
        assertEquals(0, serie.getCategories().size());
    }
}
