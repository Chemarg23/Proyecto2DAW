package com.example.episodes;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import com.app.Application;
import com.app.application.ports.repositories.EpisodesRepository;
import com.app.application.ports.repositories.SerieRepository;
import com.app.domain.entity.Episode;
import com.app.domain.entity.Serie;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;


@SpringBootTest(classes = Application.class)
public class EpisodeTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private SerieRepository serieRepository;

    @Autowired
    private EpisodesRepository episodeRepository;

    @Test
    @DirtiesContext
    void testEpisodeEntityMapping() {
        Serie serie = new Serie();
        serie.setName("Nombre de la Serie");
        serie.setDescr("12234");
        serie.setImgPath("1234");
        serie.setSearch("2345678");
        serieRepository.save(serie);
        Episode episode = new Episode();
        episode.setName("Nombre del Episodio");
        episode.setFullname("Nombre Completo del Episodio");
        episode.setImgPath("ruta/de/imagen.jpg");
        episode.setEpisodeNumber(1);
        episode.setVideoPath("ruta/de/video.mp4");
        episode.setReleaseDate(LocalDate.now());
        episode.setSerie(serie);
        episodeRepository.save(episode);

        Episode retrievedEpisode = episodeRepository.findById(episode.getId()).orElse(null);
        assertNotNull(retrievedEpisode);
        assertEquals("Nombre del Episodio", retrievedEpisode.getName());
        assertEquals("Nombre Completo del Episodio", retrievedEpisode.getFullname());
        assertEquals("ruta/de/imagen.jpg", retrievedEpisode.getImgPath());
        assertEquals("1", retrievedEpisode.getEpisodeNumber());
        assertEquals("ruta/de/video.mp4", retrievedEpisode.getVideoPath());
        assertNotNull(retrievedEpisode.getReleaseDate());
        assertNotNull(retrievedEpisode.getSerie());
        assertEquals(serie.getName(), retrievedEpisode.getSerie().getName());
    }
}
