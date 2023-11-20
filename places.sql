-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2023 at 12:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sig`
--

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `places`
--

INSERT INTO `places` (`id`, `name`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, 'jakarta', -6.20000000, 106.81666600, '2023-11-20 11:52:45', '2023-11-20 14:33:47'),
(2, 'Bandung', -6.90597700, 107.61314400, '2023-11-20 11:52:45', '2023-11-20 14:48:35'),
(3, 'Bekasi', -6.24158600, 106.99241600, '2023-11-20 15:27:37', '2023-11-20 15:40:39'),
(4, 'bogor', -6.59503800, 106.81663500, '2023-11-20 15:45:49', '2023-11-20 15:45:49'),
(6, 'Depok', -6.40290500, 106.77841900, '2023-11-20 15:58:21', '2023-11-20 15:58:42'),
(8, 'PT KAI', -7.61704200, 111.52780000, '2023-11-20 16:32:34', '2023-11-20 16:35:14'),
(9, 'Taman bantaran', -7.62342800, 111.51560700, '2023-11-20 17:29:06', '2023-11-20 21:29:45'),
(10, 'jl.Pahlawan', -7.62389600, 111.52031100, '2023-11-20 21:44:18', '2023-11-20 21:51:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
