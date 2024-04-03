package com.app.application.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.SerieRepository;
import com.app.application.ports.repositories.UserRepository;
import com.app.application.ports.services.WishListService;
import com.app.domain.entity.Serie;
import com.app.domain.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

    private final UserRepository userRepository;
    private final SerieRepository serieRepository;

    /**
     * Agrega una serie a la lista de deseos de un usuario.
     *
     * @param userId  ID del usuario al que se agregará la serie.
     * @param serieId ID de la serie que se agregará a la lista de deseos.
     * @throws ResponseStatusException Si no se encuentra el usuario o la serie correspondiente.
     */
    @Override
    public void add(Long userId, Long serieId) {
       User user = getUserById(userId);
       Serie serie = getSerieById(serieId);
       user.addSerie(serie);
       userRepository.save(user);
    }
    
    /**
     * Elimina una serie de la lista de deseos de un usuario.
     *
     * @param userId  ID del usuario del que se eliminará la serie.
     * @param serieId ID de la serie que se eliminará de la lista de deseos.
     * @throws ResponseStatusException Si no se encuentra el usuario o la serie correspondiente.
     */
    @Override
    public void remove(Long userId, Long serieId) {
       User user = getUserById(userId);
       Serie serie = getSerieById(serieId);
       user.removeSerie(serie);
       userRepository.save(user);
    }
    
    /**
     * Obtiene un usuario por su ID.
     *
     * @param userId ID del usuario a obtener.
     * @return El usuario correspondiente al ID proporcionado.
     * @throws ResponseStatusException Si no se encuentra el usuario.
     */
    private User getUserById(Long userId) {
       return userRepository.findById(userId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el usuario"));
    }
    
    /**
     * Obtiene una serie por su ID.
     *
     * @param serieId ID de la serie a obtener.
     * @return La serie correspondiente al ID proporcionado.
     * @throws ResponseStatusException Si no se encuentra la serie.
     */
    private Serie getSerieById(Long serieId) {
       return serieRepository.findById(serieId)
                             .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró la serie"));
    }
}
