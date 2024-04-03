package com.app.dto.wishlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Clase que representa los datos necesarios para agregar o eliminar una serie de la lista de deseos de un usuario.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WishListDTO {
    /**
     * El identificador del usuario al que se agregará o eliminará la serie de la lista de deseos.
     */
    private Long userId;
    
    /**
     * El identificador de la serie que se agregará o eliminará de la lista de deseos del usuario.
     */
    private Long serieId;
}

