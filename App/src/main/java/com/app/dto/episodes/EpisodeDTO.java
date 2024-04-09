package com.app.dto.episodes;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EpisodeDTO {
    private MultipartFile img = null; 
    private MultipartFile video;
    private String name;
    private String fullName;
    private Long serieId;
    private int episodeNumber;
}
