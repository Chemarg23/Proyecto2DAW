package com.example.episodes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.app.Application;
import com.app.application.ports.repositories.EpisodesRepository;
import com.app.domain.entity.Episode;
import com.app.domain.entity.Serie;;


@SpringBootTest(classes = Application.class)
public class EpisodeRepositoryTest {

    @MockBean
    private EpisodesRepository episodesRepository;

    @BeforeEach
    void setUp() {
        Episode episode = new Episode();
        episode.setId(1L);
        episode.setName("Nombre del Episodio");
        Serie serie = new Serie();
        serie.setId(1L);
        serie.setName("Nombre de la Serie");
        episode.setSerie(serie);

        List<Episode> episodes = new ArrayList<>();
        episodes.add(episode);

        when(episodesRepository.findByName("Nombre del Episodio")).thenReturn(Optional.of(episode));
        when(episodesRepository.findBySerieId(1L)).thenReturn(episodes);
    }

    @Test
    void testFindByName() {
        Optional<Episode> optionalEpisode = episodesRepository.findByName("Nombre del Episodio");
        assertTrue(optionalEpisode.isPresent());
        Episode episode = optionalEpisode.get();
        assertEquals("Nombre del Episodio", episode.getName());
    }

    @Test
    void testFindBySerieId() {
        List<Episode> episodes = episodesRepository.findBySerieId(1L);
        assertEquals(1, episodes.size());
        Episode episode = episodes.get(0);
        assertEquals("Nombre del Episodio", episode.getName());
        assertEquals("Nombre de la Serie", episode.getSerie().getName());
    }
}

