
package com.app.validator;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/*
 * Validador para verificar si un archivo cargado es un video mp4 válida.
 */
public class VideoValidator implements ConstraintValidator<ValidVideo, MultipartFile> {

    // Lista de tipos MIME permitidos
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList("video/mp4");

    @Override
    public void initialize(ValidVideo constraintAnnotation) {
    }

    /**
     * Verifica si el archivo cargado es un video mp4
     *
     * @param file     El archivo cargado
     * @param context  El contexto de validación
     * @return true si el archivo es una video válido, false de lo contrario
     */
    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        // Si el archivo es nulo o está vacío, se considera válido
        if (file == null || file.isEmpty()) {
            return true;
        }
        // Verifica si el tipo MIME del archivo está en la lista de tipos MIME permitidos
        return ALLOWED_CONTENT_TYPES.contains(file.getContentType());
    }
}
