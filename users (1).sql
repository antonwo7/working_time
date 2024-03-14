-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 17, 2024 at 02:03 PM
-- Server version: 8.1.0
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `horario`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL,
  `name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nif` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `naf` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contract_code` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `name`, `nif`, `naf`, `contract_code`, `date`) VALUES
(3, 'anapapuc', '$2a$07$nAkMaLIVVMMgxqggDA52heQmOYYFuqh9MsYFiokJt.PlsAFmX1GV6', 2, 'Ana Maria Papuc', 'X8546633V', '461090502332', '100', '2020-06-15'),
(14, 'sergiosanchis', '$2a$07$eAR4qC6fo7GPCmsQc5yEdOlCfBMDITdNoHBQ458iV1yHqr7vi34O6', 1, 'Sergio Sanchis Castellanos', '22581888M', '461026621162', '100', '2020-08-17'),
(15, 'alejandrogaliano', '$2a$07$veq/ieJyhjCqoTP4z3pDLe/bNjwQYzfjV5nlT/LwmO0mxJ4eHcZEi', 1, 'Alejandro Galiano Gosalvez', '48579118J', '031069161230', '189', '2020-09-01'),
(16, 'rubenmonerris', '$2a$07$2pm3BqUrMx4XgN3t6SapJ.6SLvbup5.7WBSCy2KwZkpdATwScLat6', 1, 'Ruben Monerris Valor', '21666657J', '031016969570', '100', '2022-03-28'),
(17, 'antonbabeshka', '$2a$07$4.yr3rYhdaOf7ygsLjILgOwKru.nC1qRIpp2wF1vaUJh3PrSu2Y4.', 1, 'Anton Babeshka', 'Y8795465A', '501077057357', '100', '2022-04-11'),
(18, 'anamoreno', '$2a$07$1dF8XKu/IxifNcXcN53ECeSuIjlYUXrEDf.3tgsPswR9semjpaxuC', 1, 'Ana Moreno Belda', '15420335P', '031036104539', '100', '2022-05-09'),
(19, 'deboraalbors', '$2a$07$mo9OFn5CbTIBccGEfn8RcumPnKymM2VaW/O.50DSTxooMyIwsNfX6', 1, 'Debora Albors Giner', '21684529Z', '031029168635', '100', '2023-01-12'),
(20, 'oscargalcera', '$2a$07$NM4o0x20GgkMfvDSwmamNeF/eDUJxc/0uBxO45IXBodcOruX/hvPG', 1, 'Oscar Galcera Olaso', '52774038D', '031001138665', '100', '2022-12-21'),
(21, 'agustinramos', '$2a$07$ma2BYSjLEdPskdkd1I6IhexUesQFnNF.eNE8J2ikmS9cfjgRjqqbG', 1, 'Agustin Ramos Morillo', '48536087S', '031020103882', '100', '2023-01-30'),
(22, 'pilararribas', '$2a$07$hspW6WMOLtNl2YgxsxY9QOgHPrVYe9w5bgkFkmBiQYTuEL4rfu68S', 1, 'Pilar Arribas Blanco', '46890526N', '301019333700', '100', '2023-02-01'),
(23, 'mariamtanatu', '$2a$07$qcvR2iVPLd0ZUXYRiOBqzOxlABeKtuo97O4uTzsntd56oURp6PXVS', 1, 'Mariam Tanatu Charki el Kart', '60106628S', '031073216032', '100', '2023-06-01'),
(24, 'rafaelescudero', '$2a$07$dQLThvmkvF6ED9FtJWBG1OluEKmeQKD3ZceXVlRYHRJfeGdOwGH2.', 1, 'Rafael Escudero Lopez', '30554149Y', '480101152063', '100', '2023-05-03'),
(25, 'pablohernansanz', '$2a$07$PVpExRg9G82GJbyaHb23IuD8bt3Tn2pFd9cNAgL3KTRekmzOJbtea', 1, 'Pablo Hernansanz Blanco', '48626251L', '031060345546', '100', '2023-05-30'),
(26, 'gemmapeleteiro', '$2a$07$y9jUh7pA53yNIu1MRCoGj.DcD2nixjkhuyFM34/GSS5G8qXT/P4Ti', 1, 'Gemma Peleteiro Quintans', '53456957N', '031047361892', '100', '2023-06-05'),
(27, 'ignaciomendo', '$2a$07$Re8I8FOa1kgGehQyakwLYuf7E6qGGyD8D7KU8CzVts4KXUzaV2dwO', 1, 'Ignacio Mendo Fernandez', '28959151N', '031017957556', '100', '2023-06-14'),
(28, 'javierperez', '$2a$07$LYKEyBKiThZSTUPoM5jifOeWk9EuYw9dU51YR8EqdqIV6sX4DqK52', 1, 'Javier Perez Rodriguez', '48643524L', '031113258945', '100', '2023-07-05'),
(29, 'joaquinpaisan', '$2a$07$.DGljCRWUXnhF4zf8W.dcetjEy4uzs/I1O5kYGMv/gAoyd6taIfdq', 1, 'Joaquin Paisan Rodriguez', '21511882M', '031012343781', '100', '2023-07-12'),
(30, 'joaquinromero', '$2a$07$8lSDfdgHm.ileN9SuPuLMOQNqM8YspVHO9SVrgI1NaD8rIR/WEcnu', 1, 'Joaquin Lazaro Romero Garcia', '48366701R', '031008869868', '100', '2023-07-12'),
(31, 'franciscocuvertoret', '$2a$07$IU23vjIFmwl.3TzmjLi8FeV8xRkN/p.fRTwpm8hmFW9DRxWN1KYM6', 1, 'Francisco Cuvertoret Campos', '48534527L', '031019506829', '100', '2023-08-16'),
(36, 'mariagarcia', '$2a$07$F/.UAfugyXQSRmIKSh8Gq.B2lHDmt0M3x1Fetw7WfL6pmwCXTNBK6', 1, 'Maria Garcia Pazos', '72577879E', '481017551125', '100', '2023-11-02'),
(37, 'isabelsanchez', '$2a$07$p.scrQgN4Srta5hkn3n4c.Zfxarw9KE.m7lORbE560b5cjWkhXvV6', 1, 'Isabel Sanchez Boluda', '48546544F', '301049101077', '100', '2023-12-04'),
(38, 'cesarcliment', '$2a$07$h4vGALe3VSTFsUC0.A36juKdLWoypeQ1j5gaATv27MhW0Gw8Dvre.', 1, 'Cesar Climent de Andres', '38125312Y', '081005427496', '0', '2024-01-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
