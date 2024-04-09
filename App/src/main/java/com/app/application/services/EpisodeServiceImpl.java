package com.app.application.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.app.application.ports.repositories.EpisodesRepository;
import com.app.application.ports.repositories.SerieRepository;
import com.app.application.ports.services.EpisodeService;
import com.app.application.utils.Utils;
import com.app.domain.entity.Episode;
import com.app.domain.entity.Serie;
import com.app.dto.episodes.EpisodeDTO;

import lombok.RequiredArgsConstructor;

/**
 * Implementación de la interfaz EpisodeService que proporciona métodos para
 * acceder a los datos de los episodios.
 */
@Service
@RequiredArgsConstructor
public class EpisodeServiceImpl implements EpisodeService {

    public static final String VIDEO_PATH = "C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/content";
    public static final String SERIE_PATH = "C:/Users/josem/OneDrive/Escritorio/react/App/src/main/files/series";

    private final EpisodesRepository repo;

    private final SerieRepository serieRepository;

    /**
     * Obtiene todos los episodios.
     * 
     * @return Lista de todos los episodios
     */
    public List<Episode> getAll() {
        Pageable pageable = PageRequest.of(0, 20, Sort.by("id").descending());
        Page<Episode> page = repo.findAll(pageable);
        return page.getContent();
    }

    /**
     * Busca un episodio por su nombre.
     * 
     * @param name Nombre del episodio a buscar
     * @return El episodio con el nombre especificado
     * @throws ResponseStatusException si el episodio no se encuentra en la base de
     *                                 datos
     */
    public Episode getByName(String name) {
        var episode = repo.findByName(name);
        if (episode.isPresent()) {
            return episode.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    /**
     * Obtiene todos los episodios de una serie específica.
     * 
     * @param id Identificador de la serie
     * @return Lista de episodios de la serie con el identificador especificado
     */
    public List<Episode> getBySerie(Long id) {
        return repo.findBySerieId(id);
    }

    /**
     * Crea un nuevo episodio o actualiza uno existente en la base de datos.
     *
     * @param dto El objeto EpisodeDTO que contiene los datos del episodio.
     * @param id  El ID del episodio a actualizar, o null si es un nuevo episodio.
     * @return El episodio creado o actualizado.
     * @throws ResponseStatusException Si ocurre un error durante el proceso.
     */
    public Episode createOrUpdate(EpisodeDTO dto, Long id) throws IOException {
        Episode episode = id != null ? getExistingEpisode(id) : createNewEpisode(dto);
        updateEpisode(episode, dto);
        try {
            handleFileOperations(dto, episode);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
        try {
            episode= repo.save(episode);
        } catch (DataIntegrityViolationException e) {
            deleteFilesIfExists(episode);
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
        return episode;
    }

    /**
     * Elimina un episodio y sus archivos asociados si existen.
     *
     * @param id El ID del episodio a eliminar.
     * @throws ResponseStatusException Si el episodio no se encuentra o si ocurre un
     *                                 error al eliminar los archivos.
     */
    public void delete(Long id) {
        Episode episode = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        try {
            deleteFilesIfExists(episode);
            repo.deleteById(id);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar los archivos");
        }
    }

    /**
     * Elimina los archivos asociados a un episodio si existen.
     *
     * @param episode El episodio del cual se eliminarán los archivos.
     * @throws IOException Si ocurre un error al eliminar los archivos.
     */
    private void deleteFilesIfExists(Episode episode) throws IOException {
        if (episode.getImgPath() != null) {
            Files.delete(Paths.get(SERIE_PATH + "/" + episode.getImgPath()));
        }
        if (episode.getVideoPath() != null) {
            Files.delete(Paths.get(VIDEO_PATH + "/" + episode.getVideoPath()));
        }
    }

    /**
     * Obtiene un episodio existente por su ID.
     *
     * @param id El ID del episodio a obtener.
     * @return El episodio encontrado.
     * @throws ResponseStatusException Si el episodio no se encuentra.
     */
    private Episode getExistingEpisode(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    /**
     * Crea un nuevo episodio a partir de los datos del DTO.
     *
     * @param dto El DTO que contiene los datos del episodio a crear.
     * @return El episodio creado.
     * @throws ResponseStatusException Si la serie asociada no se encuentra.
     */
    private Episode createNewEpisode(EpisodeDTO dto) {
        Serie serie = serieRepository.findById(dto.getSerieId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Episode episode = new Episode();
        episode.setSerie(serie);
        return episode;
    }

    /**
     * Actualiza un episodio con los datos del DTO.
     *
     * @param episode El episodio a actualizar.
     * @param dto     El DTO que contiene los datos actualizados del episodio.
     */
    private void updateEpisode(Episode episode, EpisodeDTO dto) {
        episode.setFullname(dto.getFullName());
        episode.setName(dto.getName());
        episode.setEpisodeNumber(dto.getEpisodeNumber());
    }

    /**
     * Maneja las operaciones relacionadas con los archivos del episodio.
     *
     * @param dto     El DTO que contiene los datos del episodio y los archivos
     *                asociados.
     * @param episode El episodio al que se le aplicarán las operaciones de archivo.
     * @throws IOException Si ocurre un error durante el manejo de archivos.
     */
    private void handleFileOperations(EpisodeDTO dto, Episode episode) throws IOException {
        if (episode.getId() != null) {
            deleteExistingFilesIfPresent(dto, episode);
        }
        if (dto.getImg() != null) {
            episode.setImgPath(saveFile(dto.getImg(), SERIE_PATH));
        }
        if (dto.getVideo() != null) {
            episode.setVideoPath(saveFile(dto.getVideo(), VIDEO_PATH));
        }
    }

    /**
     * Elimina los archivos existentes asociados a un episodio si se proporcionan
     * nuevos archivos en el DTO.
     *
     * @param dto     El DTO que contiene los nuevos archivos.
     * @param episode El episodio del cual se eliminarán los archivos existentes.
     * @throws IOException Si ocurre un error al eliminar los archivos.
     */
    private void deleteExistingFilesIfPresent(EpisodeDTO dto, Episode episode) throws IOException {
        if (episode.getImgPath() != null && dto.getImg() != null) {
            Files.delete(Paths.get(SERIE_PATH + "/" + episode.getImgPath()));
        }
        if (episode.getVideoPath() != null && dto.getVideo() != null) {
            Files.delete(Paths.get(VIDEO_PATH + "/" + episode.getVideoPath()));
        }
    }

    /**
     * Guarda un archivo en la ruta especificada.
     *
     * @param file     El archivo a guardar.
     * @param filePath La ruta donde se guardará el archivo.
     * @return El nombre del archivo guardado.
     * @throws IOException Si ocurre un error durante el proceso de guardado.
     */
    private String saveFile(MultipartFile file, String filePath) throws IOException {
        if (file == null) {
            return null;
        }
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String fileName = Utils.generateRandomString(40) + UUID.randomUUID().toString() + extension;
        Path path = Paths.get(filePath + "/" + fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
}
