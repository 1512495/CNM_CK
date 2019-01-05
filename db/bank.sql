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
  `from_account` varchar(512) NOT NULL,
  `to_account` varchar(512) NOT NULL,
  `amount` bigint(20) NOT NULL,
  `content` text COLLATE utf16_unicode_ci NOT NULL,
  `fee_from_user` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) COLLATE utf16_unicode_ci NULL,
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

INSERT INTO `user` (`id`, `name`, `username`, `password`, `refresh_token`, `access_token`, `email`, `phone`) VALUES
(1, 'Phan Văn Tấn','user', 'user', '9sb56xLDkuqHouQ3LfRH5DWWVSOiWcx3I5OZKJYZoqh885CbhJEUpFbUc8UPjXUxxmnXgF8m6rNI8gunHs73WicMWquMtjvZ0D4UTCE5FVUqH46WmsDWiQJFJ4WedZaE71ZFVun03TH2crknoNKxqT17Vg6YYfXm5bIZ3NqdlcJDBv2LopkysDxEXP6pvFMzMPnrvnRUmOeNhuQ6LhuEWXPkszng7xTn1l3oGCcm2iwUkGUanNlMkNlK1NaGCTj5', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnBoYW4wODA1QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiaWF0IjoxNTQ2MjQ5MzUxLCJleHAiOjE1NDYyNTAzNTF9.f3Q4LFvin984Tia93cI8G1J5DX85c0WMn9kX99yO1A0', 'tanphan0805@gmail.com', '0338082216'),
(2, 'Dương Văn Huy', 'dvhuy', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjE1MTI0OTUiLCJpZCI6MiwiaWF0IjoxNTQ2MjQ5NDM3LCJleHAiOjE1NDYyNTA0Mzd9.ol0YD272vnnIdnUW8Gj9X5k59UwrpCtWtWuKjL7LJ_4', 'dvhuy@gmail.com', '1627087960'),
(3, 'Nguyễn Ngọc Diệu', 'nndieu', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nndieu@gmail.com', '1627787960'),
(4, 'Nguyễn Thành Tâm', 'nttam', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nttam@gmail.com', '0902791501'),
(5, 'Phạm Lê Thiện Tâm', 'plttam', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'phamlethientam@gmail.com', '0906123456'),
(6, 'Nguyễn Đại Tài', 'ndtai', '123456', 'sdfjhesbdukhaweudajsdMDBjGedwedjhjbukuylli983h23bjdaawjhbukwageu23ehj33g78wefjhbsbkdggzsudcgzef738hbsd87ddgsdhdcuye723ysshyd8we9kjwevvstssdggwetftGSUHSgsydytwt7623usus87esfjhbdjuygsyrus8r343y87sdfg7eefga7evyevftt7atwejhshdusudduaiduwwvedwee874uh23jjbsduysyud', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'sinlong1st@gmail.com', '0909123355'),
(7, 'Nguyễn Xuân Sơn', 'nxson', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nxson2509@gmail.com', '0903689112'),
(8, 'Trần Minh Tâm', 'tmtam', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'minhtam@gmail.com', '0905370123'),
(9, 'Trần Nhật Tâm', 'tntam', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nhattam@gmail.com', '0909999112'),
(10, 'Nguyễn Tấn Hữu Tâm', 'nthtam', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'huutam@gmail.com', '0904123456'),
(11, 'Phạm Thị Hồng Hạnh', 'pthhanh', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'pthhanh@gmail.com', '0905678901'),
(12, 'Phan Thị Thu Thảo', 'pttthao', '123456', 'riqNLb8MZ7j8FpljqewD6sodfjofw78e7r823eh2SDNFJSDNdqwSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjE1MTI0OTUiLCJpZCI6MiwiaWF0IjoxNTQ2MjQ5NDM3LCJleHAiOjE1NDYyNTA0Mzd9.ol0YD272vnnIdnUW8Gj9X5k59UwrpCtWtWuKjL7LJ_4', 'pttthao@gmail.com', '0904149533'),
(13, 'Đặng Thị Tuyết Nga', 'dttnga', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjE1MTI0OTUiLCJpZCI6MiwiaWF0IjoxNTQ2MjQ5NDM3LCJleHAiOjE1NDYyNTA0Mzd9.ol0YD272vnnIdnUW8Gj9X5k59UwrpCtWtWuKjL7LJ_4', 'dttnga@gmail.com', '1627757960'),
(14, 'Lê Thị Bích Lệ', 'ltble', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'ltble@gmail.com', '0902770291'),
(15, 'Đặng Thị Tuyết Nhung', 'dttnhung', '123456', 'jksdkjksndkeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ967dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'dttnhung@gmail.com', '0963149552'),
(16, 'Nguyễn Trần Gia Bảo', 'ntgbao', '123456', 'jksdkjksndkffBGySXKHvevoQI1aK4hx0p5PNqzJwkcldqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'ntgbao@gmail.com', '0913111555'),
(17, 'Nguyễn Ngọc Kim Liên', 'nnklien', '123456', 'jksdkjksndkffnsodfjofw78e7r8vjc3BGySXKHvevoQI1aK4hxB2PbrVq367dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nnklien@gmail.com', '0945148772'),
(18, 'Huỳnh Trần Quốc Thái', 'htqthai', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'htqthai@gmail.com', '0808176333'),
(19, 'Nguyễn Ngọc Linh Tiên', 'nnltien', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'nnltien@gmail.com', '0779123553'),
(20, 'Trần Hoàng Duy', 'thduy', '123456', 'jksdkjksndkffnsodfjofvjc3BGySXKHvevoQI1aK4hxB2PbrVq3jj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'thduy@gmail.com', '0971929153');
COMMIT;


INSERT INTO `staff` (`id`, `username`, `password`, `refresh_token`, `access_token`, `name`, `email`, `phone`) VALUES
(1, 'admin', 'admin', 'sdfjhesbdukhaweudajsdMDBjGedwedjhjbukuylli983h23bjdaawjhbukwageu23ehj33g78wefjhbsbkdggzsudcgzef738hbsd87ddgsdhdcuye723ysshyd8we9kjwevvstssdggwetftGSUHSgsydytwt7623usus87esfjhbdjuygsyrus8r343y87sdfg7eefga7evyevftt7atwejhshdusudduaiduwwvedwee874uh23jjbsduysyud', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Xuân Tân', 'nxtan@gmail.com', '0909123655'),
(2, 'nhttan', '123456', 'sdfjhesbdukhaweudajsdMDBjGedwedjhvjc3BGysodfjofw78e7r823eh2SDNFJSDNdqwq3geu23ehj33g78wefjhbsbkdggzsudcgzef738hbsd87ddgsdhdcuye723ysshyd8we9kjwevvstssdggwetftGSUHSgsydytwt7623usus87esfjhbdjuygsyrus8r343y87sdfg7eefga7evyevftt7atwejhwwvedwee874uh23jjbsduysyud', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Hoài Thanh Tân', 'thanhtan@gmail.com', '0909127755'),
(3, 'dhson', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Đoàn Hoài Sơn', 'dhson@gmail.com', '0909463655'),
(4, 'nvtam', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjesodfjofw78e7r823eh2SDNFJSDNdqwQI1aK4hxB2PbrVq39wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Ngô Văn Tâm', 'ngotam@gmail.com', '0909127735'),
(5, 'dtphat', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Đặng Thành Phát', 'dtphat@gmail.com', '0909129735'),
(6, 'vatai', '123456', 'jksdkjksndkffnsodfjofw78e7r823eh2SDNFJSDNdqwdi23uiujj387167dfhjehjaygqbhywGhBJKJKJJKVvsds72gjY873js9wh3yutwajhsdjksdsfjhvjvyuy21UHVATuyjhhjjhjhhdaiuwedgwewsdsdysđvsdsggvhhasu287jhjcbsidedyugsdsvdufuyeggf87weljdsbdz87cved87SDFSFiu83b18ssbKiuwyhjsuvbgggghygsusdfhsh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Vũ Anh Tài', 'vatai@gmail.com', '0909127235'),
(7, 'dvdat', '123456', 'riqNLb8Mvjc3BGySXKHvevoQI1aK4hxB2PbrVq3L79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Dương Văn Đạt', 'dvdat@gmail.com', '0909027735'),
(8, 'vakiet', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Võ Anh Kiệt', 'vakiet@gmail.com', '0943149552'),
(9, 'nthoai', '123456', 'riqNLb8MZ7j8FpljqewDvjc3BGySXKHvevoQI1aK4hxB2PbrVq3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Thanh Hoài', 'thanhhoai@gmail.com', '0948149552'),
(10, 'mtangoc', '123456', 'riqNLb8MZ7j8Fsodfjofw78e7r823eh2SDNFJSDNdqwVY3iGPHiZH3WXSYN1kOmaWMaaA6vCcIfY1qgacyaXpGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Mai Trương Ánh Ngọc', 'anhngoc@gmail.com', '0943143552'),
(11, 'lhngoc', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY3iGPHiZH3WXSYNd0hy89qGIZGL79VY3iGPHiZH3WXGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Lê Hồng Ngọc', 'lhngoc@gmail.com', '0943148552'),
(12, 'nnquynh', '123456', 'riqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGriqNLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL7iGPHiZH3WXGRyoMzTMumXJvog8kXpB3LrH6dwpH3XmlmkWA9b6tEGZO9UXFsCzFpLVFHthdmnRMRarDYBFi6CM2NugPI58MvrstNCkn7iV5xto3xgFmUn7wkkkIc7icxo0ZbAMQ8RLPlpQtuNlx3p5K8dJmCHcGAuRr5IQ5KQ7iGY5XYRKzZVyqD', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Như Quỳnh', 'nhuquynh@gmail.com', '0943159552'),
(13, 'nploc', '123456', '9Ivjc3BGySXKHLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VY9mKv4JqKLyVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Phúc Lộc', 'nploc@gmail.com', '0909423655'),
(14, 'ndgia', '123456', '9vjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0Lb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYd0hy89qGIZGL79VYg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Duy Gia', 'ndgia@gmail.com', '0909423655'),
(15, 'lhduy', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYddv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Lương Hoàng Duy', 'lhduy@gmail.com', '0409463655'),
(16, 'nnduy', '123456', '9vjc3BGySXKHeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9Kv4JqKLyVygxpdv3OzJKjMvMBdrGFLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYdBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHggffgggfgfgffgfgPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Ngô Nhật Duy', 'nhatduy@gmail.com', '0909363655'),
(17, 'tthien', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcl9mKv4JLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYdh7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Trần Trung Hiền', 'tthien@gmail.com', '0906463655'),
(18, 'nvthanh', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPP0p5PNqzJwkcvjc3BGySXKHvevoQI1aK4hxB2PbrVq3qPiph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Văn Thanh', 'nvthanh@gmail.com', '0909465655'),
(19, 'ndnam', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxBLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYdVygxpdv3OzJKjMvMBdrGFTtDPV3Niph7E0Qg5IvIfDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Nguyễn Duy Nam', 'ndnam@gmail.com', '0909363655'),
(20, 'pdhan', '123456', '9Ivjc3BGySXKHvevoQI1aK4hxBLb8MZ7j8FpljqewD6Xsn8Ad0hy89qGIZGL79VYdVeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9fDIRnIJBw2OdMG5GJkZZEZZpjpeBWNVWrhEjkAHFlIWG6ZCvZOffjDMqVYv5YOeiY9UwKYFkPqqE9aqa98ucaefBT6ZiyrEinWO8zImKxYHPHBGSzr8NsueYF502RUejrf7aImX2Y5tj7oXyNr1bXHPljQH7Jh', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpbXBodW9uZy5id3c5MkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsaWVudCIsImlkIjozLCJpYXQiOjE1NDYyNTAxOTgsImV4cCI6MTU0NjI1MTE5OH0.uCKBTEIdMEq_p7l3qca6zecHGluKv3fxgoF8nGCCkrc', 'Phạm Duy Hân', 'pdhan@gmail.com', '0909763655');
COMMIT;


INSERT INTO `account` (`id`, `user_id`, `account_number`, `balance`) VALUES
(1, 1, '1234567890', 100000000),
(2, 2, '1232323232', 5000000),
(3, 3, '8236378255', 6000000),
(4, 4, '8265241239', 90000000),
(5, 5, '4387780273', 3500000),
(6, 5, '1234350890', 25000000),
(7, 6, '1233337890', 9900000),
(8, 7, '2232323232', 23000000),
(9, 8, '1222267890', 150000),
(10, 9, '1872567865', 2600000),
(11, 9, '1234533378', 47000000),
(12, 10, '1226524178', 3300000),
(13, 11, '1226522222', 7800000),
(14, 12, '1223289178', 350000),
(15, 13, '2350414178', 3950000),
(16, 14, '1232894178', 360000),
(17, 15, '2328924178', 4660000),
(18, 16, '1783504178', 33200000),
(19, 17, '1226470078', 323000),
(20, 18, '1221784178', 36000000),
(21, 18, '1223956522', 2200000),
(22, 19, '3230726522', 7310000),
(23, 20, '1777726522', 700000),
(24, 1, '1234567891', 90000000);
COMMIT;


INSERT INTO `reminder` (`id`, `user_id`, `account_number`, `reminder_name`) VALUES
(1, 1, '2350414178', 'Đặng Thị Tuyết Nga'),
(2, 1, '1233337890', 'Nguyễn Đại Tài'),
(3, 1, '1234533378', 'Trần Nhật Tâm'),
(4, 1, '1226470078', 'Nguyễn Ngọc Kim Liên'),

(5, 2, '1221784178', 'Huỳnh Trần Quốc Thái'),
(6, 2, '1872567865', 'Trần Nhật Tâm'),
(7, 2, '1777726522', 'Trần Hoàng Duy'),

(8, 3, '1783504178', 'Nguyễn Trần Gia Bảo'),
(9, 3, '1234350890', 'Phạm Lê Thiện Tâm'),
(10, 3, '1222267890', 'Trần Minh Tâm'),
(11, 3, '1223289178', 'Phan Thị Thu Thảo'),
(12, 3, '1232894178', 'Lê Thị Bích Lệ'),

(13, 4, '1234350890', 'Phạm Lê Thiện Tâm'),
(14, 4, '1226470078', 'Nguyễn Ngọc Kim Liên'),

(15, 5, '8236378255', 'Nguyễn Ngọc Diệu'),
(16, 5, '8265241239', 'Nguyễn Thành Tâm'),
(17, 5, '1232323232', 'Dương Văn Huy'),


(18, 6, '1783504178', 'Nguyễn Trần Gia Bảo'),
(19, 6, '1222267890', 'Trần Minh Tâm'),
(20, 6, '1777726522', 'Trần Hoàng Duy'),

(21, 7, '1226522222', 'Phạm Thị Hồng Hạnh'),
(22, 7, '2232323232', 'Nguyễn Xuân Sơn'),
(23, 7, '1233337890', 'Nguyễn Đại Tài'),
(24, 7, '1234567890', 'Phan Văn Tấn'),

(25, 8, '1226470078', 'Nguyễn Ngọc Kim Liên'),
(26, 8, '1233337890', 'Nguyễn Đại Tài'),

(27, 9, '1223289178', 'Phan Thị Thu Thảo'),
(28, 9, '1777726522', 'Trần Hoàng Duy'),

(29, 10, '1232894178', 'Lê Thị Bích Lệ'),

(30, 11, '8265241239', 'Nguyễn Thành Tâm'),
(31, 12, '2350414178', 'Đặng Thị Tuyết Nga'),

(32, 13, '2232323232', 'Nguyễn Xuân Sơn'),
(33, 13, '1234533378', 'Trần Nhật Tâm'),
(34, 13, '3230726522', 'Nguyễn Ngọc Linh Tiên'),
(35, 13, '1232894178', 'Lê Thị Bích Lệ'),

(36, 14, '1226522222', 'Phạm Thị Hồng Hạnh'),
(37, 14, '3230726522', 'Nguyễn Ngọc Linh Tiên'),

(38, 15, '3230726522', 'Nguyễn Ngọc Linh Tiên'),

(39, 16, '1232323232', 'Dương Văn Huy'),
(40, 16, '1222267890', 'Trần Minh Tâm'),

(41, 17, '1234533378', 'Trần Nhật Tâm'),

(42, 18, '1234567890', 'Phan Văn Tấn'),
(43, 18, '8236378255', 'Nguyễn Ngọc Diệu'),
(44, 18, '1234350890', 'Phạm Lê Thiện Tâm'),
(45, 18, '1222267890', 'Trần Minh Tâm'),
(46, 18, '1234567890', 'Phan Văn Tấn'),

(47, 19, '2350414178', 'Đặng Thị Tuyết Nga'),
(48, 19, '1777726522', 'Trần Hoàng Duy'),
(49, 19, '1234567890', 'Phan Văn Tấn'),
(50, 19, '1222267890', 'Trần Minh Tâm'),

(51, 20, '8236378255', 'Nguyễn Ngọc Diệu'),
(52, 20, '2350414178', 'Đặng Thị Tuyết Nga');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
