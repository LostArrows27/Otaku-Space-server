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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` mediumtext,
  `owner_name` varchar(50) DEFAULT NULL,
  `sale_percent` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `left_amount` int DEFAULT NULL,
  `sold_amount` int DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `liked_count` int DEFAULT NULL,
  `main_image` mediumtext,
  `sub_image1` mediumtext,
  `sub_image2` mediumtext,
  `sub_image3` mediumtext,
  `sub_image4` mediumtext,
  PRIMARY KEY (`product_id`),
  KEY `fk_owner_name` (`owner_name`),
  CONSTRAINT `fk_owner_name` FOREIGN KEY (`owner_name`) REFERENCES `users` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Truyện - Thiên sứ nhà bên tập 3 (Bản Giới Hạn)','dungkhoaito1',18,96000,10,30,'Light Novel',32,'https://cf.shopee.vn/file/50d88e26f112646c7add7ff75f584432_tn','https://cf.shopee.vn/file/8146319bce5c702ae7595f59acb3b521','https://cf.shopee.vn/file/fa2f68e2502474f0d669bc63daa1fdc6_tn','https://cf.shopee.vn/file/50d88e26f112646c7add7ff75f584432_t','https://cf.shopee.vn/file/fa2f68e2502474f0d669bc63daa1fdc6_tn'),(2,'Sách - Light Novel Chuyện tình thanh xuân bi hài của tôi quả nhiên là sai lầm lẻ 1-10.5','dungkhoaito1',13,100000,12,39,'Light Novel',100,'https://cf.shopee.vn/file/19282624bb5b6233e1eb5d882a1b041a_tn','https://cf.shopee.vn/file/19282624bb5b6233e1eb5d882a1b041a_tn','https://cf.shopee.vn/file/19282624bb5b6233e1eb5d882a1b041a_tn','https://cf.shopee.vn/file/19282624bb5b6233e1eb5d882a1b041a_tn','https://cf.shopee.vn/file/19282624bb5b6233e1eb5d882a1b041a_tn'),(3,'Sách Hội Chứng Tuổi Thanh Xuân - Tập 1','dungkhoaito1',29,95000,20,99,'Light Novel',48,'https://cf.shopee.vn/file/ba0f726d881d9f650309131bb05d51fe_tn','https://cf.shopee.vn/file/ba0f726d881d9f650309131bb05d51fe_tn','https://cf.shopee.vn/file/dcafa749669d7117a00dd6561de5a7ac','https://cf.shopee.vn/file/b7736d9e69097ed1f074fa9a4a1ec852','https://cf.shopee.vn/file/a6e98b3ecb3f48185831997105ff0477'),(4,'Sách - Postcard Book Nhà Có 5 Nàng Dâu Chính Hãng Từ Nhật','dungkhoaito1',36,450000,20,5,'Light Novel',29,'https://cf.shopee.vn/file/3c1b2d78d167cb69822f908323610d92_tn','https://cf.shopee.vn/file/f60f7a34c413c664b7a23f36d7827b78_tn','https://cf.shopee.vn/file/3d7f0e088e982af25f8e1d7334714063_tn','https://cf.shopee.vn/file/deb967560e26ad5790c643f4b8b4a502','https://cf.shopee.vn/file/e6424028ed3bf6fc2860673334298e5e_tn'),(5,'Truyện - Nhân Vật Hạ Cấp Tomozaki - Tập 3 (Bản Giới Hạn)','dungkhoaito1',24,90000,54,30,'Light Novel',25,'https://cf.shopee.vn/file/201303282b536c7ba87efe13e27aa1e8_tn','https://cf.shopee.vn/file/201303282b536c7ba87efe13e27aa1e8_tn','https://cf.shopee.vn/file/201303282b536c7ba87efe13e27aa1e8_tn','https://cf.shopee.vn/file/201303282b536c7ba87efe13e27aa1e8_tn','https://cf.shopee.vn/file/201303282b536c7ba87efe13e27aa1e8_tn'),(6,'Sách Thần Chết Làm Thêm 300 Yên/Giờ','lostarrows27',30,75000,12,13,'Tiểu Thuyết',39,'https://cf.shopee.vn/file/2b351532041cb08eb2337e918f60777a_tn','https://cf.shopee.vn/file/049f03bd8e6bae88f671ec906071e97b_tn','https://cf.shopee.vn/file/156bfd0842b1a53f5d11b56085e55307_tn','https://cf.shopee.vn/file/93db099dada8387ebf874fca96439055_tn','https://cf.shopee.vn/file/573adeeb0075201f68522c5105b32ddc_tn'),(7,'Sách - Khi Bình Minh Tới Tớ Sẽ Đến Gặp Cậu Đầu Tiên','lostarrows27',39,96000,39,100,'Tiểu Thuyết',20,'https://cf.shopee.vn/file/c9951212162b35e10a8fbf5dce170816_tn','https://cf.shopee.vn/file/sg-11134201-22110-kl6oaibfibkv18','https://cf.shopee.vn/file/c9951212162b35e10a8fbf5dce170816_tn','https://cf.shopee.vn/file/sg-11134201-22110-252uadbfibkv11_tn','https://cf.shopee.vn/file/c9951212162b35e10a8fbf5dce170816_tn'),(8,'( Artbook ) Saekano - Saenai Kanojo No Sodatekata - FLAT ( Gốc Nhật )','lostarrows27',34,340000,2,99,'Tiểu Thuyết',54,'https://cf.shopee.vn/file/4f533ed35a1588e9cb1d9d43a714fc36_tn','https://cf.shopee.vn/file/ec87d2651e3bf428e555d7317946a654_tn','https://cf.shopee.vn/file/c154e6dd57c6c4bc98520f0fd4424ba9','https://cf.shopee.vn/file/ec87d2651e3bf428e555d7317946a654_tn','https://cf.shopee.vn/file/c154e6dd57c6c4bc98520f0fd4424ba9'),(9,'Sách - Light Novel 5 centimet trên giây - 5cm/s - IPM','lostarrows27',12,54000,3,45,'Tiểu Thuyết',12,'https://cf.shopee.vn/file/9f486b740d4e4f24639fed732b3b1608_tn','https://cf.shopee.vn/file/f009aa4e41bdabbfb1f271aa885b6dbd','https://cf.shopee.vn/file/200d3de21c5953347e13a727c9498c93_tn','https://cf.shopee.vn/file/f009aa4e41bdabbfb1f271aa885b6dbd','https://cf.shopee.vn/file/200d3de21c5953347e13a727c9498c93_tn'),(10,'Sách Đứa con của thời tiết - Shinkai Makoto - Light Novel - IPM','lostarrows27',11,78000,0,16,'Tiểu Thuyết',23,'https://cf.shopee.vn/file/270e91991045c286ff03090f21366d5e_tn','https://cf.shopee.vn/file/2a23842ef096fc51870c983fb85b18c2_tn','https://cf.shopee.vn/file/2a23842ef096fc51870c983fb85b18c2_tn','https://cf.shopee.vn/file/2de77fa5db2497aeb56f7ccd242a8365_tn','https://cf.shopee.vn/file/9aa50e760f42e84c7d76c0fc9fd4fbbc'),(11,'Dã ngoại thảnh thơi - NXB Kim Đồng','dungkhoaito2',39,20000,2000,12,'Manga Nhật',32,'https://cf.shopee.vn/file/014f816dea51c76c3e794785d869176f_tn','https://cf.shopee.vn/file/857dd6e808da604e71934e979aa85341_tn','https://cf.shopee.vn/file/9af163e33762c587836bae1724479a06_tn','https://cf.shopee.vn/file/a31678008c6f89ee1799fd114691c496_tn','https://cf.shopee.vn/file/bc15a94e27b63b2ed7aafa493d1cae57_tn'),(12,'Kaguya-Sama cuộc chiến tỏ tình 1','dungkhoaito2',29,30000,12,45,'Manga Nhật',23,'https://cf.shopee.vn/file/sg-11134201-22110-ude4u1n410jv55_tn','https://cf.shopee.vn/file/sg-11134201-22110-m90u0mgyj9jv98_tn','https://cf.shopee.vn/file/sg-11134201-22110-f7agqpv2fijv91_tn','https://cf.shopee.vn/file/sg-11134201-22110-svqi3nv2fijva4_tn','https://cf.shopee.vn/file/sg-11134201-22100-eaiwix206wive4'),(13,'Spy X Family tập 1-7','dungkhoaito2',19,22000,12,30,'Manga Nhật',49,'https://cf.shopee.vn/file/b4e2490957910b69b75b99715132c4fc_tn','https://cf.shopee.vn/file/3bcf32886f4a239c852778554ce3f0e2_tn','https://cf.shopee.vn/file/56fbac80dc9cd703a21da9a90f2da0c0_tn','https://cf.shopee.vn/file/4039fdfc137294e877f99a3a4be5d5f3_tn','https://cf.shopee.vn/file/31c3862eaba8e1a5cd16052f8ab9f53a'),(14,'Cô bạn tôi thầm thích lại quên mang kính rồi (1-8) ','dungkhoaito2',28,30000,40,49,'Manga Nhật',13,'https://cf.shopee.vn/file/56aad94d7d91bfbdf72b3f8c80534679_tn','https://cf.shopee.vn/file/92f210f6f9e860a2de2dcb0dd0b8cb13_tn','https://cf.shopee.vn/file/ed24b9dce189bc2eea0906dc76e94993','https://cf.shopee.vn/file/92f210f6f9e860a2de2dcb0dd0b8cb13_tn','https://cf.shopee.vn/file/ed24b9dce189bc2eea0906dc76e94993'),(15,'アオのハコ 4 - Ao no Hako - Blue Box','dungkhoaito2',11,159000,23,12,'Manga Nhật',100,'https://cf.shopee.vn/file/sg-11134201-22120-jich63fjelkv21_tn','https://cf.shopee.vn/file/sg-11134201-22120-jich63fjelkv21_tn','https://cf.shopee.vn/file/sg-11134201-22120-jich63fjelkv21_tn','https://cf.shopee.vn/file/sg-11134201-22120-jich63fjelkv21_tn','https://cf.shopee.vn/file/sg-11134201-22120-jich63fjelkv21_tn'),(16,'Đồ trang trí Nhân Vật Genshin - Anime','210202689',22,300000,12,23,'Figure - Đồ chơi',44,'https://cf.shopee.vn/file/8b9cc47c4f9ec15b9ddfb9c1147b707e','https://cf.shopee.vn/file/c5dac3ec721f8e4b9fdf1bb42daaf986_tn','https://cf.shopee.vn/file/641c7162c621b99b3734b5d088993bc8_tn','https://cf.shopee.vn/file/6303133b9775ba9d2583a515f1eb59d3','https://cf.shopee.vn/file/6303133b9775ba9d2583a515f1eb59d3'),(17,'Mô Hình Nhân Vật Anya Forger','210202689',40,500000,12,32,'Figure - Đồ chơi',33,'https://cf.shopee.vn/file/b4bffdf493f377a94e90ec178dcd28ea_tn','https://cf.shopee.vn/file/6b46d567433456848a56da30a418e673_tn','https://cf.shopee.vn/file/edc0fb99efe2052560598f264d9a43cb_tn','https://cf.shopee.vn/file/555178994b57ba5233969bec544261d9_tn','https://cf.shopee.vn/file/6b46d567433456848a56da30a418e673_tn'),(18,' Mô hình Figma Monkey D. Luffy','210202689',29,230000,12,12,'Figure - Đồ chơi',34,'https://cf.shopee.vn/file/2fedef37e1e2a8511fd3743c3fbd0acf','https://cf.shopee.vn/file/975434d3076536fcfa38796a80774cb4_tn','https://cf.shopee.vn/file/b484628b622313dea06f9e298187e6a2_tn','https://cf.shopee.vn/file/975434d3076536fcfa38796a80774cb4_tn','https://cf.shopee.vn/file/b484628b622313dea06f9e298187e6a2_tn'),(19,'Mô hình nhà búp bê Cutebee','210202689',16,30000,34,14,'Figure - Đồ chơi',46,'https://cf.shopee.vn/file/19f73aaa7a713fda4ceddd8c9e92078a_tn','https://cf.shopee.vn/file/sg-11134201-22110-gbgkvn7rq7jv66_tn','https://cf.shopee.vn/file/6a7f68d34b426298c54e14045b7ed9b6_tn','https://cf.shopee.vn/file/1ace3bfb181d66a332dd78ba4d546135_tn','https://cf.shopee.vn/file/sg-11134201-22110-gbgkvn7rq7jv66_tn'),(20,'Mô Hình Nhà Gỗ Lắp Ráp DollHouse DIY','210202689',15,230000,12,2,'Figure - Đồ chơi',10,'https://cf.shopee.vn/file/63df7093d165bd6c1c7e477a0790d287_tn','https://cf.shopee.vn/file/56f8c0b3c1a1f96c2fd51c8559256c92_tn','https://cf.shopee.vn/file/802691df66e86d3061556bd548802774_tn','https://cf.shopee.vn/file/56f8c0b3c1a1f96c2fd51c8559256c92_tn','https://cf.shopee.vn/file/63df7093d165bd6c1c7e477a0790d287_tn'),(21,'Túi Đựng Bút Chì Kẻ Ô Màu Trắng Đen Trong Suốt','dungkhoaito312',17,20000,23,45,'Văn Phòng Phẩm',65,'https://cf.shopee.vn/file/sg-11134201-22120-1gfldnoapmkv5f_tn','https://cf.shopee.vn/file/b637601f748414a5279fb4a75da58476_tn','https://cf.shopee.vn/file/sg-11134201-22090-ikb5qbxg22hv75_tn','https://cf.shopee.vn/file/b637601f748414a5279fb4a75da58476_tn','https://cf.shopee.vn/file/12ae0a91d78878d233c1f376a2aea2c6_tn'),(22,'Dao cắt giấy cỡ nhỏ cầm tay','dungkhoaito312',32,50000,32,12,'Văn Phòng Phẩm',12,'https://cf.shopee.vn/file/fee58c06c6fafd654d6f79b11fd8cc2f_tn','https://cf.shopee.vn/file/fee58c06c6fafd654d6f79b11fd8cc2f_tn','https://cf.shopee.vn/file/fee58c06c6fafd654d6f79b11fd8cc2f_tn','https://cf.shopee.vn/file/fee58c06c6fafd654d6f79b11fd8cc2f_tn','https://cf.shopee.vn/file/fee58c06c6fafd654d6f79b11fd8cc2f_tn'),(23,'Balo nữ đi học thời trang ulzzang','dungkhoaito312',39,100000,12,13,'Văn Phòng Phẩm',36,'https://cf.shopee.vn/file/sg-11134201-22110-s57l62axwikv80_tn','https://cf.shopee.vn/file/sg-11134201-22110-ss0bybsxwikvd4_tn','https://cf.shopee.vn/file/sg-11134201-22110-rjpt97zxwikv05_tn','https://cf.shopee.vn/file/sg-11134201-22110-gjekk97xwikv52_tn','https://cf.shopee.vn/file/sg-11134201-22110-cbw5hznywikvab_tn'),(24,'Máy Tính Casio FX 580VNX','dungkhoaito312',24,500000,14,23,'Văn Phòng Phẩm',74,'https://cf.shopee.vn/file/e496604eb059b06df32c4e30517dd020_tn','https://cf.shopee.vn/file/e311329c80faa697d51d974370e8f8c8_tn','https://cf.shopee.vn/file/c228c01ffed72987affcc1e2efc96c2f_tn','https://cf.shopee.vn/file/e311329c80faa697d51d974370e8f8c8_tn','https://cf.shopee.vn/file/e311329c80faa697d51d974370e8f8c8_tn'),(25,'Bàn học để laptop có khe ipad','dungkhoaito312',25,45000,1000,1000,'Văn Phòng Phẩm',32,'https://cf.shopee.vn/file/49b312293d8ca352e8ab8e9108cd31e1_tn','https://cf.shopee.vn/file/5a8fa28f08001031fafff301d9ab5223_tn','https://cf.shopee.vn/file/2dd169e052370703ca8f461544121de0_tn','https://cf.shopee.vn/file/49b312293d8ca352e8ab8e9108cd31e1_t','https://cf.shopee.vn/file/1daa96ae70afa1467a5cec9327d981d9_tn');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-04 21:29:44
