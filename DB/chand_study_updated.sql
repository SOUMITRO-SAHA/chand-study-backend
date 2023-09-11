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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL DEFAULT 'ALL',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `categoryName` (`categoryName`),
  UNIQUE KEY `categoryName_2` (`categoryName`),
  UNIQUE KEY `categoryName_3` (`categoryName`),
  UNIQUE KEY `categoryName_4` (`categoryName`),
  UNIQUE KEY `categoryName_5` (`categoryName`),
  UNIQUE KEY `categoryName_6` (`categoryName`),
  UNIQUE KEY `categoryName_7` (`categoryName`),
  UNIQUE KEY `categoryName_8` (`categoryName`),
  UNIQUE KEY `categoryName_9` (`categoryName`),
  UNIQUE KEY `categoryName_10` (`categoryName`),
  UNIQUE KEY `categoryName_11` (`categoryName`),
  UNIQUE KEY `categoryName_12` (`categoryName`),
  UNIQUE KEY `categoryName_13` (`categoryName`),
  UNIQUE KEY `categoryName_14` (`categoryName`),
  UNIQUE KEY `categoryName_15` (`categoryName`),
  UNIQUE KEY `categoryName_16` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'LDGE JE','2023-09-01 11:23:57','2023-09-01 11:23:57'),(2,'ASM','2023-09-01 11:26:56','2023-09-01 11:34:32'),(3,'LDGE','2023-09-01 11:29:56','2023-09-01 11:35:09');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

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
  `language` enum('HINDI','ENGLISH') NOT NULL DEFAULT 'HINDI',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `categoryId` int DEFAULT NULL,
  `defaultValidityDuration` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Introduction to Node.js','Learn the basics of Node.js development.',499,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\Introduction to Node.js-1693553339343.png','[\"Video Lectures\", \"Code Samples\", \"Certificate\"]','https://www.youtube.com/watch?v=xyz123','HINDI','2023-09-01 07:28:59','2023-09-07 13:16:50',1,1,12),(2,' Web Development Fundamentals',' Master the fundamentals of web development.',299,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Web Development Fundamentals-1693553430845.png','[\" Video Tutorials\", \" Practice Projects\", \" Quizzes\"]',' https://www.youtube.com/watch?v=abc456','HINDI','2023-09-01 07:30:30','2023-09-07 13:15:32',0,NULL,12),(3,' Web Development Fundamentals',' Master the fundamentals of web development.',999,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Web Development Fundamentals-1693553726275.png','[\" Video Tutorials\", \" Practice Projects\", \" Quizzes\"]',' https://www.youtube.com/watch?v=abc456','ENGLISH','2023-09-01 07:35:26','2023-09-07 12:28:06',1,NULL,18),(4,' Data Science Essentials',' Dive into the world of data science and analytics.',599,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Data Science Essentials-1693553791145.png','[\" Data Sets\", \" Analysis Tools\", \" Certification\"]',' https://www.youtube.com/watch?v=pqr789','ENGLISH','2023-09-01 07:36:31','2023-09-07 12:39:04',1,NULL,NULL),(5,' Mobile App Development',' Build mobile apps for iOS and Android.',399,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Mobile App Development-1693553816314.png','[\" App Development Kits\", \" Hands-on Labs\", \" App Store Upload\"]',' https://www.youtube.com/watch?v=lmn987','ENGLISH','2023-09-01 07:36:56','2023-09-07 12:15:44',1,NULL,NULL),(6,' Artificial Intelligence Explained',' Understand the concepts of AI and machine learning.',349,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Artificial Intelligence Explained-1693553832736.png','[\" AI Algorithms\", \" Case Studies\", \" AI Certification\"]',' https://www.youtube.com/watch?v=def012','ENGLISH','2023-09-01 07:37:12','2023-09-07 12:30:34',1,NULL,NULL),(7,' Artificial Intelligence Explained (FREE)',' Understand the concepts of AI and machine learning.',0,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Artificial Intelligence Explained (FREE)-1693556238892.png','[\" AI Algorithms\", \" Case Studies\", \" AI Certification\"]',' https://www.youtube.com/watch?v=def012','HINDI','2023-09-01 08:17:18','2023-09-07 12:16:34',0,NULL,NULL),(8,' Artificial Intelligence Explained (PRO)',' Understand the concepts of AI and machine learning.',4999,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Artificial Intelligence Explained (PRO)-1693897237366.jpeg','[\" AI Algorithms\", \" Case Studies\", \" AI Certification\"]',' https://www.youtube.com/watch?v=def012','HINDI','2023-09-05 07:00:37','2023-09-07 12:05:53',0,NULL,12),(9,' Digital Marketing Explained (PRO)',' Understand the concepts of AI and machine learning.',4999,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\ Digital Marketing Explained (PRO)-1694083904290.jpeg','[\"AI Algorithms\", \" Case Studies\", \" AI Certification\"]',' https://www.youtube.com/watch?v=def012','HINDI','2023-09-07 10:51:44','2023-09-07 10:51:44',0,NULL,12),(10,'Testing','Course Descripton here',1000,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\Testing-1694087723869.jpeg','[\"24 X 7 Customer Support\", \" Live Classes\"]','www.youtube.com/abced','HINDI','2023-09-07 11:55:23','2023-09-07 11:55:23',0,NULL,12),(11,'Testing Part (FREE)','Course Descripton here',0,'D:\\Web Development\\Shivila Tech Kolkata\\chand-study\\chand-backend\\uploads\\courses\\Testing Part (FREE)-1694087945047.jpeg','[\"24 X 7 Customer Support\", \" Live Classes\"]','www.youtube.com/abced','HINDI','2023-09-07 11:59:05','2023-09-07 11:59:05',0,NULL,12);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  PRIMARY KEY (`userId`,`courseId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  `validity` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `enrollments_courseId_userId_unique` (`userId`,`courseId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `enrollments_ibfk_33` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `enrollments_ibfk_34` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,'2023-09-01 08:23:38','2023-09-01 08:23:38',1,1,NULL),(2,'2023-09-01 08:23:44','2023-09-01 08:23:44',1,3,NULL),(3,'2023-09-05 05:34:50','2023-09-05 05:34:50',7,7,NULL),(4,'2023-09-05 06:17:29','2023-09-05 06:17:29',7,1,NULL),(7,'2023-09-05 06:24:59','2023-09-05 06:24:59',7,2,'2024-09-05 06:24:59'),(12,'2023-09-05 07:17:53','2023-09-05 07:17:53',7,3,'2025-03-05 07:17:53'),(13,'2023-09-05 07:18:09','2023-09-05 07:18:09',7,4,NULL),(14,'2023-09-06 13:53:30','2023-09-06 13:53:30',7,6,NULL);
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lectureName` varchar(255) NOT NULL,
  `youtubeLink` varchar(255) NOT NULL DEFAULT '',
  `language` enum('HINDI','ENGLISH') NOT NULL DEFAULT 'HINDI',
  `lectureDescription` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (2,'Sample Lecture','https://www.youtube.com/sample','HINDI','This is a sample lecture description.','2023-09-09 09:24:53','2023-09-09 09:24:53',1),(3,'fasdfadsfdas','ffdafsdafas','HINDI','fdasfdasfads','2023-09-09 09:28:09','2023-09-09 09:28:09',1);
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `options` json DEFAULT NULL,
  `correctAnswer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sectionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sectionId` (`sectionId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (3,'What is the sum of 2 + 2?','[\"3\", \"4\", \"5\", \"6\"]','4','2023-09-02 09:36:16','2023-09-02 09:36:16',2),(5,'What is the area of a square with a side length of 6 units?','[\"18 square units\", \"24 square units\", \"30 square units\", \"36 square units\"]','36 square units','2023-09-02 09:37:03','2023-09-04 12:55:28',3),(6,'What is the area of a square with a side length of 6 units?','[\"18 square units\", \"24 square units\", \"30 square units\", \"36 square units\"]','36 square units','2023-09-04 13:03:43','2023-09-04 13:03:43',3),(7,'Grand Central Terminal, Park Avenue, New York is the world\'s','[\"largest railway station\", \"highest railway station\", \"Longest railway station\", \"None of the above\"]','B','2023-09-11 13:21:53','2023-09-11 13:21:53',2),(8,'Entomology is the science that studies','[\"Behaviour of human beings\", \"Insects\", \"The origin and history of technical and scientific terms\", \"The formation fo rocks\"]','C','2023-09-11 13:21:53','2023-09-11 13:21:53',2),(9,'Eritrea, which became the 182nd member of the UN in 1993, is in the continent of','[\"Asia\", \"Africa\", \"Europe\", \"Australia\"]','A','2023-09-11 13:21:53','2023-09-11 13:21:53',2),(10,'Garampani sanctury is located at','[\"Junagarh, Gujrat\", \"Diphu, Assam\", \"Kohima, nagaland\", \"Gangtok, Sikkim\"]','A','2023-09-11 13:21:53','2023-09-11 13:21:53',2);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `answers` json NOT NULL,
  `userId` int NOT NULL,
  `testId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `marks` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `testId` (`testId`),
  CONSTRAINT `results_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `results_ibfk_16` FOREIGN KEY (`testId`) REFERENCES `tests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (16,'{\"2\": {\"3\": null}}',7,1,'2023-09-05 05:17:47','2023-09-05 05:19:28',-2);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sections`
--

DROP TABLE IF EXISTS `sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `negativeMarking` float NOT NULL,
  `canSkip` tinyint(1) NOT NULL DEFAULT '0',
  `minQuestionsToAdvance` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `testId` int DEFAULT NULL,
  `totalQuestions` int NOT NULL DEFAULT '0',
  `marksPerQuestion` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `testId` (`testId`),
  CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`testId`) REFERENCES `tests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (2,'Quant',1,1,10,'2023-09-02 09:30:41','2023-09-02 09:30:41',1,30,4),(3,'Aptitude',1,1,10,'2023-09-04 12:53:42','2023-09-04 12:53:42',3,30,4);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
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
  `duration` int NOT NULL,
  `language` enum('HINDI','ENGLISH') NOT NULL DEFAULT 'HINDI',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `courseId` int DEFAULT NULL,
  `instruction` text,
  `totalMarks` int DEFAULT NULL,
  `totalQuestions` int DEFAULT NULL,
  `answers` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES (1,'Sample Test',120,'HINDI','2023-09-02 07:18:29','2023-09-04 11:43:16',1,'1. Start by carefully reading the entire question paper.\n2. Allocate your time wisely, giving each section an appropriate amount of time.\n3. Answer the questions you are confident about first.\n4. Review and double-check your answers before submitting.\n5. Stay calm and focused throughout the test.',NULL,NULL,'{\"2\": {\"3\": \"4\", \"5\": \"36 square units\"}}'),(2,'Sample Test 2',120,'ENGLISH','2023-09-02 08:08:53','2023-09-02 08:08:53',1,'1. Start by carefully reading the entire question paper.',NULL,NULL,NULL),(3,'Sample Test 3',120,'ENGLISH','2023-09-02 09:07:09','2023-09-02 09:07:09',1,'1. Start by carefully reading the entire question paper.',300,100,NULL),(4,'Sample Test 4',120,'HINDI','2023-09-04 10:19:28','2023-09-04 10:19:28',1,NULL,300,100,NULL),(5,'Sample Test 4',120,'HINDI','2023-09-05 05:05:50','2023-09-05 05:05:50',3,NULL,300,100,NULL),(6,'Sample Test 4',120,'HINDI','2023-09-05 05:07:25','2023-09-05 05:07:25',1,NULL,300,100,NULL),(7,'Sample Test 5',120,'HINDI','2023-09-05 05:10:18','2023-09-05 05:10:18',3,NULL,300,100,NULL);
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
  `userId` int DEFAULT NULL,
  `courseId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usercourses_courseId_userId_unique` (`userId`,`courseId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `usercourses_ibfk_37` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercourses_ibfk_38` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `isBlocked` tinyint(1) DEFAULT '0',
  `otp` varchar(255) DEFAULT '',
  `otpVerified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Soumitra Saha','soumitrosahaofficial@gmail.com','$2a$10$G7vT.ity7JzgJubCjbwY.Oq68xV8GvfSIwET327WMv2y7tsPlntPW','+919064396684','TEACHER',0,'4053',1,'2023-09-01 05:47:28','2023-09-01 07:26:29'),(5,'Soumitra Saha','soumitrosaha100@gmail.com',NULL,'+919832098320','STUDENT',0,'5489',0,'2023-09-01 08:49:54','2023-09-01 08:49:54'),(7,'Test Admin','admin@gmail.com','$2a$10$2xWJf3MgmQ2ilTjMDt878eBhvb7/lPCZNIXq6HnpRWSMflx9L8kJu',NULL,'TEACHER',0,'',0,'2023-09-01 13:29:14','2023-09-01 13:29:14');
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

-- Dump completed on 2023-09-11 18:54:24
