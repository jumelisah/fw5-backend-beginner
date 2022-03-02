-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2022 at 01:30 PM
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
-- Table structure for table `confirm_code`
--

CREATE TABLE `confirm_code` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` int(6) NOT NULL,
  `expired_date` datetime NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT 1,
  `type` enum('Forgot password','Account confirmation','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `confirm_code`
--

INSERT INTO `confirm_code` (`id`, `user_id`, `code`, `expired_date`, `status`, `type`) VALUES
(12, 69, 568297, '2022-02-13 14:39:15', 1, 'Forgot password'),
(13, 69, 620181, '2022-02-13 15:15:01', 0, 'Forgot password'),
(14, 69, 148919, '2022-02-13 15:21:10', 0, 'Forgot password'),
(15, 69, 384050, '2022-02-13 15:29:44', 0, 'Forgot password'),
(16, 69, 676198, '2022-02-13 15:31:15', 0, 'Forgot password'),
(17, 69, 120231, '2022-02-13 15:32:00', 0, 'Forgot password'),
(18, 69, 323253, '2022-02-13 15:33:49', 0, 'Forgot password'),
(19, 69, 90175, '2022-02-13 15:37:59', 0, 'Forgot password'),
(20, 69, 371820, '2022-02-13 15:42:17', 0, 'Forgot password'),
(21, 69, 586958, '2022-02-13 15:44:50', 0, 'Forgot password'),
(22, 76, 758578, '2022-02-13 16:11:20', 1, 'Forgot password'),
(23, 76, 520220, '2022-02-13 16:13:57', 1, 'Forgot password'),
(24, 76, 945318, '2022-02-13 16:14:47', 1, 'Forgot password'),
(25, 76, 223893, '2022-02-13 16:16:41', 1, 'Forgot password'),
(26, 76, 519449, '2022-02-13 16:20:44', 1, 'Forgot password'),
(27, 76, 639119, '2022-02-13 16:22:34', 1, 'Forgot password'),
(28, 76, 913288, '2022-02-13 16:23:07', 1, 'Forgot password'),
(29, 76, 389934, '2022-02-13 16:44:12', 1, 'Forgot password'),
(30, 76, 665680, '2022-02-13 16:44:39', 1, 'Forgot password'),
(31, 76, 420535, '2022-02-13 16:45:53', 1, 'Forgot password'),
(32, 76, 803918, '2022-02-13 16:46:52', 0, 'Forgot password'),
(33, 76, 474023, '2022-02-14 10:06:40', 1, 'Forgot password'),
(34, 76, 130807, '2022-02-14 10:07:52', 1, 'Forgot password'),
(35, 76, 695852, '2022-02-14 10:09:49', 1, 'Forgot password'),
(36, 76, 458622, '2022-02-14 10:10:37', 1, 'Forgot password'),
(37, 76, 727127, '2022-02-14 10:11:36', 1, 'Forgot password'),
(38, 76, 819915, '2022-02-14 10:21:37', 1, 'Forgot password'),
(39, 76, 710573, '2022-02-14 10:24:51', 1, 'Forgot password'),
(40, 76, 112307, '2022-02-14 13:22:33', 0, 'Forgot password'),
(41, 78, 198546, '2022-02-14 15:48:52', 0, 'Forgot password'),
(42, 86, 767033, '2022-02-14 22:05:33', 1, 'Account confirmation'),
(43, 87, 676214, '2022-02-14 22:16:42', 1, 'Account confirmation'),
(44, 88, 599356, '2022-02-14 22:24:54', 1, 'Account confirmation'),
(45, 89, 588527, '2022-02-14 22:25:43', 1, 'Account confirmation'),
(46, 90, 801398, '2022-02-14 22:26:40', 1, 'Account confirmation'),
(47, 91, 342031, '2022-02-14 22:27:32', 1, 'Account confirmation'),
(48, 92, 721352, '2022-02-14 22:28:34', 1, 'Account confirmation'),
(49, 93, 298038, '2022-02-14 22:29:26', 1, 'Account confirmation'),
(50, 93, 618881, '2022-02-14 23:02:59', 1, 'Account confirmation'),
(51, 93, 542420, '2022-02-14 23:15:24', 0, 'Account confirmation'),
(52, 77, 312540, '2022-02-14 23:17:46', 1, 'Forgot password'),
(53, 77, 899691, '2022-02-14 23:20:44', 1, 'Forgot password'),
(54, 77, 242227, '2022-02-14 23:23:05', 1, 'Forgot password'),
(55, 93, 160466, '2022-02-14 23:23:46', 1, 'Forgot password'),
(56, 93, 539078, '2022-02-14 23:27:06', 1, 'Forgot password'),
(57, 93, 948452, '2022-02-14 23:29:12', 0, 'Forgot password'),
(58, 94, 267482, '2022-02-14 23:39:31', 1, 'Account confirmation'),
(59, 95, 949436, '2022-02-14 23:41:11', 0, 'Account confirmation'),
(60, 96, 837811, '2022-02-15 07:55:03', 1, 'Account confirmation'),
(61, 96, 294126, '2022-02-15 08:19:21', 0, 'Account confirmation'),
(62, 96, 945951, '2022-02-15 08:17:16', 1, 'Forgot password'),
(63, 96, 465329, '2022-02-15 08:21:02', 0, 'Forgot password');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `discount_date` date NOT NULL,
  `discount_amount` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `vehicle_id`, `discount_date`, `discount_amount`) VALUES
(1, 1, '2022-02-14', '5'),
(2, 2, '2022-02-14', '5'),
(3, 3, '2022-02-14', '10'),
(4, 4, '2022-02-14', '5');

-- --------------------------------------------------------

--
-- Table structure for table `email_confirmation`
--

CREATE TABLE `email_confirmation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `status` tinyint(11) NOT NULL DEFAULT 1,
  `expired_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_confirmation`
