-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2022 at 09:11 PM
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
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipient` varchar(80) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `phone_number` varchar(14) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sum` int(11) NOT NULL DEFAULT 1,
  `total_cost` int(11) NOT NULL,
  `prepayment` int(11) NOT NULL,
  `status` enum('Booked','Rent','Returned','Cancelled','Wait for payment','DP') NOT NULL DEFAULT 'Wait for payment',
  `rent_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `vehicle_id`, `user_id`, `recipient`, `address`, `phone_number`, `email`, `sum`, `total_cost`, `prepayment`, `status`, `rent_date`, `return_date`, `createdAt`, `updated_at`) VALUES
(3, 3, NULL, '', '', '', '', 1, 0, 150000, 'Rent', '2022-02-03', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(13, 2, NULL, '', '', '', '', 1, 0, 0, 'Returned', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(14, 44, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(15, 2, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(16, 10, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(17, 9, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(18, 44, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49', '2022-04-07 17:21:46'),
(19, 5, NULL, '', '', '', '', 1, 0, 100000, 'Returned', '2022-02-05', '2022-02-07', '2022-02-03 08:46:27', '2022-04-07 17:21:46'),
(20, 5, NULL, '', '', '', '', 1, 0, 100000, 'Cancelled', '2022-02-05', '2022-02-07', '2022-02-06 10:37:11', '2022-04-07 17:21:46'),
(21, 7, NULL, '', '', '', '', 1, 0, 100000, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 10:51:34', '2022-04-07 17:21:46'),
(22, 7, NULL, '', '', '', '', 1, 0, 100000, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 10:52:27', '2022-04-07 17:21:46'),
(23, 68, NULL, '', '', '', '', 1, 0, 100000, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:21:39', '2022-04-07 17:21:46'),
(24, 62, NULL, '', '', '', '', 1, 0, 100000, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:23:15', '2022-04-07 17:21:46'),
(25, 62, NULL, '', '', '', '', 1, 0, 100000, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:26:01', '2022-04-07 17:21:46'),
(26, 1, NULL, '', '', '', '', 1, 0, 120000, 'Returned', '2022-02-06', '2022-02-12', '2022-02-06 20:33:38', '2022-04-07 17:21:46'),
(27, 1, NULL, '', '', '', '', 1, 0, 120000, 'Cancelled', '2022-02-06', '2022-02-12', '2022-02-06 20:36:46', '2022-04-07 17:21:46'),
(28, 3, NULL, '', '', '', '', 1, 0, 120000, 'Booked', '2022-02-06', '2022-02-12', '2022-02-06 20:39:36', '2022-04-07 17:21:46'),
(29, 3, NULL, '', '', '', '', 1, 0, 120000, 'Booked', '2022-02-15', '2022-02-16', '2022-02-06 20:46:38', '2022-04-07 17:21:46'),
(30, 10, NULL, '', '', '', '', 1, 0, 120000, 'Booked', '2022-02-15', '2022-02-16', '2022-02-06 21:16:57', '2022-04-07 17:21:46'),
(40, 5, NULL, '', '', '', '', 1, 0, 120000, 'Booked', '0000-00-00', '0000-00-00', '2022-02-06 21:52:13', '2022-04-07 17:21:46'),
(41, 5, NULL, '', '', '', '', 1, 0, 120000, 'Booked', '0000-00-00', '0000-00-00', '2022-02-06 21:54:18', '2022-04-07 17:21:46'),
(43, 1, NULL, '', '', '', '', 1, 142500, 80000, 'Booked', '2022-02-14', '2022-02-19', '2022-02-06 21:59:15', '2022-04-07 17:21:46'),
(50, 4, NULL, '', '', '', '', 1, 1000000, 500000, 'Booked', '2022-02-27', '2022-03-01', '2022-02-07 02:43:30', '2022-04-07 17:21:46'),
(67, 6, NULL, '', '', '', '', 1, 0, 500000, 'Cancelled', '2022-03-04', '2022-03-08', '2022-02-14 06:38:42', '2022-04-07 17:21:46'),
(68, 6, NULL, '', '', '', '', 1, 0, 300000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-14 08:13:22', '2022-04-07 17:21:46'),
(69, 6, NULL, '', '', '', '', 1, 0, 300000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-14 08:16:44', '2022-04-07 17:21:46'),
(70, 66, NULL, '', '', '', '', 1, 0, 152000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:09', '2022-04-07 17:21:46'),
(71, 63, NULL, '', '', '', '', 1, 0, 250000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:43', '2022-04-07 17:21:46'),
(72, 63, NULL, '', '', '', '', 1, 0, 250000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:58', '2022-04-07 17:21:46'),
(73, 66, NULL, '', '', '', '', 1, 0, 160000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:37:32', '2022-04-07 17:21:46'),
(74, 65, NULL, '', '', '', '', 1, 0, 160000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:38:07', '2022-04-07 17:21:46'),
(75, 66, NULL, '', '', '', '', 1, 0, 160000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:38:48', '2022-04-07 17:21:46'),
(76, 66, NULL, '', '', '', '', 1, 0, 0, 'Booked', '2022-02-26', '2022-02-28', '2022-02-24 11:08:00', '2022-04-07 17:21:46'),
(77, 67, NULL, '', '', '', '', 1, 0, 250000, 'Booked', '2022-03-04', '2022-03-07', '2022-02-24 11:10:13', '2022-04-07 17:21:46'),
(101, 160, NULL, '', '', '', '', 1, 219900, 109950, 'Wait for payment', '2022-03-10', '2022-03-11', '2022-03-08 22:34:59', '2022-04-07 17:21:46'),
(102, 178, 101, '', '', '', '', 1, 1999900, 0, 'Returned', '2022-04-15', '2022-04-16', '2022-04-03 13:01:24', '2022-04-07 17:21:46'),
(103, 169, 101, '', '', '', '', 1, 249000, 124500, 'Cancelled', '2022-04-15', '2022-04-16', '2022-04-04 23:24:19', '2022-04-07 17:21:46'),
(104, 6, 101, '', '', '', '', 1, 250000, 125000, 'Wait for payment', '2022-04-15', '2022-04-16', '2022-04-10 00:09:12', '2022-04-10 00:09:12'),
(105, 6, 101, 'Dania', 'Jl. Mangga', '08997654321', 'me@mail.com', 1, 250000, 125000, 'Wait for payment', '2022-04-15', '2022-04-16', '2022-04-10 00:21:00', '2022-04-10 00:21:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
