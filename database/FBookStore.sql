-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: fbookstore
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Ca Mau','banglkce160155@fpt.edu.vn','Le Khanh Bang','$2a$10$lOzqc1kd3F447OsyjS9Ktefbbrx34fN8wMvzyaCd98WSZaIozuIZa','0914634991','admin'),(2,'Ca Mau','bangle69.work@gmail.com','Le Khanh Bang','$2a$10$JtiMEHsKHCOcfHDCZHdmEOdVzL2zMmVr6TNGy0AMSjZKy18ZxANyS','0865057749','user'),(3,'An Giang','bangle15092002@gmail.com','Nguyen Duong Phu Trong','$2a$10$Mf3gCDhrjAEbZhEMQJDLTeHn3DkoCy3kHHlM77mzcsy0Q18VY90/G','0856426803','user');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_seq`
--

DROP TABLE IF EXISTS `account_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_seq`
--

LOCK TABLES `account_seq` WRITE;
/*!40000 ALTER TABLE `account_seq` DISABLE KEYS */;
INSERT INTO `account_seq` VALUES (101);
/*!40000 ALTER TABLE `account_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id_cart_item` bigint NOT NULL,
  `quantity` int NOT NULL,
  `id_book` bigint DEFAULT NULL,
  `shopping_cart_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id_cart_item`),
  KEY `FK55l6em1ujqff25aot8wxfuwp0` (`id_book`),
  KEY `FKe89gjdx91fxnmkkssyoim8xfu` (`shopping_cart_id`),
  CONSTRAINT `FK55l6em1ujqff25aot8wxfuwp0` FOREIGN KEY (`id_book`) REFERENCES `product` (`id_book`),
  CONSTRAINT `FKe89gjdx91fxnmkkssyoim8xfu` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (208,2,1,3),(212,1,2,3),(252,1,1,2),(253,1,2,2),(254,2,5,2);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_seq`
--

DROP TABLE IF EXISTS `cart_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_seq`
--

LOCK TABLES `cart_item_seq` WRITE;
/*!40000 ALTER TABLE `cart_item_seq` DISABLE KEYS */;
INSERT INTO `cart_item_seq` VALUES (351);
/*!40000 ALTER TABLE `cart_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id_category` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Self help'),(2,'Tiểu thuyết'),(3,'Lịch sử');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoiceid` bigint NOT NULL,
  `invoice_date` date DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `ship_address` varchar(255) DEFAULT NULL,
  `account_id` bigint NOT NULL,
  `total_price` float NOT NULL,
  PRIMARY KEY (`invoiceid`),
  KEY `FKoevv8h8t2qgym9s0cn7oh069b` (`account_id`),
  CONSTRAINT `FKoevv8h8t2qgym9s0cn7oh069b` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2024-03-13','cod','Tỉnh Quảng Ninh, Thành phố Hạ Long, Phường Tuần Châu, ',3,0),(2,'2024-03-13','cod','undefined, undefined, undefined, ',3,0),(52,'2024-03-14','cod','Tỉnh Cao Bằng, Thành phố Cao Bằng, Phường Sông Bằng, ',2,0);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_items` (
  `itemid` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `invoiceid` bigint DEFAULT NULL,
  `id_book` bigint DEFAULT NULL,
  PRIMARY KEY (`itemid`),
  KEY `FK323gdlx164pfn0vfsc7x4g1fj` (`invoiceid`),
  KEY `FKh2nrlb1op72qh2xt81j1ix19m` (`id_book`),
  CONSTRAINT `FK323gdlx164pfn0vfsc7x4g1fj` FOREIGN KEY (`invoiceid`) REFERENCES `invoice` (`invoiceid`),
  CONSTRAINT `FKh2nrlb1op72qh2xt81j1ix19m` FOREIGN KEY (`id_book`) REFERENCES `product` (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
INSERT INTO `invoice_items` VALUES (1,1,1,2),(2,1,1,1),(3,2,2,1),(4,1,2,2),(5,1,2,3),(6,1,52,1),(7,1,52,2),(8,2,52,5);
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_seq`
--

DROP TABLE IF EXISTS `invoice_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_seq`
--

LOCK TABLES `invoice_seq` WRITE;
/*!40000 ALTER TABLE `invoice_seq` DISABLE KEYS */;
INSERT INTO `invoice_seq` VALUES (151);
/*!40000 ALTER TABLE `invoice_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id_book` bigint NOT NULL,
  `age` int NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `describle` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `star_number` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `category` bigint DEFAULT NULL,
  PRIMARY KEY (`id_book`),
  KEY `FKqx9wikktsev17ctu0kcpkrafc` (`category`),
  CONSTRAINT `FKqx9wikktsev17ctu0kcpkrafc` FOREIGN KEY (`category`) REFERENCES `category` (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,18,'Chau Sa Day Mat','hay','damtreodaiduongden.jpg',10,20,0,'dam tre o dai duong den','tieu thuyet',2),(2,18,'Jose Mauro de Vasconcelos','hay','caycamngotcuatoi.jpg',20,20,0,'Cay cam ngot cua toi','Tieu thuyet',2),(3,18,'Roise Nguyen','hay','Tuoi-tre-dang-gia-bao-nhieu-500x554.jpg',20,10,0,'Tuoi tre dang gia bao nhieu','self help',1),(4,15,'Dale Carnegie','hay','dacnhantam86.jpg',20,20,0,'Dac Nhan Tam','self help',1),(5,18,'Jared Diamond','hay','sung-vi-trung-va-thep-ban-dac-biet.png',25,30,0,'Sung vi trung va thep','Lich su',3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_seq`
--

DROP TABLE IF EXISTS `product_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_seq`
--

LOCK TABLES `product_seq` WRITE;
/*!40000 ALTER TABLE `product_seq` DISABLE KEYS */;
INSERT INTO `product_seq` VALUES (101);
/*!40000 ALTER TABLE `product_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_b9hq28d0x4o254wdcu07xcv72` (`account_id`),
  CONSTRAINT `FKini8djj4po3uum3tg3riuv04s` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_cart_item_list`
--

DROP TABLE IF EXISTS `shopping_cart_cart_item_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart_cart_item_list` (
  `shopping_cart_id` bigint NOT NULL,
  `cart_item_list_id_cart_item` bigint NOT NULL,
  UNIQUE KEY `UK_pwqvxf898nbfbwdm7ipdy1cgu` (`cart_item_list_id_cart_item`),
  KEY `FK266tjrnl064p5uyc1j4lmipun` (`shopping_cart_id`),
  CONSTRAINT `FK266tjrnl064p5uyc1j4lmipun` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_cart` (`id`),
  CONSTRAINT `FKigh9i8md44eguag6p7w3vqwm6` FOREIGN KEY (`cart_item_list_id_cart_item`) REFERENCES `cart_item` (`id_cart_item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_cart_item_list`
--

LOCK TABLES `shopping_cart_cart_item_list` WRITE;
/*!40000 ALTER TABLE `shopping_cart_cart_item_list` DISABLE KEYS */;
INSERT INTO `shopping_cart_cart_item_list` VALUES (2,252),(2,253),(2,254),(3,208),(3,212);
/*!40000 ALTER TABLE `shopping_cart_cart_item_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-14 15:30:24
