-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2020 at 01:23 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

CREATE DATABASE IF NOT EXISTS LIMS;
USE LIMS;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lims`
--

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `id` int(11) NOT NULL,
  `name` varchar(99) NOT NULL,
  `unit` varchar(6) DEFAULT NULL,
  `placeholder` varchar(30) NOT NULL,
  `regex` varchar(199) NOT NULL,
  `actived` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`id`, `name`, `unit`, `placeholder`, `regex`, `actived`) VALUES
(1, 'Heat', 'C', '##', '^[0-9]{2}$', 1),
(2, 'Size', 'K', 'Kelvin', '', 1),
(3, 'Voltage', 'V', '##', '^[0-9]{2}$', 1);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `operator_Id` int(11) NOT NULL,
  `sample_Id` int(11) NOT NULL,
  `test_Id` int(11) NOT NULL,
  `status_Id` int(11) NOT NULL,
  `onCreated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `operator_Id`, `sample_Id`, `test_Id`, `status_Id`, `onCreated`) VALUES
(1, 123, 4, 3, 7, '2020-02-27 11:02:50'),
(2, 123, 4, 3, 5, '2020-02-27 11:02:50'),
(3, 123, 4, 3, 7, '2020-02-27 11:02:50'),
(4, 123, 5, 4, 7, '2020-02-27 11:05:48'),
(5, 123, 5, 4, 8, '2020-02-27 11:05:48'),
(6, 123, 5, 4, 2, '2020-02-27 11:05:48'),
(7, 123, 6, 4, 7, '2020-02-27 11:09:23'),
(8, 123, 6, 4, 8, '2020-02-27 11:09:23'),
(9, 123, 6, 4, 2, '2020-02-27 11:09:23'),
(10, 123, 7, 4, 7, '2020-02-27 11:09:23'),
(11, 123, 7, 4, 8, '2020-02-27 11:09:23'),
(12, 123, 7, 4, 2, '2020-02-27 11:09:23'),
(13, 123, 6, 2, 3, '2020-02-27 11:10:39'),
(14, 123, 6, 2, 6, '2020-02-27 11:10:39'),
(15, 123, 6, 5, 9, '2020-02-27 11:11:29'),
(16, 123, 6, 5, 7, '2020-02-27 11:11:29'),
(17, 123, 8, 4, 7, '2020-02-27 13:30:03'),
(18, 123, 8, 4, 8, '2020-02-27 13:30:03'),
(19, 123, 8, 4, 2, '2020-02-27 13:30:03'),
(20, 123, 9, 4, 7, '2020-02-27 13:30:03'),
(21, 123, 9, 4, 8, '2020-02-27 13:30:03'),
(22, 123, 9, 4, 2, '2020-02-27 13:30:03'),
(23, 123, 10, 4, 7, '2020-02-27 13:32:56'),
(24, 123, 10, 4, 8, '2020-02-27 13:32:56'),
(25, 123, 10, 4, 1, '2020-02-27 13:32:56'),
(26, 123, 10, 7, 11, '2020-02-27 13:33:19'),
(27, 123, 10, 7, 2, '2020-02-27 13:33:19'),
(28, 123, 17, 4, 7, '2020-02-27 14:36:03'),
(29, 123, 17, 4, 8, '2020-02-27 14:36:03'),
(30, 123, 17, 4, 1, '2020-02-27 14:36:03'),
(31, 123, 18, 4, 7, '2020-02-27 15:07:56'),
(32, 123, 18, 4, 8, '2020-02-27 15:07:56'),
(33, 123, 18, 4, 1, '2020-02-27 15:07:56'),
(34, 123, 18, 7, 11, '2020-02-27 15:23:53'),
(35, 123, 18, 7, 2, '2020-02-27 15:23:53');

-- --------------------------------------------------------

--
-- Table structure for table `operator`
--

CREATE TABLE `operator` (
  `id` int(5) NOT NULL,
  `name` varchar(199) NOT NULL,
  `type` tinyint(1) DEFAULT 0,
  `actived` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operator`
--

INSERT INTO `operator` (`id`, `name`, `type`, `actived`) VALUES
(0, '123', 0, 1),
(123, '123', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(7) NOT NULL,
  `barcode` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`id`, `barcode`) VALUES
(6, 'SA-12-00001'),
(7, 'SA-12-00002'),
(8, 'SA-12-00003'),
(9, 'SA-12-00004'),
(10, 'SA-12-00005'),
(11, 'SA-12-00000'),
(12, 'SA-12-00000'),
(13, 'SA-12-00000'),
(14, 'SA-12-00000'),
(15, 'SA-12-00000'),
(16, 'SA-12-00000'),
(17, 'SA-12-12345'),
(18, 'SA-12-00010');

-- --------------------------------------------------------

--
-- Table structure for table `samplevalue`
--

CREATE TABLE `samplevalue` (
  `sample_Id` int(11) NOT NULL,
  `test_Id` int(11) NOT NULL,
  `attribute_Id` int(11) NOT NULL,
  `value` varchar(199) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `samplevalue`
--

INSERT INTO `samplevalue` (`sample_Id`, `test_Id`, `attribute_Id`, `value`) VALUES
(6, 2, 2, '786'),
(6, 5, 2, 'dfdsfdsf'),
(18, 7, 3, '12');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(199) NOT NULL,
  `actived` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `name`, `actived`) VALUES
(1, 'ELECTRIC SAMPLE', 1),
(2, 'HOMOGENIZE READY', 1),
(3, 'SAMPLE PASSED HOMOGENIZE SAMPLE', 1),
(4, 'SAMPLE PASSED ADSASDAS', 1),
(5, 'SAMPLE PASSED ELECTRIC TEST', 1),
(6, 'SAMPLE READY', 1),
(7, 'NEW SAMPLE', 1),
(8, 'SAMPLE PASSED NEW SAMPLES', 1),
(9, 'SAMPLE PASSED COMPLETION', 1),
(10, 'SAMPLE PASSED PONCHOS TEST', 1),
(11, 'SAMPLE PASSED ELECTRIC SAMPLE', 1);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(199) NOT NULL,
  `samplesLength` int(11) NOT NULL,
  `require_State` int(11) DEFAULT NULL,
  `initial_State` int(11) NOT NULL,
  `actived` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`, `samplesLength`, `require_State`, `initial_State`, `actived`) VALUES
(4, 'NEW SAMPLES', 5, 7, 8, 1),
(7, 'ELECTRIC SAMPLE', 5, 1, 11, 1),
(8, 'HOMOGENIZE SAMPLE', 3, 2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `testattributes`
--

CREATE TABLE `testattributes` (
  `test_Id` int(11) NOT NULL,
  `attribute_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testattributes`
--

INSERT INTO `testattributes` (`test_Id`, `attribute_Id`) VALUES
(5, 2),
(2, 2),
(1, 1),
(6, 1),
(6, 2),
(7, 3),
(8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `teststatus`
--

CREATE TABLE `teststatus` (
  `test_Id` int(11) NOT NULL,
  `result_State` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teststatus`
--

INSERT INTO `teststatus` (`test_Id`, `result_State`) VALUES
(3, 7),
(5, 7),
(2, 6),
(1, 2),
(6, 1),
(6, 2),
(4, 1),
(7, 2),
(8, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operator`
--
ALTER TABLE `operator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
