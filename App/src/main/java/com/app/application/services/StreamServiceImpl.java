package com.app.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import com.app.application.ports.services.StreamService;

import reactor.core.publisher.Mono;

/**
 * Servicio para recuperar contenido multimedia y portadas de series.
 */
@Service
public class StreamServiceImpl implements StreamService{

    @Autowired
    private ResourceLoader resourceLoader;

    // Rutas de los archivos multimedia, aun he de encontrar un sitio
    public static final String VIDEO_PATH = "file:///C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/content/%s.mp4";
    public static final String SERIE_PATH = "file:///C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/series/%s";
    public static final String USER_PATH = "file:///C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/users/%s";

    public static final String CHAT_PATH = "file:///C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/chat/%s";

    /**
     * Recupera el recurso de video correspondiente al título especificado.
     * 
     * @param title El título del video
     * @return Un objeto Mono que representa el recurso de video
     */
    public Mono<Resource> retrieveContent(String title) {
        return Mono.fromSupplier(() -> resourceLoader.getResource(String.format(VIDEO_PATH, title)));
    }

    /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la serie
     * @return Un objeto Mono que representa el recurso de imagen de portada de
     *         serie
     */
    public Mono<Resource> retrieveImg(String title) {
        return Mono.fromSupplier(() -> resourceLoader.getResource(String.format(SERIE_PATH, title)));
    }

    /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la foto
     * @return Un objeto Mono que representa el recurso de imagen de usuario
     */
    public Mono<Resource> retrieveUserImg(String title) {
        return Mono.fromSupplier(() -> resourceLoader.getResource(String.format(USER_PATH, title)));
    }

     /**
     * Recupera el recurso de imagen de portada de serie correspondiente al título
     * especificado.
     * 
     * @param title El título de la foto
     * @return Un objeto Mono que representa el recurso de imagen de usuario
     */
    public Mono<Resource> retrieveChatImg(String title) {
        return Mono.fromSupplier(() -> resourceLoader.getResource(String.format(CHAT_PATH, title)));
    }
}