--

INSERT INTO `email_confirmation` (`id`, `user_id`, `code`, `status`, `expired_date`) VALUES
(1, 76, 901872, 0, '2022-02-14 06:44:29');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `costAfterDiscount` int(11) NOT NULL,
  `prepayment` int(11) NOT NULL,
  `remain_payment` int(11) NOT NULL,
  `status` enum('Booked','Rent','Returned','Cancelled') NOT NULL DEFAULT 'Booked',
  `rent_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `vehicle_id`, `user_id`, `costAfterDiscount`, `prepayment`, `remain_payment`, `status`, `rent_date`, `return_date`, `createdAt`) VALUES
(3, 3, 9, 0, 150000, 0, 'Rent', '2022-02-03', '2022-02-10', '2022-02-02 13:12:49'),
(13, 2, 7, 0, 0, 0, 'Returned', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(14, 44, 9, 0, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(15, 2, 6, 0, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(16, 10, 5, 0, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(17, 9, NULL, 0, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(18, 44, 6, 0, 0, 0, 'Booked', '2022-02-02', '2022-02-10', '2022-02-02 13:12:49'),
(19, 5, 1, 0, 100000, 0, 'Returned', '2022-02-05', '2022-02-07', '2022-02-03 08:46:27'),
(20, 5, 1, 0, 100000, 0, 'Cancelled', '2022-02-05', '2022-02-07', '2022-02-06 10:37:11'),
(21, 7, 5, 0, 100000, 0, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 10:51:34'),
(22, 7, 5, 0, 100000, 0, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 10:52:27'),
(23, 68, 39, 0, 100000, 0, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:21:39'),
(24, 62, 36, 0, 100000, 0, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:23:15'),
(25, 62, 36, 0, 100000, 0, 'Booked', '2022-02-05', '2022-02-07', '2022-02-06 13:26:01'),
(26, 1, 1, 0, 120000, 0, 'Returned', '2022-02-06', '2022-02-12', '2022-02-06 20:33:38'),
(27, 1, 1, 0, 120000, 0, 'Cancelled', '2022-02-06', '2022-02-12', '2022-02-06 20:36:46'),
(28, 3, 4, 0, 120000, 0, 'Booked', '2022-02-06', '2022-02-12', '2022-02-06 20:39:36'),
(29, 3, 5, 0, 120000, 0, 'Booked', '2022-02-15', '2022-02-16', '2022-02-06 20:46:38'),
(30, 10, 9, 0, 120000, 0, 'Booked', '2022-02-15', '2022-02-16', '2022-02-06 21:16:57'),
(40, 5, 9, 0, 120000, 0, 'Booked', '0000-00-00', '0000-00-00', '2022-02-06 21:52:13'),
(41, 5, 9, 0, 120000, 0, 'Booked', '0000-00-00', '0000-00-00', '2022-02-06 21:54:18'),
(43, 1, 35, 142500, 80000, 62500, 'Booked', '2022-02-14', '2022-02-19', '2022-02-06 21:59:15'),
(50, 4, 40, 1000000, 500000, 0, 'Booked', '2022-02-27', '2022-03-01', '2022-02-07 02:43:30'),
(67, 6, 1, 0, 500000, 0, 'Cancelled', '2022-03-04', '2022-03-08', '2022-02-14 06:38:42'),
(68, 6, 3, 0, 300000, 200000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-14 08:13:22'),
(69, 6, 3, 0, 300000, 200000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-14 08:16:44'),
(70, 66, 34, 0, 152000, 152000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:09'),
(71, 63, 35, 0, 250000, 250000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:43'),
(72, 63, 31, 0, 250000, 250000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:33:58'),
(73, 66, 70, 0, 160000, 144000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:37:32'),
(74, 65, 76, 0, 160000, 138000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:38:07'),
(75, 66, 44, 0, 160000, 144000, 'Booked', '2022-03-03', '2022-03-05', '2022-02-24 10:38:48'),
(76, 66, 75, 0, 0, 0, 'Booked', '2022-02-26', '2022-02-28', '2022-02-24 11:08:00'),
(77, 67, 75, 0, 250000, 215000, 'Booked', '2022-03-04', '2022-03-07', '2022-02-24 11:10:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `image` text DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `phone_number` varchar(13) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `is_confirmed` tinyint(4) NOT NULL DEFAULT 0,
  `register_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `image`, `username`, `email`, `password`, `role`, `phone_number`, `gender`, `birthdate`, `address`, `is_confirmed`, `register_at`, `updatedAt`) VALUES
