package com.app.domain.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa un episodio de una serie.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "episodes")
public class Episode {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * El nombre del episodio.
     */
    private String name;

    /**
     * El nombre completo del episodio.
     */
    private String fullname;

    /**
     * La ruta de la imagen del episodio.
     */
    @Column(name = "img_path")
    private String imgPath;

    /**
     * El número de episodio.
     */
    @Column(name = "episode_number")
    private String episodeNumber;

    /**
     * La ruta del video del episodio.
     */
    @Column(name = "video_path")
    private String videoPath;

    /**
     * La fecha de lanzamiento del episodio.
     */
    @Column(name = "release_date")
    private LocalDate releaseDate = LocalDate.now();

    /**
     * La serie a la que pertenece este episodio.
     */
    @ManyToOne
    @JoinColumn(name = "serie_id", referencedColumnName = "id")
    private Serie serie;

}
