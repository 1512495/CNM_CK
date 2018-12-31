-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 31, 2018 at 09:58 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `account_number` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `balance` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminder`
--

DROP TABLE IF EXISTS `reminder`;
CREATE TABLE IF NOT EXISTS `reminder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `account_number` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `reminder_name` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf16_unicode_ci NOT NULL,
  `password` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `refresh_token` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `access_token` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `name` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `email` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `phone` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_account` int(11) NOT NULL,
  `to_account` int(11) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `content` text COLLATE utf16_unicode_ci NOT NULL,
  `fee_from_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `password` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `refresh_token` varchar(512) COLLATE utf16_unicode_ci DEFAULT NULL,
  `access_token` varchar(512) COLLATE utf16_unicode_ci DEFAULT NULL,
  `email` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  `phone` varchar(512) COLLATE utf16_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `refresh_token`, `access_token`, `email`, `phone`) VALUES
(1, 'admin', 'admin', '9sb56xLDkuqHouQ3LfRH5DWWVSOiWcx3I5OZKJYZoqh885CbhJEUpFbUc8UPjXUxxmnXgF8m6rNI8gunHs73WicMWquMtjvZ0D4UTCE5FVUqH46WmsDWiQJFJ4WedZaE71ZFVun03TH2crknoNKxqT17Vg6YYfXm5bIZ3NqdlcJDBv2LopkysDxEXP6pvFMzMPnrvnRUmOeNhuQ6LhuEWXPkszng7xTn1l3oGCcm2iwUkGUanNlMkNlK1NaGCTj5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnBoYW4wODA1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNTQ2MjQ5MzUxLCJleHAiOjE1NDYyNTAzNTF9.f3Q4LFvin984Tia93cI8G1J5DX85c0WMn9kX99yO1A0', 'tanphan0805@gmail.com', '0338082216'),
(2, '1512495', '1512495', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjE1MTI0OTUiLCJpZCI6MiwiaWF0IjoxNTQ2MjQ5NDM3LCJleHAiOjE1NDYyNTA0Mzd9.ol0YD272vnnIdnUW8Gj9X5k59UwrpCtWtWuKjL7LJ_4', 'kimphuong.bww92@gmail.com', '1627787960'),
(3, 'client', 'client', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'kimphuong.bww92@gmail.com', '1627787960');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
