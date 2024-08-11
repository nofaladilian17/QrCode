-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2024 at 08:44 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scanqr`
--

-- --------------------------------------------------------

--
-- Table structure for table `qr_codes`
--

CREATE TABLE `qr_codes` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `qr_code_url` varchar(255) NOT NULL,
  `scanned_by` varchar(255) NOT NULL,
  `scanned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qr_codes`
--

INSERT INTO `qr_codes` (`id`, `link`, `qr_code_url`, `scanned_by`, `scanned_at`) VALUES
(1, 'https://puskes-majasari.my.id/ehealltcare/', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fpuskes-majasari.my.id%2Fehealltcare%2F', 'Simulated Device', '2024-08-11 16:48:13'),
(5, 'https://puskes-majasari.my.id/ehealltcare/', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fpuskes-majasari.my.id%2Fehealltcare%2F', 'Desktop', '2024-08-11 17:07:41'),
(15, 'https://www.ovagames.com/', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwww.ovagames.com%2F', 'Desktop', '2024-08-11 17:34:09'),
(16, 'https://puskes-majasari.my.id/ehealltcare/', 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fpuskes-majasari.my.id%2Fehealltcare%2F', 'Desktop', '2024-08-11 17:34:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qr_codes`
--
ALTER TABLE `qr_codes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qr_codes`
--
ALTER TABLE `qr_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
