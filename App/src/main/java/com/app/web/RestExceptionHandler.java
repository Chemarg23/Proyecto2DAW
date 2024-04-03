package com.app.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Clase que maneja excepciones para una API REST.
 * Extiende de ResponseEntityExceptionHandler para manejar excepciones relacionadas con ResponseEntity.
 */
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Maneja errores de validación de argumentos de método.
     *
     * @param ex      La excepción MethodArgumentNotValidException que se ha lanzado.
     * @param headers Encabezados de la solicitud.
     * @param status  Estado HTTP de la respuesta.
     * @param request Solicitud web.
     * @return Una respuesta con el estado de entidad no procesable y los errores de validación.
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, Object> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), error.getDefaultMessage());
        });
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorMap);
    }

   /**
 * Handles missing servlet request parameters by returning a response entity
 * with status code HttpStatus.UNPROCESSABLE_ENTITY (422 Unprocessable Entity).
 *
 * @param ex       The MissingServletRequestParameterException that occurred
 * @param headers  The headers for the response entity
 * @param status   The HttpStatus for the response entity
 * @param request  The current web request
 * @return A ResponseEntity containing a map with an error message indicating
 * the missing parameter
 */
@Override
protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    Map<String, Object> errorMap = new HashMap<>();
    errorMap.put("error", "Falta el parámetro requerido: " + ex.getParameterName());
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorMap);
}

}
