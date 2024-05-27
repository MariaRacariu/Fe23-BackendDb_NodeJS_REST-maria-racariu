-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 27, 2024 at 07:55 AM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gritacademy`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`) VALUES
(1, 'Astronomy', 'Astronomy involved observation of the night skies with telescopes, as well as gaining an understanding of the various phenomena that go on in space, such as Lunar phases and Space weather.'),
(2, 'Charms', 'Charms comprised of a very wide range of different spells concerned with giving a target (be it an object or an individual) new and unexpected properties and/or making the target perform certain actions, among other possible effects.'),
(3, 'Defence Against the Dark Arts', 'Defence Against the Dark Arts, commonly shortened to D.A.D.A., was the class that taught students how to protect themselves against the Dark Arts, how to use offencive and protective spells, and how to properly handle and deal with dark creatures.'),
(4, 'Herbology', 'Herbology was the study of magical plants and fungi. Students learned how to properly care for and utilise different plants, as well as about their magical properties and what they were used for.'),
(5, 'History of Magic', 'History of Magic was the study of the history of the wizarding world. The lessons in this class were only lectures about significant names, dates and events in wizarding history.'),
(6, 'Potions', 'Potions was the exact art and subtle science of creating various liquid mixtures with different magical effects, many of which could not be achieved through spells.'),
(7, 'Transfiguration', 'Transfiguration was a very difficult theory-based subject that practised the art of changing the form or appearance of an object, as well as changing it back. It was also possible to change inanimate objects into living creatures and vice versa.');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `town` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstName`, `lastName`, `town`) VALUES
(1, 'Maria', 'Racariu', 'Malmö'),
(2, 'Robbie', 'Kemp', 'London'),
(3, 'Rasmus', 'Liiv', 'Malmö'),
(4, 'Owen', 'McLean', 'Birmingham'),
(5, 'Ash', 'Bending', 'Bristol'),
(6, 'Jade', 'Passmore', 'Bristol'),
(7, 'Harry', 'Potter', 'London'),
(8, 'Dobby', 'HouseElf', 'London'),
(9, 'Albus', 'Dumbledore', 'London'),
(10, 'Severus', 'Snape', 'London');

-- --------------------------------------------------------

--
-- Table structure for table `students_courses`
--

CREATE TABLE `students_courses` (
  `id` bigint(20) NOT NULL,
  `studentID` bigint(20) DEFAULT NULL,
  `courseID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students_courses`
--
ALTER TABLE `students_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `courseID` (`courseID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `students_courses`
--
ALTER TABLE `students_courses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students_courses`
--
ALTER TABLE `students_courses`
  ADD CONSTRAINT `students_courses_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `students_courses_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
