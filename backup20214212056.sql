-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: CRM
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backup`
--

DROP TABLE IF EXISTS `backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backup` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backup`
--

LOCK TABLES `backup` WRITE;
/*!40000 ALTER TABLE `backup` DISABLE KEYS */;
INSERT INTO `backup` VALUES ('backup20214212056.sql');
/*!40000 ALTER TABLE `backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` varchar(19) NOT NULL,
  `clientDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` int DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `giveUpRea` varchar(100) DEFAULT NULL,
  `createAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (3,'客户2','13750270585','383333114@qq.com','特殊客户','该客户喜欢...',0,'小黄','','2021-03-20 16:00:00'),(7,'客户23','13750827312','383333114@qq.com','重要客户','该客户喜欢...',0,'小黄','','2021-03-21 12:01:34'),(9,'客户8','12345678910','383333114@qq.com','普通客户','该客户喜欢...',0,'大黄','','2021-03-21 12:01:37'),(11,'客户01','12345678910','383333114@qq.com','重要客户','该客户喜欢...',0,'小叶',NULL,'2021-03-21 12:01:39'),(12,'客户11','14783242524','383333114@qq.com','重要客户','该客户喜欢...',0,'lucky',NULL,'2021-03-21 12:01:40'),(13,'客户12','14785635213','383333114@qq.com','重要客户','该客户喜欢...',1,'lucky','该客户因...而流失','2021-03-21 12:01:41'),(15,'客户14','14785631231','383333114@qq.com','重要客户','该客户喜欢...',0,'小黄','','2021-03-27 05:46:15'),(19,'客户22','13458542256','222@163.com','普通客户','该客户喜欢...',0,'小梁','','2021-04-06 13:41:45'),(21,'客户33','13569548512','333@163.com','普通客户','该客户喜欢...',0,'小叶','','2021-04-06 13:44:44'),(25,'测试能否添加成功','15665423157','386651223@qq.com','重要客户','该客户喜欢...',0,'Jericho','','2021-04-08 08:37:25'),(29,'客户5','12345678910','383333114@qq.com','重要客户','该客户喜欢...',0,'Jericho','','2021-04-11 08:51:03'),(30,'test1111','12345678910','383333114@163.com','重要客户','该客户喜欢...',0,'小黄','','2021-04-11 08:51:08'),(31,'客户3','12345678910','383333114@qq.com','重要客户','该客户喜欢...',0,'小吴','','2021-04-11 08:51:11'),(32,'客户7','12345678910','383333114@qq.com','特殊客户','该客户喜欢...',1,'lucky','该客户因...而流失','2021-04-11 08:51:14'),(33,'客户9','12345678910','383333114@qq.com','重要客户','该客户喜欢...',0,'小叶','','2021-04-11 08:56:35'),(34,'客户4','12345678910','383333114@qq.com','特殊客户','该客户喜欢...',0,'lucky','','2021-04-12 12:44:14'),(35,'添加客户1111','13750270585','383323117@qq.com','重要客户','该客户喜欢....',0,'lucky','','2021-04-13 00:20:06'),(36,'小武','17698217232','383312348@qq.com','特殊客户','该客户喜欢...',0,'小黄',NULL,'2021-04-20 07:09:00'),(37,'客户420','14576824120','2370872134@qq.com','重要客户','该客户喜欢....',0,'lucky',NULL,'2021-04-20 07:57:31');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delclient`
--

DROP TABLE IF EXISTS `delclient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delclient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `type` varchar(19) NOT NULL,
  `clientDesc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `giveUpRea` varchar(100) DEFAULT NULL,
  `createAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delclient`
--

LOCK TABLES `delclient` WRITE;
/*!40000 ALTER TABLE `delclient` DISABLE KEYS */;
INSERT INTO `delclient` VALUES (29,'test20210408','12345678910','383333114@163.com','重要客户','该客户喜欢...',1,'压了要头','放弃的测试理由','2021-04-08 08:50:52'),(31,'客户13','12345678910','383333114@qq.com','重要客户','该客户喜欢...',1,'lucy','怎么不会消失的？？？','2021-04-10 16:47:15'),(32,'再次测试state','15478562130','55632@163.com','一般','描述事实上飒飒啊啊啊',1,'摇了摇头','流失该客户？？','2021-04-11 08:50:34'),(35,'测试测试','14857564250','1858@163.com','普通','descccc',1,'摇了摇头','流失该客户...','2021-04-11 08:50:54'),(38,'test11111','14785634520','1258@163.com','普通客户','该客户喜欢...',1,'小梁','该客户因...而流失','2021-04-20 08:48:56');
/*!40000 ALTER TABLE `delclient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `desc` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'总管理部','最高权限'),(2,'销售部','公司业务销售管理部门，负责拓展渠道和维护客户'),(3,'后勤部','公司后勤管理部门，负责行政、财务、人事等日常管理工作');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `power` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'总管理员','系统最高权限拥有者','systemall',1),(2,'销售部经理','销售部门最高权限拥有者','customerall',2),(3,'销售部员工','销售部门普通员工','customermy',2),(4,'后勤部经理','后勤部门最高权限拥有者','userall',3),(5,'后勤部员工','后勤部门普通员工','usermy',3);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `job_id` int NOT NULL,
  `department_id` int NOT NULL,
  `superior_name` varchar(50) DEFAULT NULL,
  `createAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'系统管理员','33cb305d183c743612a78f488afc654f','14767695806',1,1,'  ','2021-03-15 13:00:46'),(2,'Fred','33cb305d183c743612a78f488afc654f','13752644521',2,2,'系统管理员','2021-03-25 13:51:11'),(3,'小邬','33cb305d183c743612a78f488afc654f','12345678910',4,2,'系统管理员','2021-04-03 14:58:34'),(9,'lucky','33cb305d183c743612a78f488afc654f','13750270585',3,3,'Fred','2021-04-04 07:52:13'),(17,'邬晓进','33cb305d183c743612a78f488afc654f','13750270585',2,2,'系统管理员','2021-04-09 05:58:44'),(19,'小叶','33cb305d183c743612a78f488afc654f','14767695860',3,3,'邬晓进','2021-04-09 16:57:30'),(24,'小黄','33cb305d183c743612a78f488afc654f','14767695860',3,2,'邬晓进','2021-04-15 14:10:22'),(26,'小吴','33cb305d183c743612a78f488afc654f','13750213456',3,2,'邬晓进','2021-04-15 14:14:52'),(27,'大黄','d4ff2e28a521719012d2f10a2f54b756','14567895210',3,2,'Fred','2021-04-15 14:15:39'),(28,'小梁','33cb305d183c743612a78f488afc654f','15967582460',3,2,'Fred','2021-04-15 14:17:29'),(32,'小冯','25f9e794323b453885f5181f1b624d0b','15967695410',5,3,'系统管理员','2021-04-15 14:30:53'),(36,'Kenter','33cb305d183c743612a78f488afc654f','14767695860',5,3,'邬某某','2021-04-15 14:38:24'),(42,'Jericho','33cb305d183c743612a78f488afc654f','14765874510',3,2,'邬晓进','2021-04-17 05:12:42'),(46,'邬某某','33cb305d183c743612a78f488afc654f','14767695860',4,3,'总管理员','2021-04-18 07:54:46');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-21 20:56:27
