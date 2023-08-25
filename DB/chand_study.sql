-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: chand_study
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) NOT NULL,
  `courseDescription` varchar(255) NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `images` varchar(255) NOT NULL DEFAULT '',
  `whatYouGet` json DEFAULT NULL,
  `youtubeLink` varchar(255) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Introduction to Node.js','Learn the basics of Node.js development.',799,'','[\"Video Lectures,Code Samples,Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:15:13','2023-08-24 10:25:45',NULL),(2,'Introduction to Node.js','Learn the basics of Node.js development.',499,'','[\"Video Lectures,Code Samples,Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:15:56','2023-08-24 09:15:56',NULL),(3,'Introduction to Node.js','Learn the basics of Node.js development.',499,'','[\"Video Lectures,Code Samples,Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:16:52','2023-08-24 09:16:52',NULL),(4,'Introduction to Node.js','Learn the basics of Node.js development.',499,'','[\"Video Lectures\", \"Code Samples\", \"Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:33:06','2023-08-24 09:33:06',NULL),(6,'Introduction to Node.js','Learn the basics of Node.js development.',499,'','[\"Video Lectures\", \"Code Samples\", \"Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:43:05','2023-08-24 09:43:05',NULL),(7,'Introduction to Node.js','Learn the basics of Node.js development.',499,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\Introduction to Node.js-1692870816090.png','[\"Video Lectures\", \"Code Samples\", \"Certificate\"]','https://www.youtube.com/watch?v=xyz123','2023-08-24 09:53:36','2023-08-24 09:53:36',NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `testName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercourses`
--

DROP TABLE IF EXISTS `usercourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercourses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `CourseId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserCourses_CourseId_UserId_unique` (`UserId`,`CourseId`),
  KEY `CourseId` (`CourseId`),
  CONSTRAINT `usercourses_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercourses_ibfk_2` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercourses`
--

LOCK TABLES `usercourses` WRITE;
/*!40000 ALTER TABLE `usercourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `usercourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'STUDENT',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'SS Student','student@gmail.com','$2a$10$Icc.aeXecBczVU1kuX5Asea5EQ72FOU7EJMSB2JrGSLeDz1VgZVPe',NULL,'STUDENT','2023-08-24 08:05:33','2023-08-24 08:05:33'),(2,'Soumitra Saha','ss@gmail.com','$2a$10$upFaxF6CbM7UD7slk2ry3e5DfCxmrnx/OCHX0fD3IcuKaRl0Qtis.',NULL,'TEACHER','2023-08-24 08:08:50','2023-08-24 08:08:50'),(3,'Soumitra Saha','soumitra@gmail.com','$2a$10$6DJTS4TM/hRx3AJGTK/ovuVQTLgntZ2TnRRG/d7HxdCZrG49J1Qbm',NULL,'STUDENT','2023-08-24 12:25:40','2023-08-24 12:25:40'),(4,'Soumitra Saha','sss@gmail.com','$2a$10$lsS4xu5f/bDv9qAxNSadfuFb9do6PN1lcEYJ9DEZReoukyYHXv2ZG',NULL,'STUDENT','2023-08-24 12:27:34','2023-08-24 12:27:34'),(5,'Demo','demo@gmail.com','$2a$10$vVulmR7exSDDUpbN2ulXZu.2oZtef1WmS2bGJhNJPTOwpeT7c2Gt6',NULL,'STUDENT','2023-08-24 12:29:12','2023-08-24 12:29:12'),(6,'Soumitra Saha','ssss@gmail.com','$2a$10$0OM06FZyDcsuZ3NfNiLKq.wrCPojygcbFNm48BS.9HdRq9g8M3ykK',NULL,'STUDENT','2023-08-24 12:51:41','2023-08-24 12:51:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-25 18:04:16
