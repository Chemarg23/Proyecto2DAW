package com.app.adapters.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.application.services.StreamServiceImpl;

import reactor.core.publisher.Mono;

/**
 * Controlador para la transmisión de contenido multimedia y la obtención de imágenes.
 */
@RestController
@RequestMapping("/api/stream")
@CrossOrigin(origins = "*")
public class StreamController {

    @Autowired
    private StreamServiceImpl service;

    /**
     * Obtiene y transmite el contenido multimedia especificado.
     * 
     * @param title Título del contenido multimedia.
     * @return Mono con el recurso de contenido multimedia.
     */
    @GetMapping(value = "/{title}", produces = "video/mp4")
    public Mono<Resource> streamContent(@PathVariable String title) {
        return service.retrieveContent(title);
    }

    /**
     * Obtiene la imagen especificada.
     * 
     * @param title Título de la imagen.
     * @return Mono con el recurso de la imagen.
     */
    @GetMapping(value = "/img/{title}", produces = { "image/jpeg", "image/jpg", "image/png" })
    public Mono<Resource> getImg(@PathVariable String title) {
        return service.retrieveImg(title);
    }

    /**
     * Obtiene la imagen de usuario especificada.
     * 
     * @param title Título de la imagen de usuario.
     * @return Mono con el recurso de la imagen de usuario.
     */
    @GetMapping(value = "/img/user/{title}", produces = { "image/jpeg", "image/jpg", "image/png" })
    public Mono<Resource> getUserImg(@PathVariable String title) {
        return service.retrieveUserImg(title);
    }

    /**
     * Obtiene la imagen de chat especificada.
     * 
     * @param title Título de la imagen de chat.
     * @return Mono con el recurso de la imagen de chat.
     */
    @GetMapping(value = "/img/chat/{title}", produces = { "image/jpeg", "image/jpg", "image/png" })
    public Mono<Resource> getChatImg(@PathVariable String title) {
        return service.retrieveChatImg(title);
    }
}
