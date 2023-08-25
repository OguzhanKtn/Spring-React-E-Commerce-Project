-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 25 Ağu 2023, 18:01:45
-- Sunucu sürümü: 10.4.27-MariaDB
-- PHP Sürümü: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `java_se_final`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `category`
--

CREATE TABLE `category` (
  `cid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `category`
--

INSERT INTO `category` (`cid`, `name`) VALUES
(1, 'Automobile'),
(2, 'Mobile Phone'),
(3, 'Computer');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `order`
--

CREATE TABLE `order` (
  `oid` bigint(20) NOT NULL,
  `uid` bigint(20) DEFAULT NULL,
  `pid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `order`
--

INSERT INTO `order` (`oid`, `uid`, `pid`) VALUES
(121, 2, 1),
(122, 2, 5),
(124, 2, 2),
(125, 2, 17),
(126, 2, 17),
(127, 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product`
--

CREATE TABLE `product` (
  `pid` bigint(20) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `cid` int(11) DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `product`
--

INSERT INTO `product` (`pid`, `brand`, `cid`, `price`, `stock`, `title`) VALUES
(1, 'Mercedes', 1, 100000, 500, 'Car'),
(2, 'BMW', 1, 500000, 100, 'Car'),
(3, 'Wolksvagen', 1, 150000, 300, 'Car'),
(4, 'Iphone', 2, 40000, 1000, 'Phone'),
(5, 'Xiaomi', 2, 10000, 500, 'Phone'),
(6, 'Samsung', 2, 25000, 800, 'Phone'),
(7, 'Asus', 3, 15000, 1500, 'Laptop'),
(8, 'Dell', 3, 22000, 1000, 'Laptop'),
(9, 'Lenovo', 3, 20000, 600, 'Laptop'),
(10, 'Skoda', NULL, 80000, 500, 'Car'),
(14, 'Vivo', 2, 500, 850, 'Phone'),
(15, 'Mazda', 1, 200000, 850, 'Car'),
(16, 'Casper', 3, 1000, 900, 'Laptop'),
(17, 'Monster', 3, 1000, 900, 'Laptop'),
(18, 'HP', 3, 1000, 900, 'Laptop'),
(19, 'Toshiba', 3, 1000, 850, 'Laptop'),
(20, 'Toshiba', 3, 1000, 850, 'Laptop'),
(21, 'Toyota', 1, 10000, 2000, 'Car'),
(22, 'Hyundai', 1, 10000, 2000, 'Car'),
(23, 'Renault', 1, 10000, 2000, 'Car'),
(24, 'Kia', 1, 10000, 2000, 'Car'),
(25, 'Nissan', 1, 10000, 2000, 'Car');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `role`
--

CREATE TABLE `role` (
  `rid` bigint(20) NOT NULL,
  `role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `role`
--

INSERT INTO `role` (`rid`, `role`) VALUES
(1, 'ROLE_admin'),
(2, 'ROLE_user');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `uid` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `user`
--

INSERT INTO `user` (`uid`, `email`, `name`, `password`, `surname`) VALUES
(1, 'nuran@mail.com', 'nuran', '$2a$10$0CWSnL8p9amOUGCuvazsbOD/GuTPov1kQ4NCw3kTlRQz7GqGe/e4K', 'kotan'),
(2, 'oguzhan@mail.com', 'Oguzhan', '$2a$10$0CWSnL8p9amOUGCuvazsbOD/GuTPov1kQ4NCw3kTlRQz7GqGe/e4K', 'kotan');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_roles`
--

CREATE TABLE `user_roles` (
  `user_uid` bigint(20) NOT NULL,
  `roles_rid` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `user_roles`
--

INSERT INTO `user_roles` (`user_uid`, `roles_rid`) VALUES
(1, 1),
(2, 2);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`);

--
-- Tablo için indeksler `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`oid`);

--
-- Tablo için indeksler `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Tablo için indeksler `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`rid`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Tablo için indeksler `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `FKp6taepjm8nbj4doesmj3uj5jy` (`roles_rid`),
  ADD KEY `FKsk35kye23trjmxl5owaoly5y8` (`user_uid`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `category`
--
ALTER TABLE `category`
  MODIFY `cid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Tablo için AUTO_INCREMENT değeri `order`
--
ALTER TABLE `order`
  MODIFY `oid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- Tablo için AUTO_INCREMENT değeri `product`
--
ALTER TABLE `product`
  MODIFY `pid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Tablo için AUTO_INCREMENT değeri `role`
--
ALTER TABLE `role`
  MODIFY `rid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `user`
--
ALTER TABLE `user`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FKp6taepjm8nbj4doesmj3uj5jy` FOREIGN KEY (`roles_rid`) REFERENCES `role` (`rid`),
  ADD CONSTRAINT `FKsk35kye23trjmxl5owaoly5y8` FOREIGN KEY (`user_uid`) REFERENCES `user` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
