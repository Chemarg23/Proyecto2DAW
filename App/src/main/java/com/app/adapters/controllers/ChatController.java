package com.app.adapters.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.ChatRepository;
import com.app.application.utils.Utils;
import com.app.domain.entity.Message;
import com.app.dto.message.MessageDTO;

import lombok.RequiredArgsConstructor;

/**
 * Controlador para manejar las operaciones relacionadas con el chat.
 */
@RequestMapping(value = "/api/chat")
@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatRepository repo;
    private final ModelMapper modelMapper;
    private final String UPLOAD_DIR = "C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/chat";
    
    /**
     * Obtiene los mensajes de una sala de chat paginados.
     * 
     * @param roomId Identificador de la sala de chat.
     * @param page Número de página.
     * @return ResponseEntity con la lista de mensajes DTO y el estado de la respuesta.
     */
    @GetMapping("/{roomId}/{page}")
    public ResponseEntity<List<MessageDTO>> getMessages(@PathVariable int roomId, @PathVariable int page) {
        Pageable pageable = PageRequest.of(page - 1, 5, Sort.by("id").descending());
        Page<Message> messagePage = repo.findByRoom(roomId, pageable)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<MessageDTO> DtoList = messagePage.map(this::toDTO).getContent();
        return ResponseEntity.ok(DtoList);
    }

    /**
     * Obtiene un mensaje por su identificador.
     * 
     * @param id Identificador del mensaje.
     * @return ResponseEntity con el mensaje DTO y el estado de la respuesta.
     */
    @GetMapping("/message/{id}")
    public ResponseEntity<MessageDTO> getMessage( @PathVariable Long id) {
        Message message =  repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        MessageDTO DtoList = modelMapper.map(message,MessageDTO.class);
        return ResponseEntity.ok(DtoList);
    }

    /**
     * Maneja la subida de archivos de imágenes al servidor.
     * 
     * @param img Archivo de imagen a subir.
     * @return ResponseEntity con el nombre del archivo subido y el estado de la respuesta.
     */
    @PostMapping
    public ResponseEntity<String> saveImg(
            @RequestParam("img") MultipartFile img) {
        try {
            String originalFilename = img.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = Utils.generateRandomString(40) +UUID.randomUUID().toString()+ extension;

            Path path = Paths.get(UPLOAD_DIR + "/" + fileName);
            Files.copy(img.getInputStream(), path);

            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file" + e);
        }
    }

    private MessageDTO toDTO(Message message) {
        return modelMapper.map(message, MessageDTO.class);
    } 
}
