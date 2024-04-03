package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.app.application.services.ChatServiceImpl;

/**
 * Configuración para WebSocket en la aplicación.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private ChatServiceImpl service;

    /**
     * Registra los controladores de WebSocket en el registro de manejadores.
     *
     * @param registry El registro de manejadores de WebSocket.
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        // Registra el servicio ChatServiceImpl como el manejador de WebSocket para la ruta /chat/{roomId}
        // y permite que todas las origenes accedan a esta ruta.
        registry.addHandler(service, "/chat/{roomId}").setAllowedOrigins("*");
    }
}
