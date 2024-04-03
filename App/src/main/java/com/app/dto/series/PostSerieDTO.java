package com.app.dto.series;

import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.app.validator.ValidImage;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa los datos necesarios para crear una nueva serie.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostSerieDTO {

    /**
     * La imagen de la serie. Debe ser una imagen válida.
     */
    @ValidImage
    private MultipartFile imgPath;

    /**
     * El nombre de la serie.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String name;

    /**
     * La descripción de la serie.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String descr;

    /**
     * La cadena de búsqueda de la serie.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private String search;

    /**
     * El conjunto de identificadores de categorías a las que pertenece la serie.
     */
    @NotBlank(message = "Este campo es obligatorio")
    private Set<Long> categories;
}