(1, 'Anindiya', '', 'anindiyaa', 'anindiyaa@gmail.com', '$2b$10$AF099wWfc4Bwqvglh577W.0fsAcpfBxQVzEO.isPUwwoap/PETyu.', 'admin', '0897619312911', 'Female', '1996-08-31', 'Jl. Mangga No. 19', 1, '2022-01-28 10:42:27', '2022-02-13 00:22:01'),
(3, 'Nathan', 'http://localhost:8000/uploads\\image-1644502630802-23309389.jpg', 'anindiya', 'nathan@email.com', 'nathan123', '', '08976193129', 'Male', '1997-04-06', 'PERUM CARATLAND Jl. Diamond No. 17', 1, '2022-01-28 10:42:27', '2022-02-10 21:17:10'),
(4, 'Dreamy', '', '', 'dreamy@email.com', '128907', '', '08123456789', 'Female', '2000-09-21', 'Jl. Mangga No. 19', 1, '2022-01-28 10:48:57', '2022-02-03 22:21:57'),
(5, 'Daniel Kang', '', '', 'danielkang@gmail.com', 'daniel123456', '', '082289123456', 'Male', '1996-05-11', 'Jl. Pemuda Gg. Berkah No. 21', 1, '2022-01-28 10:51:58', '2022-02-03 22:22:05'),
(6, 'Joshua', '', '', 'joshua@gmail.com', '123456', '', '082213459011', 'Male', '2001-11-21', NULL, 1, '2022-01-28 10:52:58', '2022-02-03 22:22:16'),
(7, 'Ayu Suryani', '', '', 'suryaniayu@gmail.com', 'ayu123', '', '089910576892', 'Female', '1999-08-31', NULL, 1, '2022-01-28 10:53:51', '2022-02-03 22:22:25'),
(9, 'Diana', '', '', 'diana@gmail.com', 'qwertyui', '', '0819678234511', 'Female', '2001-07-10', 'Jl. Veteran No. 11', 1, '2022-01-28 14:16:48', '2022-02-03 22:22:35'),
(31, 'Jeffrey', '', '', 'jeffrey@gmail.com', 'qwertyui', '', '08196782321', 'Male', '2001-07-10', 'Jl. Veteran No. 11', 1, '2022-01-30 14:29:36', '2022-02-03 22:22:50'),
(32, 'Jennie', '', '', 'ayy@gmail.com', 'qwertyui', '', '089912678901', 'Female', '2001-07-10', 'Jl. Veteran No. 11', 1, '2022-01-30 14:33:50', '2022-02-03 22:22:58'),
(34, 'Jennie Kim', '', '', 'jkim@gmail.com', '128907', '', '08976193129', 'Female', '2000-09-21', 'Jl. Mangga No. 19', 1, '2022-02-02 07:54:27', '2022-02-10 14:23:25'),
(35, 'Jennie Annastasya', '', '', 'jean@gmail.com', '123456', '', '082190872345', 'Female', '1999-04-21', 'Jl. Semangka No. 19', 1, '2022-02-02 08:23:02', '2022-02-03 22:23:16'),
(36, 'Hani', '', '', 'jkim@gmail.com', '123456', '', '081234567890', 'Female', '1999-04-21', 'Jl. Semangka No. 19', 1, '2022-02-03 22:33:34', '2022-02-10 17:19:39'),
(39, 'Sean O', '', '', 'ocean@gmail.com', '123456', '', '082177928366', 'Male', '1995-08-08', 'Jl. Semangka No. 19', 1, '2022-02-04 07:31:52', '2022-02-04 13:34:02'),
(40, 'Oh Sean', '', '', 'ohsean@gmail.com', '123456', '', '089766193129', 'Male', '1994-04-12', 'Jl. Sudirman No. 124', 1, '2022-02-04 07:38:38', NULL),
(43, 'Oh Sehun', '', '', 'ohsehun@gmail.com', '123456', '', '089761931299', 'Male', '1994-04-12', 'Jl. Sudirman No. 124', 1, '2022-02-07 11:26:56', NULL),
(44, 'Oh Sehun', '', '', 'ohsehun@email.com', '123456', '', '0897619312990', 'Male', '1994-04-12', 'Jl. Sudirman No. 124', 1, '2022-02-07 11:28:02', NULL),
(45, 'pro', 'http://localhost:8000/uploads\\image-1644400335780-69789593.jpg', '', 'asddf', '', '', NULL, NULL, NULL, NULL, 1, '2022-02-09 16:52:15', NULL),
(46, 'pro', 'http://localhost:8000/uploads\\image-1644400513097-282315024.jpg', '', 'asddf', '', '', NULL, NULL, NULL, NULL, 1, '2022-02-09 16:55:13', NULL),
(47, 'pro', 'http://localhost:8000/uploads\\default-avatar.jpg', '', 'asddf', '', '', NULL, NULL, NULL, NULL, 1, '2022-02-09 16:55:29', NULL),
(48, 'pro', 'http://localhost:8000/uploads\\default-avatar.jpg', '', 'nathan@email.com', '', '', NULL, NULL, NULL, NULL, 1, '2022-02-09 16:58:12', NULL),
(49, 'pro', 'http://localhost:8000/uploads\\default-avatar.jpg', '', 'than@email.com', '', '', NULL, NULL, NULL, NULL, 1, '2022-02-09 16:59:40', NULL),
(50, 'Jennie Kim', 'http://localhost:8000/uploads\\default-avatar.jpg', 'jenniekim', 'kimjennie@gmail.com', '123456', '', '089761931292', 'Female', '1992-11-27', 'Jl. Nanas No. 23', 1, '2022-02-10 20:48:02', NULL),
(64, 'Admin 1', 'http://localhost:8000/uploads/6031831-1644727529616-302516132.jpg', 'admin1', 'admin@vehicle.com', '$2b$10$8F/asPM9.2UfuI1hOr4.C.4uP7/VN21auM83/dc9JkMsySPJtDp5m', 'admin', '081208120812', 'Female', '1991-01-31', 'jl. semangka', 1, '2022-02-11 08:42:20', '2022-02-13 11:45:29'),
(69, 'user200', '', 'user200', 'user200@vehicle.com', '$2b$10$K/EAkYr6nvG4fwxUAjwjT.AAgPF/xh/zlmS7kM.e1llvKALIYilAq', 'user', '08134567890', 'Female', '1991-01-31', 'jl. semangka', 1, '2022-02-12 11:12:02', '2022-02-14 12:04:26'),
(70, 'nam saya', NULL, 'user123', '123123123@email.co.id', '$2b$10$lehcDJNGlK0E5SdxZR6FIen769n6ZDgF/s9gxWO9wfSrKeeFhFNPe', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-12 20:03:45', NULL),
(71, 'nam saya', NULL, 'ann', 'emailsaya@email.com', '$2b$10$p7IeEwlhlnXpBmRmXbbU8eJ2yyQ6jSvf8GWRrjvalN.0opQ6uQaB6', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-12 20:06:24', NULL),
(72, 'saya', NULL, 'abcdfg', 'admin2@vehicle.com', '$2b$10$WoiRdDdvUc9ZaVQlljGU7uyShD9AjDqf91gp7OlGzinbrJbftq/C.', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-12 20:19:15', NULL),
(73, 'saya', NULL, 'qwerty', 'admin22@vehicle.com', '$2b$10$O8TgMGfvP4AQC8c9/J7b0e0qxV5fAW.9QGNt4yMifbLnqzDD2MfX2', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-12 20:21:21', NULL),
(74, 'saya', NULL, 'qwertyu', 'admin222@vehicle.com', '$2b$10$S.ly7yRPif5IwPtbCQsCPeJVIHpAaCp9UluoNTsUO8cK7JZyG53em', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-12 20:21:43', NULL),
(75, 'Dea Aprilia', NULL, 'deaaprilia', 'deaaprilia@mail.com', '$2b$10$9smidA8z5544svkcliNtWOGvFA4nU4wLs1E9i5cDdZONN2C8MWGGG', 'user', '088812345678', NULL, '1992-11-03', NULL, 1, '2022-02-13 00:32:37', '2022-02-13 10:10:57'),
(76, 'Jumelisa', 'http://localhost:8000/uploads/foto-cover-potret-mingyu-sevent-20210301075232-1644799787164-904544829.jpg', 'jumelisa', 'jumelisa09@gmail.com', '$2b$10$05a9xGpFDFKbd82AYKfkme6tuF17vWbujxklLIYg7iytTOQTgfzV.', 'role', '082294004486', NULL, NULL, NULL, 0, '2022-02-13 16:09:01', '2022-02-14 13:21:30'),
(77, 'Saras', NULL, 'saras', 'saras@mail.com', '$2b$10$HMmV4iLOgMxo9GiSmZxqmecYKTbiU61BcpWoP.ap8H6mlYK33SF6W', 'user', NULL, NULL, NULL, NULL, 0, '2022-02-14 13:08:28', '2022-02-14 23:19:39'),
(93, 'Annika', NULL, 'annikaa', 'cidegi3276@bepureme.com', '$2b$10$UM2WdFNjLcE3E53hPUlj3.XSDgU1QrrCgqEG6k1ecjcJsO5/6VNEG', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-14 22:19:26', '2022-02-14 23:27:39'),
(94, 'melisa', NULL, 'melisa', 'melisajoo39@gmail.com', '$2b$10$T8TBamse3JgsXy2mY6v5JeF3c7difokOTsmUkpB4.gpSlgqVPEX1a', 'user', NULL, NULL, NULL, NULL, 0, '2022-02-14 23:29:31', NULL),
(95, 'melisa', 'uploads/3166415-middle-1644856606001-763516685.png', 'melisaa', 'melissajoo39@gmail.com', '$2b$10$XO3iZs4ctIyzqrTRtAxuiOu1Y9DJnGff.TcPxgmq98kIlKCPvrq9e', 'user', '081122334455', NULL, '1997-09-29', NULL, 1, '2022-02-14 23:31:11', '2022-02-14 23:36:46'),
(96, 'melisa', NULL, '_melisaa', 'melisabisri@gmail.com', '$2b$10$spdfGBvuwxqBXu/ZF4ndWuStJNDdI.AhIkzdwvZMOcB5r4PVL9Kaa', 'user', NULL, NULL, NULL, NULL, 1, '2022-02-15 07:45:03', '2022-02-15 08:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `year` varchar(4) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `qty` tinyint(4) DEFAULT NULL,
  `type` enum('Manual','Matic','','') DEFAULT NULL,
  `seat` int(2) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `image`, `year`, `cost`, `qty`, `type`, `seat`, `category_id`, `location`, `created_at`, `updated_at`) VALUES
(1, 'YAMAHA MIO Z', 'http://localhost:8000/uploads/image-1644726464510-462037742.jpg', '2020', 130000, 3, 'Matic', 2, 2, 'South Jakarta', '2022-01-26 00:00:00', '2022-02-13 11:30:03'),
(2, 'YAMAHA MIO', 'http://localhost:8000/uploads/olx_61b346fa49fc1f264f3adbbe_0-1645958824806-621208935.jpg', '2019', 130000, 0, 'Matic', 2, 2, 'South Jakarta', '2022-01-26 00:00:00', '2022-02-27 17:47:04'),
(3, 'HONDA SCOOPY', 'http://localhost:8000/uploads/5fddd59c871cc-1645675454235-632049943.jpg', '2021', 120000, 3, 'Matic', 2, 2, 'South Jakarta', '2022-01-26 00:00:00', '2022-02-24 11:04:14'),
(4, 'JEEP WRANGLER', 'http://localhost:8000/uploads/965015_720-1645633012065-800346311.jpg', '2017', 500000, 0, 'Manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-23 23:16:52'),
(5, 'SUZUKI NEX II', 'http://localhost:8000/uploads/harga-suzuki-nex-2-1645633761231-351927724.jpg', '2020', 120000, 0, 'Matic', 2, 2, 'Semarang', '2022-01-26 00:00:00', '2022-02-23 23:29:21'),
(6, 'TOYOTA AGYA', 'http://localhost:8000/uploads/635w-635-423-avlNw9uRpG7j9FC0mjpx0pcaLzK15k60Y4ZSH1qq-1645634530357-192938607.jpg', '2019', 250000, 3, 'Manual', 5, 1, 'West Jakarta', '2022-01-26 00:00:00', '2022-02-23 23:42:10'),
(7, 'TOYOTA YARIS', 'http://localhost:8000/uploads/800px-2016_Toyota_Yaris_1-1645674879287-984887167.jpg', '2020', 250000, 0, 'Manual', 5, 1, 'Palembang', '2022-01-26 00:00:00', '2022-02-24 10:54:39'),
(8, 'KAWASAKI KLX', 'http://localhost:8000/uploads/klxdtracker-1645752713014-289869002.jpg', '2020', 200000, 2, 'Manual', 2, 2, 'Tangerang', '2022-01-26 00:00:00', '2022-02-25 08:31:53'),
(9, 'YAMAHA NMAX', 'http://localhost:8000/uploads/info-motor-harga-motor-yamaha-x-max-bekas-1645675228169-79906073.jpg', '2021', 220000, 0, 'Matic', 2, 2, 'Surabaya', '2022-01-26 00:00:00', '2022-02-24 11:00:28'),
(10, 'TOYOTA AGYA', 'http://localhost:8000/uploads/toyota-agya-_130909200430-209-1645674979487-699835218.jpg', '2012', 250000, 0, 'Manual', 5, 1, 'Yogyakarta', '2022-01-26 00:00:00', '2022-02-24 10:56:19'),
(11, 'TOYOTA AGYA', 'http://localhost:8000/uploads/toyota-agya-1645752772723-938053096.jpeg', '2018', 250000, 0, 'Manual', 5, 1, 'Semarang', '2022-01-26 00:00:00', '2022-02-25 08:32:52'),
(36, 'TOYOTA AGYA', 'http://localhost:8000/uploads/5e72eda6af20f-new-toyota-agya_665_374-1645752827623-913396397.jpg', '2016', 220000, 1, 'Matic', 5, 1, 'East Jakarta', '2022-01-27 20:42:17', '2022-02-25 08:33:47'),
(38, 'TOYOTA AGYA', 'http://localhost:8000/uploads/5ecf1d864a962-1645753319644-135510148.jpg', '2016', 250000, 2, 'Manual', 5, 1, 'Yogyakarta', '2022-01-31 00:23:59', '2022-02-25 08:41:59'),
(44, 'HONDA BRIO', 'http://localhost:8000/uploads/2020_Honda_Brio_Satya_E_1-1645675031132-387635609.jpg', '2019', 190000, 2, 'Matic', 5, 1, 'Bandung', '2022-01-31 10:11:51', '2022-02-24 10:57:11'),
(45, 'HONDA BRIO', 'http://localhost:8000/uploads/DSCF0733-scaled-e1583729289488-1645752996801-444746424.jpg', '2019', 200000, 2, 'Manual', 5, 1, 'Bandung', '2022-01-31 10:12:19', '2022-02-25 08:36:36'),
(48, 'HONDA VARIO', 'http://localhost:8000/uploads/whatsapp-image-2022-02-02-at-15916-pm-5-9e8ac65369fee765e8bba46cdd1f123c_600x400-1645753049480-653119594.jpeg', '2019', 200000, 0, 'Matic', 2, 2, 'Bandung', '2022-01-31 13:53:10', '2022-02-25 08:37:29'),
(49, 'HONDA BRIO', 'http://localhost:8000/uploads/hondajakarta07uibMCint7m172002g354b069-1645753501194-447790506.jpg', '2021', 200000, 1, 'Manual', 5, 1, 'Bandung', '2022-01-31 13:57:24', '2022-02-25 08:45:01'),
(62, 'YAMAHA NMAX', 'http://localhost:8000/uploads/018182800_1622174813-Yamaha_NMax_125-1645675080361-268213103.jpg', '2019', 200000, 0, 'Matic', 2, 2, 'Bandung', '2022-02-02 08:41:00', '2022-02-27 11:24:30'),
(63, 'TOYOTA YARIS', 'http://localhost:8000/uploads/Aki-Toyota-Yaris-1645675136621-913223482.jpg', '2019', 250000, 2, 'Manual', 5, 1, 'Tangerang', '2022-02-02 08:42:32', '2022-02-24 10:58:56'),
(64, 'TOYOTA YARIS', 'http://localhost:8000/uploads/samping-toyota-yaris-trd-sportivo-cvt-2020-d224-1645753562359-423492937.png', '2018', 200000, 2, 'Manual', 5, 1, 'Tangerang', '2022-02-02 09:34:44', '2022-02-25 08:46:02'),
(65, 'POLYGON URBANO I3', 'http://localhost:8000/uploads/polygon-urbano-i3-1-1645675338426-62352655.jpg', '2019', 149000, 1, 'Manual', 1, 3, 'Bandung', '2022-02-02 13:16:07', '2022-02-24 11:02:18'),
(66, 'SUZUKI ADDRESS PLAYFULL', 'http://localhost:8000/uploads/Kelebihan-Kekurangan-Suzuki-Address-1645674779995-1926290.jpg', '2021', 152000, 2, 'Matic', 2, 2, 'Yogyakarta', '2022-02-02 13:18:00', '2022-02-24 10:53:00'),
(67, 'VESPA 946', 'http://localhost:8000/uploads/modifikasi-vespa-946-redjpg-20211008040138-1645675890037-484887991.jpg', '2019', 155000, 4, 'Matic', 2, 2, 'South Jakarta', '2022-02-02 13:20:34', '2022-02-24 11:11:30'),
(68, 'BROMPTON M6L', 'http://localhost:8000/uploads/BWC-BIKE-2018-2-1645675390463-605377609.jpg', '2020', 189000, 2, 'Manual', 3, 3, 'South Jakarta', '2022-02-02 13:22:31', '2022-02-25 09:23:09'),
(70, 'YAMAHA GEAR 125', 'http://localhost:8000/uploads/yamaha-gear-125-caltexjpeg-20211212034548-1645753605635-934950703.jpeg', '2021', 155000, 2, 'Matic', 2, 2, 'Tangerang', '2022-02-02 13:24:22', '2022-02-25 08:46:45'),
(71, 'YAMAHA FAZZIO NEO', 'http://localhost:8000/uploads/yamaha-fazziojpg-20220117102640-1645753672892-676226995.jpg', '2021', 163000, 1, 'Matic', 2, 2, 'Semarang', '2022-02-02 13:25:31', '2022-02-25 08:47:52'),
(72, 'SUZUKI GIXXER SF', 'http://localhost:8000/uploads/suzuki_gixxer_sf_250_main-1645754993492-882109599.jpg', '2020', 179000, 2, 'Manual', 2, 2, 'East Jakarta', '2022-02-02 13:27:02', '2022-02-25 09:09:53'),
(73, 'YAMAHA GEAR', 'http://localhost:8000/uploads/5fe044e8ce2a3-1645755213838-984972523.jpg', '2021', 157000, 2, 'Matic', 2, 2, 'Palembang', '2022-02-02 13:27:52', '2022-02-25 09:13:33'),
(74, 'BMW X5', 'http://localhost:8000/uploads/canggihnya-bmw-x5-apa-saja-kelebihannya-U9PZrygtsW-1645755177944-499654078.jpg', '2020', 499000, 1, 'Manual', 5, 1, 'West Jakarta', '2022-02-02 13:30:21', '2022-02-25 09:12:57'),
(88, 'HONDA BRIO', 'http://localhost:8000/uploads/9a996fdea005465491c254a4f2c4591f-1645755331415-120126008.jpg', '2019', 200000, 2, 'Manual', 5, 1, 'Tangerang', '2022-02-03 19:26:13', '2022-02-27 09:27:40'),
(89, 'DAIHATSU TERIOS', 'http://localhost:8000/uploads/6144a8e9ef615-1645755375107-851873976.jpg', '2019', 220000, 1, 'Manual', 5, 1, 'North Jakarta', '2022-02-03 21:39:26', '2022-02-25 09:16:15'),
(90, 'POLYGON URBANO I3', 'http://localhost:8000/uploads/polygon-urbano-i3-1-1645675309399-875697388.jpg', '2019', 189000, 1, 'Manual', 1, 3, 'South Jakarta', '2022-02-03 21:43:46', '2022-02-24 11:01:49'),
(91, 'MERCEDES BENZ GLC', 'http://localhost:8000/uploads/2022-mercedes-amg-glc-63-s-1645755428845-254591051.jpg', '2021', 369900, 1, 'Manual', 5, 1, 'South Jakarta', '2022-02-03 21:50:11', '2022-02-25 09:17:08'),
(92, 'MERCEDES BENZ GLC', 'http://localhost:8000/uploads/2022-mercedes-amg-glc-63-s-1645755532579-347734899.jpg', '2020', 365000, 1, 'Manual', 5, 1, 'South Jakarta', '2022-02-03 22:04:52', '2022-02-25 09:18:52'),
(93, 'MERCEDES BENZ GLC', 'http://localhost:8000/uploads/1_mercedes_glc-1645755560435-342011846.jpg', '2020', 369000, 1, 'Manual', 5, 1, 'South Jakarta', '2022-02-04 08:45:56', '2022-02-25 09:19:20'),
(123, 'YAMAHA FAZZIO', 'http://localhost:8000/uploads/whatsapp-image-2021-12-26-at-182839-3cf0edab2a64b79a7cfa374e0f48580f-1645958647951-528149948.jpeg', '2019', 100000, 2, 'Matic', 2, 2, 'Bandung', '2022-02-08 23:04:14', '2022-02-27 17:44:07'),
(132, 'YAMAHA FAZZIO', 'http://localhost:8000/uploads/61e7a869b6c32-yamaha-fazzio-seri-neo_1265_711-1645958571678-923076914.jpeg', '2019', 100000, 2, 'Matic', 2, 2, 'Jakarta', '2022-02-09 10:00:11', '2022-02-27 17:42:51'),
(142, 'HONDA SCOOPY', 'http://localhost:8000/uploads/c995dec87c6e11fd78bb0d8cd8bb438e-20220108041532-1645958466919-541859808.jpg', '2019', 100000, 2, 'Matic', 2, 2, 'Jakarta', '2022-02-09 13:07:09', '2022-02-27 17:41:06'),
(152, 'HONDA VARIO', 'http://localhost:8000/uploads/begini-perbedaan-all-new-honda-vario-160-dan-vario-150-aXaWLIcg23-1645958329967-22393337.jpg', '2019', 100000, 2, 'Matic', 2, 2, 'Jakarta', '2022-02-09 13:28:13', '2022-02-27 17:38:49'),
(155, 'YAMAHA MIO Z', 'http://localhost:8000/uploads/yamaha-mio-z_rangga-1jpg-20210702101813-1645958259653-44228538.jpg', '2018', 130000, 3, 'Matic', 2, 2, 'South Jakarta', '2022-02-12 16:23:20', '2022-02-27 17:37:39'),
(157, 'UNITED BIKE BLACK HORSE', 'http://localhost:8000/uploads/maxresdefault-1645958221283-888120079.jpg', '2019', 100000, 3, 'Manual', 1, 3, 'South Jakarta', '2022-02-12 17:51:58', '2022-02-27 17:37:01'),
(158, 'HONDA BEAT', 'http://localhost:8000/uploads/All-new-Honda-Beat2-Eko-Putra-560x390-1645958166961-209601628.jpg', '2018', 100000, 3, 'Matic', 2, 2, 'South Jakarta', '2022-02-12 17:53:30', '2022-02-27 17:36:06'),
(159, 'HONDA BEAT', 'http://localhost:8000/uploads/beat-fijpg-20211201124639-1645958155856-898423667.jpg', '2018', 100000, 1, 'Matic', 2, 2, 'Tangerang', '2022-02-12 17:58:02', '2022-02-27 17:35:55'),
(160, 'TOYOTA YARIS', 'http://localhost:8000/uploads/18195-toyota-yaris-gr-4-versi-jalanan-1645958067183-210511624.jpg', '2019', 219900, 2, 'Matic', 5, 1, 'Bandung', '2022-02-13 10:42:33', '2022-02-27 17:34:27'),
(161, 'TOYOTA YARIS', 'http://localhost:8000/uploads/toyota-hadirkan-2-edisi-terbaru-dari-toyota-yaris-ini-harga-dan-spesifikasinya69_700-1645958038711-152122881.jpg', '2019', 219900, 2, 'Matic', 5, 1, 'Semarang', '2022-02-13 10:43:03', '2022-02-27 17:33:58'),
(163, 'KIJANG INNOVA', 'http://localhost:8000/uploads/72482-new-toyota-kijang-innova-1-1645958000166-426472352.jpg', '2019', 212000, 2, 'Matic', 5, 1, 'Semarang', '2022-02-13 10:49:28', '2022-02-27 17:33:20'),
(164, 'KIJANG INNOVA', 'http://localhost:8000/uploads/toyota kijang innova g-1645838974378-809935209.jpg', '2019', 212000, 2, 'Matic', 5, 1, 'Surabaya', '2022-02-13 10:59:21', '2022-02-26 08:29:34'),
(165, 'KIJANG INNOVA', 'http://localhost:8000/uploads/kijang-innova-reborn-1645957945093-451708954.jpg', '2019', 220000, 2, 'Matic', 5, 1, 'Bandung', '2022-02-13 11:01:54', '2022-02-27 17:32:25'),
(167, 'KIJANG INNOVA', 'http://localhost:8000/uploads/2021_Toyota_Kijang_Innova_2-1645957934084-486165347.jpg', '2019', 219000, 2, 'Matic', 5, 1, 'Yogyakarta', '2022-02-13 11:04:55', '2022-02-27 17:32:14'),
(168, 'TOYOTA CAMRY', 'http://localhost:8000/uploads/077547500_1546926732-camry-1645957861758-343525565.jpg', '2021', 249000, 2, 'Matic', 5, 1, 'Yogyakarta', '2022-02-13 11:06:40', '2022-02-27 17:31:01'),
(169, 'TOYOTA CAMRY', 'http://localhost:8000/uploads/New-Toyota-Camry-1645957786326-146587942.jpg', '2021', 249000, 2, 'Matic', 5, 1, 'Medan', '2022-02-13 11:08:58', '2022-02-27 17:29:46'),
(170, 'TOYOTA CAMRY', 'http://localhost:8000/uploads/2018_Toyota_Camry_(ASV70R)_Ascent_sedan_(2018-08-27)_01-1645957796883-718344087.jpg', '2021', 249000, 2, 'Matic', 5, 1, 'Denpasar', '2022-02-13 11:09:24', '2022-02-27 17:29:56'),
(171, 'TOYOTA CAMRY', 'http://localhost:8000/uploads/3ef86d3811ea4f0d961502ddcb87cc93-1645957809065-681026725.jpg', '2021', 249000, 2, 'Matic', 5, 1, 'Palembang', '2022-02-13 11:10:28', '2022-02-27 17:30:09'),
(172, 'TOYOTA CAMRY', 'http://localhost:8000/uploads/image-1644725461049-787711046.png', '2021', 249000, 2, 'Matic', 5, 1, 'South Tangerang', '2022-02-13 11:11:01', NULL),
(173, 'TOYOTA YARIS', 'http://localhost:8000/uploads/2020_Toyota_Yaris_Design_HEV_CVT_1-1645957692790-402529435.jpg', '2021', 249000, 2, 'Matic', 5, 1, 'South Tangerang', '2022-02-14 12:16:03', '2022-02-27 17:28:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirm_code`
--
ALTER TABLE `confirm_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_confirmation`
--
ALTER TABLE `email_confirmation`
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
-- AUTO_INCREMENT for table `confirm_code`
--
ALTER TABLE `confirm_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `email_confirmation`
--
ALTER TABLE `email_confirmation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

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
