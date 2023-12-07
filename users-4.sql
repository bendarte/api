-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 07 dec 2023 kl 13:10
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `jensen2023`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`) VALUES
(1, 'kalleanka', 'newpassword', 'Donald Duck', 'kalle@anka.se'),
(3, 'knlleanka', 'newpassword', 'Knalle Anka', 'knalle@anka.se'),
(4, 'Baalxoofto', 'galla', 'Gaal', 'ali.it@se'),
(5, 'sharre', 'marre', 'Sharre', 'sharre@it.se'),
(6, 'Miketyson', 'kistajensen', 'Mike Tyson', 'mike@it.se'),
(7, 'kistatyson', 'kistasen', 'Kista Tyson', 'mike@it.se'),
(13, 'meyson', 'iller', 'ooiminn', 'osman@stja.se'),
(14, 'keyon', 'iloler', 'skolans', 'osman@stja.se'),
(15, 'b', '99ae59705a7898c8c9b30b1ad4be3566212e3121c0ca5a1224f04f61fbaa72b2', 'BERTIL', 'Bertil@p.se'),
(16, 'ferro', 'moe', 'undefined', 'undefined'),
(20, 'musa', 'chef', 'undefined', 'undefined'),
(21, 'Kallo', 'f54bbe0618ff6208011be0052ce203216544c71e60478aa7d9b79391dcabbf77', 'Holger', 'ali@it.se'),
(22, 'Ferido', 'f54bbe0618ff6208011be0052ce203216544c71e60478aa7d9b79391dcabbf77', 'Gaal', 'ali@it.se'),
(23, 'Nadiro', 'f54bbe0618ff6208011be0052ce203216544c71e60478aa7d9b79391dcabbf77', 'Nadir', 'ali@it.se'),
(24, 'liba', '9d8d7dcb8f6d4d71ffc8277e4a8a4326c93da239cace375d47c4a35830b3e88b', 'Lina', 'lina@lina.se');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
