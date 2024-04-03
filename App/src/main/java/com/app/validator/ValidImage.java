package com.app.validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Anotación para verificar si un archivo cargado es una imagen válida.
 */
@Documented
@Constraint(validatedBy = ImageValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidImage {
    /**
     * Mensaje de error mostrado cuando la validación falla.
     * 
     * @return el mensaje de error predeterminado
     */
    String message() default "El archivo no es una imagen válida";

    /**
     * Define los grupos de restricción.
     * 
     * @return los grupos de restricción predeterminados
     */
    Class<?>[] groups() default {};

    /**
     * Define la carga útil que puede ser usada por el framework de validación.
     * 
     * @return la carga útil predeterminada
     */
    Class<? extends Payload>[] payload() default {};
}
