package com.app.application.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.UserRepository;
import com.app.application.ports.services.ProfileService;
import com.app.application.utils.Utils;
import com.app.domain.entity.User;
import com.app.dto.profile.NewPassword;
import com.app.dto.profile.UpdateProfile;
import com.app.dto.user.GetUserDTO;

import lombok.RequiredArgsConstructor;

/**
 * Implementación del servicio para la gestión de perfiles de usuario.
 */
@RequiredArgsConstructor
@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper = new ModelMapper();
    private final String UPLOAD_DIR = "C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/users";

    /**
     * Actualiza el perfil de un usuario.
     * 
     * @param profile Los datos de actualización del perfil.
     * @param id      El ID del usuario cuyo perfil se va a actualizar.
     * @return        DTO que representa el perfil actualizado del usuario.
     */
    @Override
    public GetUserDTO updateProfile(UpdateProfile profile, Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el usuario"));
        user.update(profile);
        GetUserDTO userDTO = modelMapper.map(user, GetUserDTO.class);
        if (profile.getImgPath() != null) {
            try {
                MultipartFile imgPath = profile.getImgPath();
                String originalFilename = imgPath.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String fileName = Utils.generateRandomString(40) + UUID.randomUUID().toString() + extension;
                Path path = Paths.get(UPLOAD_DIR + "/" + fileName);
                if (user.getImgPath() == "default.png") {
                    Path prevFile = Paths.get(UPLOAD_DIR + "/" + user.getImgPath());
                    Files.delete(prevFile);
                }
                Files.copy(imgPath.getInputStream(), path);
                userDTO.setImgPath(fileName);
                user.setImgPath(fileName);
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
            }
        }
        try {
            repository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este email ya ha sido tomado");
        }
        return userDTO;
    }

    /**
     * Cambia la contraseña de un usuario.
     * 
     * @param passwords Los datos de la nueva contraseña.
     * @param id        El ID del usuario cuya contraseña se va a cambiar.
     */
    @Override
    public void changePassword(NewPassword passwords, Long id) {
        if (passwords.confirm()) {
            User user = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            if (passwordEncoder.matches(passwords.getPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(passwords.getNewPassword()));
                repository.save(user);
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Las contraseñas no coinciden");
        }
    }

    /**
     * Da de baja a un usuario.
     * 
     * @param id El ID del usuario que se va a dar de baja.
     */
    @Override
    public void discharge(Long id) {
        User user = repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.setDischargeDate(LocalDate.now());
        repository.save(user);
    }

}
