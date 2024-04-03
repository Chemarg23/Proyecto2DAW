package com.app.dto.message;



import com.app.dto.user.GetUserDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Clase que representa un mensaje de chat enviado por un usuario.
 */
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MessageDTO {
    
    /**
     * El identificador único del mensaje.
     */
    private Long id;

    /**
     * Los datos del usuario que envió el mensaje.
     */
    private GetUserDTO user;

    /**
     * El contenido del mensaje.
     */
    private String message;

    /**
     * La fecha y hora en que se creó el mensaje.
     */
    private String createdAt;

    /**
     * La ruta de la imagen adjunta al mensaje.
     */
    private String imgPath;

    /**
     * El identificador de la sala de chat a la que pertenece el mensaje.
     */
    private int room;
}

