package com.app.domain.entity;

import java.time.LocalDateTime;

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
 * Clase que representa un mensaje en el chat.
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "messages")
public class Message {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * El usuario que envió el mensaje.
     */
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    /**
     * El contenido del mensaje.
     */
    private String message;

    /**
     * La fecha y hora en que se creó el mensaje.
     */
    @Column(name = "created_at")
    private String createdAt = LocalDateTime.now().toString();

    /**
     * La ruta de la imagen adjunta al mensaje, si la hay.
     */
    @Column(name = "img_path")
    private String imgPath = null;

    /**
     * El ID de la sala de chat a la que pertenece el mensaje.
     */
    private int room;
}
