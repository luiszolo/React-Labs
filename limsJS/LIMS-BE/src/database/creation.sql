-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 25, 2019 at 07:01 PM
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

CREATE DATABASE IF NOT EXISTS `lims`;
USE `lims`;

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE IF NOT EXISTS `attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(99) NOT NULL,
  `unit` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`id`, `name`, `unit`) VALUES
(1, 'Chemistry', 'Q'),
(2, 'Temperature', 'C'),
(3, 'Time Elapse', 'Sec'),
(4, 'Velocity', 'RPM');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=123 ;

-- --------------------------------------------------------

--
-- Table structure for table `operator`
--

CREATE TABLE IF NOT EXISTS `operator` (
  `id` int(11) NOT NULL,
  `name` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operator`
--

INSERT INTO `operator` (`id`, `name`) VALUES
(0, '12345'),
(1, 'Josue '),
(619, 'Testing'),
(12345, 'Luis Villalobos');

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE IF NOT EXISTS `sample` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=82 ;


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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=89 ;



-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Sample Ready for Chemistry'),
(2, 'Sample Ready for Heat'),
(3, 'Sample Ready for Sppiner'),
(4, 'Sample Ready for Electricity'),
(5, 'Sample Passed Electricty'),
(6, 'Sample Ready for Electricity'),
(7, 'Sample Passed Electricty'),
(8, 'Sample Passed Heat'),
(9, 'Sample Passed Chemestry'),
(10, 'Sample Passed Spinner'),
(11, 'Sample Used');

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

--
-- Dumping data for table `statussequence`
--

INSERT INTO `statussequence` (`status_Id`, `status_Required`) VALUES
(5, NULL),
(8, 2),
(9, 1),
(10, 3);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`, `samplesLength`, `status`) VALUES
(1, 'ELECTRICITY TEST', 0, 1),
(8, 'HEAT TEST', 2, 1),
(9, 'CHEMISTRY TEST', 1, 1),
(10, 'SPINNER TEST', 1, 1),
(11, 'Generate Report', 0, 1);

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

--
-- Dumping data for table `testattributes`
--

INSERT INTO `testattributes` (`test_Id`, `attribute_Id`) VALUES
(9, 1),
(8, 2),
(8, 3),
(10, 4);

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
-- Dumping data for table `teststatus`
--

INSERT INTO `teststatus` (`test_Id`, `prev_State`, `post_State`) VALUES
(1, 5, 2),
(8, 8, 1),
(9, 9, 3),
(10, 10, 11);

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
