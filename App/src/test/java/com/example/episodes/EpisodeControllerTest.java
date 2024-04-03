package com.example.episodes;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.app.Application;
import com.app.application.ports.services.EpisodeService;
import com.app.domain.entity.Episode;;

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
public class EpisodeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EpisodeService episodeService;

    @Test
    void testAll() throws Exception {
        List<Episode> episodes = new ArrayList<>();
        episodes.add(new Episode());
        given(episodeService.getAll()).willReturn(episodes);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/episodes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(episodes.get(0).getName()));
    }

    @Test
    void testGetByName() throws Exception {
        Episode episode = new Episode();
        episode.setName("Nombre del Episodio");
        given(episodeService.getByName("Nombre del Episodio")).willReturn(episode);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/episodes/name/{name}", "Nombre del Episodio")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(episode.getName()));
    }

    @Test
    void testGetEpisodes() throws Exception {
        List<Episode> episodes = new ArrayList<>();
        episodes.add(new Episode());
        given(episodeService.getBySerie(1L)).willReturn(episodes);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/episodes/episodes/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(episodes.get(0).getName()));
    }
}

