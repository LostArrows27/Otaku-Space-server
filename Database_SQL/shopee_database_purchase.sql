-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shopee_database
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_amount` int DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `fk_purchase_product_id` (`product_id`),
  CONSTRAINT `fk_purchase_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_purchase_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (24,1,2),(25,26,4),(26,4,1),(27,10,2),(28,25,10),(29,32,2),(31,2,2),(31,16,5),(31,20,8),(31,22,3),(31,23,11),(31,30,6),(32,12,2),(33,12,4),(34,9,5),(35,19,3),(36,21,3),(37,21,3),(38,18,4),(38,19,3),(38,21,3),(38,22,4),(38,30,2),(39,17,4),(39,20,4),(39,25,5),(39,30,2),(40,24,3),(41,24,3),(42,12,1),(42,13,5),(42,17,4),(42,23,3),(42,25,5),(42,26,10),(43,20,3),(44,16,3),(45,26,1),(46,17,2),(47,26,6),(47,31,15),(48,31,2),(49,5,10),(50,24,3),(51,16,3),(51,18,3),(52,15,2),(53,14,3),(54,6,3),(55,15,2),(55,24,1),(56,3,1),(56,4,2),(56,5,1),(56,7,2),(56,10,2),(56,15,1),(56,17,2),(56,23,6),(56,24,2),(56,32,2),(57,26,3),(58,26,2),(59,11,2),(60,47,2),(61,47,2),(62,25,2),(63,16,2),(64,88,2),(65,74,2),(65,80,2),(65,87,2),(65,88,2),(66,86,3),(67,30,5),(68,66,2),(69,22,2),(69,26,5),(69,69,1),(70,74,3),(71,30,2),(72,2,5),(73,76,1),(74,2,2),(74,76,2);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-08  2:48:54
