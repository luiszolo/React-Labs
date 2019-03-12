-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 12, 2019 at 06:41 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lims`
--

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE IF NOT EXISTS `attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(99) NOT NULL,
  `type` varchar(4) NOT NULL,
  `unit` varchar(99) NOT NULL,
  `structure` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operator_Id` int(11) NOT NULL,
  `sample_Id` int(11) NOT NULL,
  `test_Id` int(11) NOT NULL,
  `status_Id` int(11) NOT NULL,
  `onCreated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Log_test_id` (`test_Id`),
  KEY `fk_Log_operator_id` (`operator_Id`),
  KEY `fk_Log_sample_id` (`sample_Id`),
  KEY `fk_Log_status_id` (`status_Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `operator`
--

CREATE TABLE IF NOT EXISTS `operator` (
  `id` int(11) NOT NULL,
  `name` varchar(99) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator`
--

INSERT INTO `operator` (`id`, `name`, `type`, `status`) VALUES
(99999, 'Administrator', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE IF NOT EXISTS `sample` (
  `id` int(7) NOT NULL,
  `barcode` varchar(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`),
  UNIQUE KEY `barcode` (`barcode`),
  UNIQUE KEY `id_3` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `samplevalue`
--

CREATE TABLE IF NOT EXISTS `samplevalue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sample_Id` int(11) NOT NULL,
  `test_Id` int(11) NOT NULL,
  `attribute_Id` int(11) NOT NULL,
  `value` varchar(99) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_SampleValue_sample_id` (`sample_Id`),
  KEY `fk_SampleValue_test_id` (`test_Id`),
  KEY `fk_SampleValue_attribute_id` (`attribute_Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `statussequence`
--

CREATE TABLE IF NOT EXISTS `statussequence` (
  `status_Id` int(11) NOT NULL,
  `status_Required` int(11) DEFAULT NULL,
  KEY `fk_StatusSequence_status_id` (`status_Id`),
  KEY `fk_StatusSequence_status_required` (`status_Required`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(199) NOT NULL,
  `samplesLength` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `testattributes`
--

CREATE TABLE IF NOT EXISTS `testattributes` (
  `test_Id` int(11) NOT NULL,
  `attribute_Id` int(11) NOT NULL,
  KEY `fk_TestAttributes_test_id` (`test_Id`),
  KEY `fk_TestAttributes_attribute_id` (`attribute_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teststatus`
--

CREATE TABLE IF NOT EXISTS `teststatus` (
  `test_Id` int(11) NOT NULL,
  `prev_State` int(11) DEFAULT NULL,
  `post_State` int(11) NOT NULL,
  KEY `fk_TestStatus_test_id` (`test_Id`),
  KEY `fk_TestStatus_prev_state` (`prev_State`),
  KEY `fk_TestStatus_post_state` (`post_State`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `fk_Log_operator_id` FOREIGN KEY (`operator_Id`) REFERENCES `operator` (`id`),
  ADD CONSTRAINT `fk_Log_sample_id` FOREIGN KEY (`sample_Id`) REFERENCES `sample` (`id`),
  ADD CONSTRAINT `fk_Log_status_id` FOREIGN KEY (`status_Id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_Log_test_id` FOREIGN KEY (`test_Id`) REFERENCES `test` (`id`);

--
-- Constraints for table `samplevalue`
--
ALTER TABLE `samplevalue`
  ADD CONSTRAINT `fk_SampleValue_attribute_id` FOREIGN KEY (`attribute_Id`) REFERENCES `attribute` (`id`),
  ADD CONSTRAINT `fk_SampleValue_sample_id` FOREIGN KEY (`sample_Id`) REFERENCES `sample` (`id`),
  ADD CONSTRAINT `fk_SampleValue_test_id` FOREIGN KEY (`test_Id`) REFERENCES `test` (`id`);

--
-- Constraints for table `statussequence`
--
ALTER TABLE `statussequence`
  ADD CONSTRAINT `fk_StatusSequence_status_id` FOREIGN KEY (`status_Id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_StatusSequence_status_required` FOREIGN KEY (`status_Required`) REFERENCES `status` (`id`);

--
-- Constraints for table `testattributes`
--
ALTER TABLE `testattributes`
  ADD CONSTRAINT `fk_TestAttributes_attribute_id` FOREIGN KEY (`attribute_Id`) REFERENCES `attribute` (`id`),
  ADD CONSTRAINT `fk_TestAttributes_test_id` FOREIGN KEY (`test_Id`) REFERENCES `test` (`id`);

--
-- Constraints for table `teststatus`
--
ALTER TABLE `teststatus`
  ADD CONSTRAINT `fk_TestStatus_post_state` FOREIGN KEY (`post_State`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_TestStatus_prev_state` FOREIGN KEY (`prev_State`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_TestStatus_test_id` FOREIGN KEY (`test_Id`) REFERENCES `test` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
