package com.example.episodes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.server.ResponseStatusException;

import com.app.Application;
import com.app.application.ports.repositories.EpisodesRepository;
import com.app.application.ports.services.EpisodeService;
import com.app.domain.entity.Episode;

import lombok.RequiredArgsConstructor;

@SpringBootTest(classes = Application.class)
@RequiredArgsConstructor
public class EpisodeServiceTest {

    @MockBean
    @Autowired
    private  EpisodesRepository episodesRepository;
    @Autowired
    private  EpisodeService episodeService;

    

    @Test
    void testGetAll() {
        List<Episode> episodes = new ArrayList<>();
        episodes.add(new Episode());
        Pageable pageable = PageRequest.of(0, 20, Sort.by("id").descending());
        Page<Episode> page = new PageImpl<>(episodes, pageable, episodes.size());
        when(episodesRepository.findAll(pageable)).thenReturn(page);
        List<Episode> result = episodeService.getAll();
        assertEquals(episodes.size(), result.size());
    }

    @Test
    void testGetByName() {
        Episode episode = new Episode();
        episode.setName("Nombre del Episodio");
        when(episodesRepository.findByName("Nombre del Episodio")).thenReturn(Optional.of(episode));

        Episode result = episodeService.getByName("Nombre del Episodio");
        assertEquals("Nombre del Episodio", result.getName());
    }

    @Test
    void testGetByNameNotFound() {
        when(episodesRepository.findByName("Nombre del Episodio")).thenReturn(Optional.empty());
        assertThrows(ResponseStatusException.class, () -> episodeService.getByName("Nombre del Episodio"));
    }

    @Test
    void testGetBySerie() {
        // Configurar comportamiento simulado para el repositorio
        List<Episode> episodes = new ArrayList<>();
        episodes.add(new Episode());
        when(episodesRepository.findBySerieId(1L)).thenReturn(episodes);

        // Llamar al método del servicio y verificar el resultado
        List<Episode> result = episodeService.getBySerie(1L);
        assertEquals(episodes.size(), result.size());
    }
}
