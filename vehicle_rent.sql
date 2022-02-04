-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2022 at 04:05 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'cars'),
(2, 'motorbike'),
(3, 'bike'),
(5, 'mobil');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `prepayment` int(11) NOT NULL,
  `rent_date` datetime DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `vehicle_id`, `user_id`, `prepayment`, `rent_date`, `return_date`, `createdAt`) VALUES
(1, 2, 1, 0, '2022-02-01 15:38:35', NULL, '2022-02-02 13:12:49'),
(2, 4, 5, 0, '2022-02-01 15:56:22', NULL, '2022-02-02 13:12:49'),
(3, 3, 5, 150000, '2022-02-03 00:00:00', '2022-02-10', '2022-02-02 13:12:49'),
(11, 5, 1, 0, '2022-02-02 01:54:54', NULL, '2022-02-02 13:12:49'),
(12, 2, 32, 0, '2022-02-02 01:56:22', NULL, '2022-02-02 13:12:49'),
(13, 2, 7, 0, '2022-02-02 01:56:41', NULL, '2022-02-02 13:12:49'),
(14, 44, 9, 0, '2022-02-02 01:57:56', NULL, '2022-02-02 13:12:49'),
(15, 2, 6, 0, '2022-02-02 01:58:45', NULL, '2022-02-02 13:12:49'),
(16, 10, 5, 0, '2022-02-02 01:58:55', NULL, '2022-02-02 13:12:49'),
(17, 9, 2, 0, '2022-02-02 02:00:09', NULL, '2022-02-02 13:12:49'),
(18, 44, 6, 0, '2022-02-02 02:01:05', NULL, '2022-02-02 13:12:49'),
(19, 5, 1, 100000, '2022-02-05 00:00:00', '2022-02-07', '2022-02-03 08:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phone_number` varchar(13) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `register_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `gender`, `birthdate`, `address`, `register_at`, `updatedAt`) VALUES
(1, 'Anindiya', 'anindiya@email.com', '128907', '081234567890', 'Female', '2000-09-21', 'Jl. Mangga No. 19', '2022-01-28 10:42:27', '2022-02-04 07:54:16'),
(2, 'Chandra', 'mel@gmail.com', '123456', '081934567890', 'Male', '1995-09-20', 'Jl. Cempaka No. 39', '2022-01-28 10:42:27', '2022-02-03 22:21:31'),
(3, 'Nathan', 'nathan@email.com', 'nathan123', '08976193129', 'Male', '1997-04-06', 'PERUM CARATLAND Jl. Diamond No. 17', '2022-01-28 10:42:27', '2022-02-03 22:21:43'),
(4, 'Dreamy', 'dreamy@email.com', '128907', '08123456789', 'Female', '2000-09-21', 'Jl. Mangga No. 19', '2022-01-28 10:48:57', '2022-02-03 22:21:57'),
(5, 'Daniel Kang', 'danielkang@gmail.com', 'daniel123456', '082289123456', 'Male', '1996-05-11', 'Jl. Pemuda Gg. Berkah No. 21', '2022-01-28 10:51:58', '2022-02-03 22:22:05'),
(6, 'Joshua', 'joshua@gmail.com', '123456', '082213459011', 'Male', '2001-11-21', NULL, '2022-01-28 10:52:58', '2022-02-03 22:22:16'),
(7, 'Ayu Suryani', 'suryaniayu@gmail.com', 'ayu123', '089910576892', 'Female', '1999-08-31', NULL, '2022-01-28 10:53:51', '2022-02-03 22:22:25'),
(9, 'Diana', 'diana@gmail.com', 'qwertyui', '0819678234511', 'Female', '2001-07-10', 'Jl. Veteran No. 11', '2022-01-28 14:16:48', '2022-02-03 22:22:35'),
(31, 'Jeffrey', 'jeffrey@gmail.com', 'qwertyui', '08196782321', 'Male', '2001-07-10', 'Jl. Veteran No. 11', '2022-01-30 14:29:36', '2022-02-03 22:22:50'),
(32, 'Jennie', 'ayy@gmail.com', 'qwertyui', '089912678901', 'Female', '2001-07-10', 'Jl. Veteran No. 11', '2022-01-30 14:33:50', '2022-02-03 22:22:58'),
(34, 'Jennie Kim', 'jkim@gmail.com', '123456', '081901561234', 'Female', '2002-06-20', 'Jl. Merdeka No. 27', '2022-02-02 07:54:27', '2022-02-03 22:23:07'),
(35, 'Jennie Annastasya', 'jean@gmail.com', '123456', '082190872345', 'Female', '1999-04-21', 'Jl. Semangka No. 19', '2022-02-02 08:23:02', '2022-02-03 22:23:16'),
(36, 'Jihan', 'jihan@gmail.com', '123456', '082234567890', 'Female', '1999-04-21', 'Jl. Semangka No. 19', '2022-02-03 22:33:34', NULL),
(37, 'Jihan', 'jihan@gmail.com', '123456', '082234567890', 'Female', '1999-04-21', 'Jl. Semangka No. 19', '2022-02-04 07:13:50', NULL),
(38, 'Jihan', 'jihan@gmail.com', '123456', '082234567890', 'Female', '1999-04-21', 'Jl. Semangka No. 19', '2022-02-04 07:15:45', NULL),
(39, 'Sean O', 'ocean@gmail.com', '123456', '082177928366', 'Female', '0000-00-00', 'Jl. Semangka No. 19', '2022-02-04 07:31:52', NULL),
(40, 'Oh Sean', 'ohsean@gmail.com', '123456', '089766193129', 'Male', '1994-04-12', 'Jl. Sudirman No. 124', '2022-02-04 07:38:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `available` tinyint(4) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `seat` int(2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `year`, `cost`, `available`, `type`, `seat`, `category_id`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'YAMAHA MIO Z', '2018', 150000, 1, 'matic', 2, 2, 'South Jakarta', '2022-01-26 00:00:00', '2022-02-02 13:04:36'),
(2, 'YAMAHA VEGA FORCE', '2016', 80000, 3, 'manual', 2, 2, 'Bandung', '2022-01-26 00:00:00', '2022-02-03 21:51:34'),
(3, 'HONDA SCOOPY', '2021', 120000, 1, 'matic', 2, 2, 'South Jakarta', '2022-01-26 00:00:00', '2022-02-02 13:04:54'),
(4, 'JEEP WRANGLER', '2017', 500000, 1, 'manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-02 13:05:04'),
(5, 'SUZUKI NEX II', '2020', 120000, 3, 'matic', 2, 2, 'Semarang', '2022-01-26 00:00:00', '2022-02-02 13:05:34'),
(6, 'TOYOTA AGYA', '2019', 250000, 2, 'manual', 5, 1, 'West Jakarta', '2022-01-26 00:00:00', '2022-02-02 13:05:13'),
(7, 'TOYOTA YARIS', '2020', 250000, 1, 'manual', 5, 1, 'Palembang', '2022-01-26 00:00:00', '2022-02-02 13:05:23'),
(8, 'KAWASAKI KLX', '2020', 200000, 1, 'manual', 2, 2, 'Tangerang', '2022-01-26 00:00:00', '2022-02-02 13:05:45'),
(9, 'YAMAHA NMAX', '2021', 220000, 0, 'matic', 2, 2, 'Surabaya', '2022-01-26 00:00:00', '2022-02-02 13:05:55'),
(10, 'TOYOTA AGYA', '2012', 250000, 1, 'manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-02 13:06:04'),
(11, 'TOYOTA AGYA', '2018', 250000, 0, 'manual', 5, 1, 'Semarang', '2022-01-26 00:00:00', '2022-02-02 13:06:14'),
(36, 'TOYOTA AGYA', '2016', 220000, 1, 'matic', 5, 1, 'East Jakarta', '2022-01-27 20:42:17', '2022-02-02 13:06:23'),
(38, 'TOYOTA AGYA', '2016', 250000, 2, 'manual', 5, 1, 'Yogyakarta', '2022-01-31 00:23:59', '2022-02-02 13:06:33'),
(40, 'TOYOTA AGYA', '2016', 250000, 3, 'matic', 5, 1, 'Yogyakarta', '2022-01-31 00:48:05', '2022-02-02 13:06:43'),
(44, 'HONDA BRIO', '2019', 190000, 2, 'matic', 5, 1, 'Bandung', '2022-01-31 10:11:51', '2022-02-03 19:24:15'),
(45, 'HONDA BRIO', '2019', 200000, 2, 'manual', 5, 1, 'Bandung', '2022-01-31 10:12:19', '2022-02-02 13:07:02'),
(48, 'HONDA VARIO', '2019', 200000, 0, 'matic', 2, 2, 'Bandung', '2022-01-31 13:53:10', '2022-02-02 13:07:15'),
(49, 'HONDA BRIO', '2021', 200000, 1, 'manual', 5, 1, 'Bandung', '2022-01-31 13:57:24', '2022-02-02 13:07:27'),
(62, 'YAMAHA NMAX', '2019', 200000, 2, 'manual', 2, 2, 'Bandung', '2022-02-02 08:41:00', '2022-02-02 13:07:35'),
(63, 'TOYOTA YARIS', '2019', 250000, 2, 'manual', 5, 1, 'Tangerang', '2022-02-02 08:42:32', '2022-02-02 13:07:48'),
(64, 'TOYOTA YARIS', '2018', 200000, 2, 'manual', 5, 1, 'Tangerang', '2022-02-02 09:34:44', '2022-02-02 13:07:56'),
(65, 'POLYGON URBANO I3', '2019', 149000, 1, 'manual', 1, 3, 'Bandung', '2022-02-02 13:16:07', '2022-02-03 21:51:21'),
(66, 'SUZUKI ADDRESS PLAYFULL', '2021', 152000, 2, 'matic', 2, 2, 'Yogyakarta', '2022-02-02 13:18:00', '2022-02-02 07:17:18'),
(67, 'VESPA 946', '2019', 155000, 1, 'matic', 2, 2, 'South Jakarta', '2022-02-02 13:20:34', '2022-02-02 07:18:04'),
(68, 'BROMPTON M6L', '2020', 189000, 1, 'manual', 1, 3, 'South Jakarta', '2022-02-02 13:22:31', '2022-02-02 07:21:49'),
(69, 'UNITED BIKE BLACK HORSE', '2019', 100000, 2, 'manual', 1, 3, 'Semarang', '2022-02-02 13:23:27', '2022-02-02 07:22:33'),
(70, 'YAMAHA GEAR 125', '2021', 155000, 2, 'matic', 2, 2, 'Tangerang', '2022-02-02 13:24:22', '2022-02-02 07:23:31'),
(71, 'YAMAHA FAZZIO NEO', '2021', 163000, 1, 'matic', 2, 2, 'Semarang', '2022-02-02 13:25:31', '2022-02-02 07:24:28'),
(72, 'SUZUKI GIXXER SF', '2020', 179000, 2, 'manual', 2, 2, 'East Jakarta', '2022-02-02 13:27:02', '2022-02-02 07:26:03'),
(73, 'YAMAHA GEAR', '2021', 157000, 2, 'matic', 2, 2, 'Palembang', '2022-02-02 13:27:52', '2022-02-02 07:27:05'),
(74, 'BMW X5', '2020', 499000, 1, 'manual', 5, 1, 'West Jakarta', '2022-02-02 13:30:21', '2022-02-02 07:29:41'),
(75, 'HONDA BRIO', '2019', 190000, 2, 'matic', 5, 1, 'Bandung', '2022-02-02 13:32:09', '2022-02-03 19:25:20'),
(85, 'HONDA BRIO', '2019', 190000, 2, '5', 0, 1, 'Tangerang', '2022-02-03 19:02:08', '2022-02-03 19:30:23'),
(87, 'axtrds', '2019', 200000, 2, 'manual', 5, 2, 'Tangerang', '2022-02-03 19:14:51', NULL),
(88, 'HONDA BRIO', '2019', 200000, 2, 'manual', 5, 2, 'Tangerang', '2022-02-03 19:26:13', NULL),
(89, 'DAIHATSU TERIOS', '2019', 220000, 1, 'manual', 5, 1, 'North Jakarta', '2022-02-03 21:39:26', NULL),
(90, 'POLYGON URBANO I3', '2019', 189000, 1, 'manual', 1, 3, 'South Jakarta', '2022-02-03 21:43:46', '2022-02-03 21:54:43'),
(91, 'MERCEDES BENZ GLC', '2021', 369900, 1, 'manual', 5, 1, 'South Jakarta', '2022-02-03 21:50:11', NULL),
(92, 'MERCEDES BENZ GLC', '2020', 365000, 1, 'manual', 5, 1, 'South Jakarta', '2022-02-03 22:04:52', NULL),
(93, 'MERCEDES BENZ GLC', '2020', 369000, 1, 'manual', 5, 1, 'South Jakarta', '2022-02-04 08:45:56', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
