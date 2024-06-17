-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2024 a las 21:48:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `spring`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `search` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `search`) VALUES
(1, 'Acción', 'accion'),
(2, 'Aventura', 'aventura'),
(3, 'Comedia', 'comedia'),
(4, 'Drama', 'drama'),
(5, 'Fantasía', 'fantasia'),
(6, 'Terror', 'terror'),
(7, 'Misterio', 'misterio'),
(8, 'Romance', 'romance'),
(9, 'Ciencia Ficción', 'ciencia_ficcion'),
(10, 'Suspenso', 'suspenso'),
(11, 'Western', 'western'),
(12, 'Animación', 'animacion'),
(13, 'Crimen', 'crimen'),
(14, 'Documental', 'documental'),
(15, 'Familiar', 'familiar'),
(16, 'Historia', 'historia'),
(17, 'Música', 'musica'),
(18, 'Guerra', 'guerra'),
(19, 'Biografía', 'biografia'),
(20, 'Deportes', 'deportes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodes`
--

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `img_path` varchar(250) DEFAULT NULL,
  `video_path` varchar(250) DEFAULT NULL,
  `episode_number` int(11) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `serie_id` int(11) DEFAULT NULL,
  `fullname` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodes`
--

--
-- Disparadores `episodes`
--
DELIMITER $$
CREATE TRIGGER `trigger_insert_fullname_column` BEFORE INSERT ON `episodes` FOR EACH ROW BEGIN
    SET NEW.fullname = REPLACE(NEW.name, ' ', '_');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_update_fullname_column` BEFORE UPDATE ON `episodes` FOR EACH ROW BEGIN
    SET NEW.fullname = REPLACE(NEW.name, ' ', '_');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `room` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created_at`, `img_path`, `room`) VALUES
(1, 1, 'Hola', '2024-06-06 00:00:00', NULL, 0),
(2, 1, 'sdd', '2024-06-06 00:00:00', NULL, 0),
(3, 1, 'jhkmn', '2024-06-06 00:00:00', NULL, 0),
(4, 1, 'asdfg', '2024-06-06 00:00:00', NULL, 0),
(5, 1, 'sxs', '2024-06-06 00:00:00', NULL, 0),
(6, 1, 'swde', '2024-06-06 00:00:00', NULL, 0),
(7, 1, 'd', '2024-06-06 00:00:00', NULL, 0),
(8, 1, 'wert', '2024-06-06 00:00:00', NULL, 0),
(9, 1, 'Hola', '2024-06-06 00:00:00', '9l4xxO5QwMR8v6BzCKcniUO9UzoTlGsSBf141BhV49e2d1c7-4d9b-4e8e-bd41-dc2c8e42187b.png', 0),
(10, 1, 'dfv', '2024-06-06 00:00:00', NULL, 0),
(11, 1, 'bhjk', '2024-06-06 22:16:39', NULL, 0),
(12, 1, 'gggg', '2024-06-09 00:04:14', NULL, 0),
(13, 1, 'dfghj', '2024-06-09 12:06:20', NULL, 2),
(14, 1, 'dddd', '2024-06-09 12:06:30', NULL, 2),
(15, 1, 'ytuygjh', '2024-06-09 20:15:42', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `series`
--

CREATE TABLE `series` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `descr` text DEFAULT NULL,
  `img_path` varchar(250) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `search` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `series`
--
--
-- Disparadores `series`
--
DELIMITER $$
CREATE TRIGGER `serie` BEFORE INSERT ON `series` FOR EACH ROW BEGIN
    SET NEW.search = REPLACE(NEW.name, ' ', '_');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_insert_search_column` BEFORE INSERT ON `series` FOR EACH ROW BEGIN
    SET NEW.search = REPLACE(NEW.name, ' ', '_');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trigger_insert_update_column` BEFORE UPDATE ON `series` FOR EACH ROW BEGIN
    SET NEW.search = REPLACE(NEW.name, ' ', '_');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serie_category`
--

CREATE TABLE `serie_category` (
  `id` int(11) NOT NULL,
  `serie_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `serie_category`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `discharge_date` date DEFAULT NULL,
  `rol` tinyint(4) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `created_at`, `discharge_date`, `rol`, `img_path`) VALUES
(1, 'Jose Ramirez', 'mam@gmail.com', '$2a$10$tvf98IMhi.taX/Km8Qm8a.5wVJAfaKmBbyv6ECtWffCOORp/FKsFq', '693446022', '2024-06-06', NULL, 1, ''),
(6, 'Jose Ramirez', 'wsxdcsd@gmail.com', '$2a$10$u2sSCuxkUVMi7WPTr5gLSu0Ti.LrKTD6LsU3P8xZ7hQKBA1KLocHC', '693446022', '2024-06-09', NULL, 0, 'default.png'),
(7, 'John Doe', 'john@example.com', '$2a$10$WG7uyjxM4JzKWpTBkE7hlOH/b4Jibse/G8AnP2wc8Ljqn8BxuemAq', '1234567890', '2022-03-16', NULL, 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `serie_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `wishlist`
--


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_serie_id_episodios` (`serie_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `serie_category`
--
ALTER TABLE `serie_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `fk_serie_id_categorias` (`serie_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indices de la tabla `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `swdetrhy` (`serie_id`),
  ADD KEY `kjhjhjh` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `series`
--
ALTER TABLE `series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `serie_category`
--
ALTER TABLE `serie_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`),
  ADD CONSTRAINT `fk_serie_id_episodios` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `serie_category`
--
ALTER TABLE `serie_category`
  ADD CONSTRAINT `fk_serie_id_categorias` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `serie_category_ibfk_1` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`),
  ADD CONSTRAINT `serie_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `kjhjhjh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `swdetrhy` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
