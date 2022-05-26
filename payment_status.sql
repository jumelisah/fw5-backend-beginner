-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2022 at 02:32 PM
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
-- Table structure for table `payment_status`
--

CREATE TABLE `payment_status` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `gross_amount` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `response_midtrans` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment_status`
--

INSERT INTO `payment_status` (`id`, `order_id`, `gross_amount`, `name`, `response_midtrans`, `created_at`, `updated_at`) VALUES
(3, 2147483647, 145000, 'undefined', '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"0055f60f-253e-4d05-8d6b-e60ad1cab02e\",\"order_id\":\"1653558906887\",\"gross_amount\":\"145000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 17:04:38\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"490004862461284\",\"merchant_id\":\"G744549051\"}', '2022-05-26 17:04:40', '2022-05-26 17:04:40'),
(4, 2147483647, 145000, 'undefined', '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"6d99b107-3816-45a9-a2b8-5694dde33135\",\"order_id\":\"1653558906880\",\"gross_amount\":\"145000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 17:08:21\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"490005134730200\",\"merchant_id\":\"G744549051\"}', '2022-05-26 17:08:22', '2022-05-26 17:08:22'),
(5, 2147483647, 145000, 'Sarah', '{\"status_code\":\"201\",\"status_message\":\"Success, PERMATA VA transaction is successful\",\"transaction_id\":\"ed852cd4-a7ea-4700-9f65-680e31f3d65c\",\"order_id\":\"1653558906994\",\"gross_amount\":\"145000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 17:16:02\",\"transaction_status\":\"pending\",\"fraud_status\":\"accept\",\"permata_va_number\":\"490004290726741\",\"merchant_id\":\"G744549051\"}', '2022-05-26 17:16:03', '2022-05-26 17:16:03'),
(6, 2147483647, 145000, 'Sarah', '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"d0fc4fea-1901-4825-ba9d-a320257322cc\",\"order_id\":\"1653558906965\",\"merchant_id\":\"G744549051\",\"gross_amount\":\"145000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 17:16:26\",\"transaction_status\":\"pending\",\"va_numbers\":[{\"bank\":\"bca\",\"va_number\":\"49051265249\"}],\"fraud_status\":\"accept\"}', '2022-05-26 17:16:26', '2022-05-26 17:16:26'),
(7, 100, 20000, 'Sarah', '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"83fa8daf-6677-4a22-a50f-e45c89d23aed\",\"order_id\":\"100\",\"merchant_id\":\"G744549051\",\"gross_amount\":\"20000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 17:21:34\",\"transaction_status\":\"pending\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9884905139606219\"}],\"fraud_status\":\"accept\"}', '2022-05-26 17:21:34', '2022-05-26 17:21:34'),
(8, 125, 20000, 'Sarah Mardiana', '{\"status_code\":\"201\",\"status_message\":\"Success, Bank Transfer transaction is created\",\"transaction_id\":\"eda6e34a-f398-4a0d-b861-7a2a9980d44e\",\"order_id\":\"125\",\"merchant_id\":\"G744549051\",\"gross_amount\":\"20000.00\",\"currency\":\"IDR\",\"payment_type\":\"bank_transfer\",\"transaction_time\":\"2022-05-26 18:55:22\",\"transaction_status\":\"pending\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9884905184019356\"}],\"fraud_status\":\"accept\"}', '2022-05-26 18:55:22', '2022-05-26 18:55:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payment_status`
--
ALTER TABLE `payment_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment_status`
--
ALTER TABLE `payment_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
