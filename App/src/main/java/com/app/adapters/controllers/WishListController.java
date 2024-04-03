package com.app.adapters.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.application.ports.services.WishListService;
import com.app.dto.wishlist.WishListDTO;

import lombok.RequiredArgsConstructor;

/**
 * Controlador para manejar las operaciones de la lista de deseos.
 */
@RequestMapping("/api/wishlist")
@RestController
@RequiredArgsConstructor
public class WishListController {
    
    @Autowired
    private final WishListService service;

    /**
     * Agrega una serie a la lista de deseos de un usuario.
     * 
     * @param request DTO que contiene el ID del usuario y el ID de la serie.
     * @return ResponseEntity con un cuerpo vacío y estado HTTP 200 (OK) si se agrega correctamente.
     */
    @PostMapping
    public ResponseEntity<?> addTo(@RequestBody WishListDTO request){
        service.add(request.getUserId(), request.getSerieId());
        return ResponseEntity.ok().build();
    }

    /**
     * Elimina una serie de la lista de deseos de un usuario.
     * 
     * @param request DTO que contiene el ID del usuario y el ID de la serie.
     * @return ResponseEntity con un cuerpo vacío y estado HTTP 200 (OK) si se elimina correctamente.
     */
    @DeleteMapping
    public ResponseEntity<?> removeFrom(@RequestBody WishListDTO request){
        service.remove(request.getUserId(), request.getSerieId());
        return ResponseEntity.ok().build();
    }

}
