-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2022 at 11:42 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `location` varchar(80) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location`, `created_at`, `updated_at`) VALUES
(1, 'South Jakarta', '2022-04-19 03:25:26', '2022-04-19 04:07:41'),
(3, 'Yogyakarta', '2022-04-19 04:08:18', '2022-04-19 04:08:18'),
(4, 'Bandung', '2022-04-19 04:14:12', '2022-04-19 04:14:12'),
(5, 'Semarang', '2022-04-19 04:14:23', '2022-04-19 04:14:23'),
(6, 'North Jakarta', '2022-04-19 04:14:32', '2022-04-19 04:14:32'),
(7, 'East Jakarta', '2022-04-19 04:38:34', '2022-04-19 04:38:34'),
(8, 'Nusa Dua', '2022-04-19 04:38:41', '2022-04-19 04:38:41'),
(9, 'Bandar Lampung', '2022-04-19 04:38:49', '2022-04-19 04:38:49'),
(10, 'Bogor', '2022-04-19 04:38:57', '2022-04-19 04:38:57'),
(11, 'Palembang', '2022-04-19 04:39:04', '2022-04-19 04:39:04'),
(12, 'Padang', '2022-04-19 04:39:09', '2022-04-19 04:39:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
