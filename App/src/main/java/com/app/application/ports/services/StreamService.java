package com.app.application.ports.services;

import org.springframework.core.io.Resource;

import reactor.core.publisher.Mono;

public interface StreamService {
    
     /**
     * Recupera el recurso de video correspondiente al título especificado.
     * 
     * @param title El título del video
     * @return Un objeto Mono que representa el recurso de video
     */
    public Mono<Resource> retrieveContent(String title);

    /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la serie
     * @return Un objeto Mono que representa el recurso de imagen de portada de
     *         serie
     */
    public Mono<Resource> retrieveImg(String title);

    /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la foto
     * @return Un objeto Mono que representa el recurso de imagen de usuario
     */
    public Mono<Resource> retrieveUserImg(String title);

     /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la foto
     * @return Un objeto Mono que representa el recurso de imagen de usuario
     */
    public Mono<Resource> retrieveChatImg(String title);
}
