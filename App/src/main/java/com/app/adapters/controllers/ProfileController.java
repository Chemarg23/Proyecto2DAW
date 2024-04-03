package com.app.adapters.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.application.ports.services.ProfileService;
import com.app.dto.profile.NewPassword;
import com.app.dto.profile.UpdateProfile;
import com.app.dto.user.GetUserDTO;
import com.app.validator.ValidImage;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

/**
 * Controlador para manejar las operaciones relacionadas con el perfil de usuario.
 */
@RestController
@RequestMapping(value = "/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService service;

    /**
     * Actualiza el perfil de usuario.
     * 
     * @param id Identificador del usuario.
     * @param imgPath Imagen de perfil a subir (opcional).
     * @param name Nuevo nombre del usuario.
     * @param email Nuevo correo electrónico del usuario.
     * @param phone Nuevo número de teléfono del usuario.
     * @return ResponseEntity con el DTO del usuario actualizado y el estado de la respuesta.
     */
    @PutMapping(value = "/{id}")
    public ResponseEntity<GetUserDTO> updateProfile(
            @PathVariable Long id,
            @RequestParam(value = "imgPath", required = false) @ValidImage MultipartFile imgPath,
            @RequestParam("name") @NotBlank(message="Este campo es obligatorio") String name,
            @RequestParam("email") @NotBlank(message="Este campo es obligatorio") @Email String email,
            @RequestParam("phone") @NotBlank(message="Este campo es obligatorio") String phone) {

        UpdateProfile profile = new UpdateProfile();
        profile.setName(name);
        profile.setEmail(email);
        profile.setPhone(phone);
        profile.setImgPath(imgPath);

        return ResponseEntity.ok(service.updateProfile(profile, id));
    }

    /**
     * Cambia la contraseña del usuario.
     * 
     * @param id Identificador del usuario.
     * @param passwords Nuevo y antiguo contraseña.
     * @return ResponseEntity con el estado de la respuesta.
     */
    @PutMapping("/password/{id}")
    public ResponseEntity<?> changePasswords(@PathVariable Long id, @Valid @RequestBody NewPassword passwords) {
        service.changePassword(passwords, id);
        return ResponseEntity.ok().build();
    }

    /**
     * Da de baja al usuario.
     * 
     * @param id Identificador del usuario.
     * @return ResponseEntity con el estado de la respuesta.
     */
    @DeleteMapping("/discharge/{id}")
    public ResponseEntity<?> discharge(@PathVariable Long id) {
        service.discharge(id);
        return ResponseEntity.status(204).build();
    }
}
