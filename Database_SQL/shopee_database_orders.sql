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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_customer_id` varchar(50) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `fk_customer_id` (`order_customer_id`),
  CONSTRAINT `fk_customer_id` FOREIGN KEY (`order_customer_id`) REFERENCES `users` (`user_name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (24,'dungkhoaito3','2022-12-05'),(25,'dungkhoaito3','2022-12-05'),(26,'dungkhoaito3','2022-12-05'),(27,'dungkhoaito3','2022-12-05'),(28,'dungkhoaito3','2022-12-05'),(29,'dungkhoaito3','2022-12-05'),(30,'dungkhoaito1','2022-12-05'),(31,'dungkhoaito3','2022-12-05'),(32,'minhnhat0408','2022-12-05'),(33,'minhnhat0408','2022-12-05'),(34,'minhnhat0408','2022-12-05'),(35,'minhnhat0408','2022-12-05'),(36,'minhnhat0408','2022-12-05'),(37,'minhnhat0408','2022-12-05'),(38,'minhnhat0408','2022-12-05'),(39,'minhnhat0408','2022-12-05'),(40,'minhnhat0408','2022-12-05'),(41,'minhnhat0408','2022-12-05'),(42,'minhnhat0408','2022-12-05'),(43,'dungkhoaito3','2022-12-06'),(44,'dungkhoaito3','2022-12-06'),(45,'dungkhoaito3','2022-12-06'),(46,'dungkhoaito3','2022-12-06'),(47,'lostarrows27','2022-12-06'),(48,'lostarrows27','2022-12-06'),(49,'lostarrows27','2022-12-06'),(50,'minhnhat0408','2022-12-06'),(51,'minhnhat0408','2022-12-06'),(52,'dungkhoaito3','2022-12-07'),(53,'dungkhoaito3','2022-12-07'),(54,'dungkhoaito1','2022-12-07'),(55,'dungkhoaito3','2022-12-07'),(56,'dungkhoaito3','2022-12-07'),(57,'dungkhoaito3','2022-12-07'),(58,'dungkhoaito3','2022-12-07'),(59,'dungkhoaito3','2022-12-07'),(60,'dungkhoaito3','2022-12-07'),(61,'dungkhoaito3','2022-12-07'),(62,'dungkhoaito312','2022-12-07'),(63,'dungkhoaito3','2022-12-07'),(64,'dungkhoaito6','2022-12-07'),(65,'dungkhoaito6','2022-12-07'),(66,'dungkhoaito3','2022-12-07'),(67,'quyenkhoaito','2022-12-07'),(68,'quyenkhoaito','2022-12-07'),(69,'quyenkhoaito','2022-12-07'),(70,'quyenkhoaito','2022-12-07'),(71,'dungkhoaito3','2022-12-08'),(72,'duybui0207','2022-12-08'),(73,'duybui0207','2022-12-08'),(74,'duybui0207','2022-12-08');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
