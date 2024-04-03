package com.app.application.ports.services;

import java.util.List;

import com.app.dto.user.GetUserDTO;
import com.app.dto.user.PostUserDTO;

/**
 * Interfaz que define los métodos disponibles para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en usuarios.
 */
public interface UserService {
    
    /**
     * Obtiene todos los usuarios.
     * @return Lista de DTOs de usuarios.
     */
    List<GetUserDTO> index();
    
    /**
     * Obtiene un usuario por su ID.
     * @param id El ID del usuario a buscar.
     * @return DTO del usuario encontrado.
     */
    GetUserDTO get(Long id);
    
    /**
     * Crea un nuevo usuario.
     * @param user DTO del usuario a crear.
     * @return DTO del usuario creado.
     */
    GetUserDTO create(PostUserDTO user);
    
    /**
     * Actualiza un usuario existente.
     * @param id El ID del usuario a actualizar.
     * @param updateData DTO del usuario con los nuevos datos.
     * @return DTO del usuario actualizado.
     */
    GetUserDTO update(Long id, GetUserDTO updateData);
    
    /**
     * Elimina un usuario por su ID.
     * @param id El ID del usuario a eliminar.
     */
    void delete(Long id);

  
}
