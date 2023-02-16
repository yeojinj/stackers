-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: i8c210.p.ssafy.io    Database: stackers_test
-- ------------------------------------------------------
-- Server version	5.5.5-10.10.2-MariaDB-1:10.10.2+maria~ubu2204

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(200) NOT NULL,
  `reg_time` datetime DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `station_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  KEY `FKtdcvl1cmy2vhrcsukq25msdjg` (`station_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKtdcvl1cmy2vhrcsukq25msdjg` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'지금 바로 스택 쌓도록 하겠습니다! 제 스테이션에도 방문해주세요~~','2023-02-16 15:04:39',12,2),(2,'칼림바 연주가 너무 기분 좋네요~','2023-02-16 15:22:05',7,8),(3,'맑고 청량한 소리, 바순과는 색다른 매력이 있군요','2023-02-16 15:26:45',13,8),(4,'혜성이형~ 저는 이제부터 저보다 잘하는 사람은 형입니다.','2023-02-16 15:28:59',8,9),(5,'빨래가 다 되었네요! 감사합니다~','2023-02-16 15:30:30',8,3),(6,'이거 듣고 세탁기로 달려갔습니다..','2023-02-16 15:31:56',10,3),(7,'지금 스택 쌓으러 갑니다~~','2023-02-16 15:32:54',10,8),(8,'환상적인 오르골 연주네요','2023-02-16 15:33:05',10,4),(9,'이게 재능 낭비라뇨...','2023-02-16 15:38:39',9,12),(10,'이거 듣고 세탁기로 달려갔습니다..','2023-02-16 15:40:08',9,3),(11,'최고의 스택 연주입니다!','2023-02-16 15:40:21',9,4),(12,'퍼가요~','2023-02-16 15:40:33',9,8),(13,'oh my god','2023-02-16 15:40:55',9,11),(14,'so cooooool','2023-02-16 15:40:57',9,11),(15,'오 진짜 청량...포카리를 음악으로 하면 이렇게 되나요?','2023-02-16 15:43:42',11,7),(16,'제 최애곡인데 감사합니다!!!','2023-02-16 15:43:54',11,2),(17,'이렇게 잘 어울릴 수 있나요?','2023-02-16 15:44:16',11,4),(18,'너무 클래식하네요~','2023-02-16 15:44:33',11,10),(19,'역시 일렉은 일렉만의 매력이 있네요 통기타로 도전해봅니다','2023-02-16 15:50:18',2,9),(20,'혹시 머슬맨은 아래에서 하프를 들고 있나요~~??','2023-02-16 16:37:56',3,15),(21,'끊는 타이밍 뭐임ㅋㅋ','2023-02-16 16:39:34',3,11),(22,'이거 듣고 세탁기로 달려갔습니다..','2023-02-16 17:13:33',15,3),(23,'바순의 매력! 헤어나올 수 없네요~~','2023-02-16 17:38:23',16,10);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `follower_id` bigint(20) DEFAULT NULL,
  `following_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtps7gpodlrhxlji90u6r3mlng` (`follower_id`),
  KEY `FKkcoemc64xrm83cdmhyaphcuiu` (`following_id`),
  CONSTRAINT `FKkcoemc64xrm83cdmhyaphcuiu` FOREIGN KEY (`following_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKtps7gpodlrhxlji90u6r3mlng` FOREIGN KEY (`follower_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (1,5,4),(2,2,4),(3,2,6),(4,2,12),(5,14,4),(6,7,14),(7,7,1),(8,7,5),(9,7,4),(10,13,14),(11,8,12),(12,8,14),(13,8,5),(14,8,6),(15,10,6),(16,10,12),(17,10,14),(18,9,6),(19,9,12),(20,9,14),(21,11,14),(22,2,13),(23,2,7),(24,15,12),(25,15,14),(26,4,6),(27,4,14),(28,4,7),(29,16,13);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heart`
--

DROP TABLE IF EXISTS `heart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `station_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiqbtbunbl2h0r928gnlg7ncta` (`member_id`),
  KEY `FK3lgnh9u3fsjs48jowgnbapxi3` (`station_id`),
  CONSTRAINT `FK3lgnh9u3fsjs48jowgnbapxi3` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`),
  CONSTRAINT `FKiqbtbunbl2h0r928gnlg7ncta` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heart`
--

LOCK TABLES `heart` WRITE;
/*!40000 ALTER TABLE `heart` DISABLE KEYS */;
INSERT INTO `heart` VALUES (1,12,2),(2,2,4),(3,2,2),(4,14,4),(5,14,2),(6,7,8),(7,13,8),(8,8,4),(9,8,7),(10,8,9),(11,8,3),(12,10,3),(13,10,4),(14,10,7),(15,9,12),(16,9,3),(17,9,4),(18,9,8),(19,9,11),(20,11,7),(21,11,2),(22,11,4),(23,11,10),(24,1,4),(25,2,10),(26,2,9),(27,15,6),(28,15,3),(29,4,18),(30,16,11),(31,16,19),(32,16,10);
/*!40000 ALTER TABLE `heart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrument`
--

DROP TABLE IF EXISTS `instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrument` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_11wfouotl7vb11u6ebomnbsrr` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrument`
--

LOCK TABLES `instrument` WRITE;
/*!40000 ALTER TABLE `instrument` DISABLE KEYS */;
INSERT INTO `instrument` VALUES (10,'드럼'),(14,'루프스테이션'),(1,'리코더'),(9,'목'),(16,'목소리'),(8,'바순'),(2,'바이올린'),(4,'오르골'),(11,'오카리나'),(7,'일렉'),(13,'젬베'),(6,'칼림바'),(5,'통기타'),(17,'트럼펫'),(12,'펜'),(3,'피아노'),(15,'하프');
/*!40000 ALTER TABLE `instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bio` varchar(300) NOT NULL,
  `email` varchar(30) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `is_resign` bit(1) NOT NULL,
  `last_login` datetime NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `reg_date` datetime NOT NULL,
  `roles` varchar(30) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gc3jmn7c2abyo3wf6syln5t2i` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'','muscleman@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg',_binary '\0','2023-02-16 16:36:20','muscleman','$2a$10$23ei.F8P9GicjL2NobeIoOYxiV0oNLD1iG6x1/kuz/0N6CapWLXFi','2023-02-16 14:39:35','ROLE_USER','muscleman'),(2,'안녕하세요 잠실에서 제일 기타를 잘 치는 김기타 입니다~~','guitarman@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/d7b372cb-8bc0-43a2-91c9-771cee7febdccHJvZmlsZWd1aXRhcm1hbg',_binary '\0','2023-02-16 15:48:45','잠실 기타맨, 김기타','$2a$10$.LPl1FOkPMlyrjqAZeds9eQMKBh3NO6OcVT3FlJAQnRHfpVYQeCHC','2023-02-16 14:39:46','ROLE_USER','guitarman'),(3,'','americanoluv@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg',_binary '\0','2023-02-16 16:37:40','americanoluv','$2a$10$5yY3uTJiGdRbHYlXgjfG/u74NaTn26txtt5FE6VyKpOG5mkzvEPi2','2023-02-16 14:39:58','ROLE_USER','americanoluv'),(4,'소망이와 음악을 사랑하는 소망이형입니다.','swany0509@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/b2f40f5b-f78e-4b35-8eb4-562f95849328cHJvZmlsZXN3YW55MDUwOQ',_binary '\0','2023-02-16 17:18:51','소망이형','$2a$10$zLcN8jyLIzLxkP6RiCNn7.E4188/BWccnycSNduRNOTvVQoY1gX5a','2023-02-16 14:40:10','ROLE_USER','swany0509'),(5,'나는 김명진','manduthecat@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/46b33e4c-ef64-4a45-ac1d-87a018f7fc2dcHJvZmlsZW1hbmR1dGhlY2F0',_binary '\0','2023-02-16 15:29:23','김명진','$2a$10$ZgWZ/KJA3wMPNZCbeiZl2e2fRDkbO7mmDa7D8SNbgLJRy8OhBqRyW','2023-02-16 14:40:17','ROLE_USER','manduthecat'),(6,'안녕하세요~ 내 이름은 박준영!!','gonjelly@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/9d7dff58-ce3d-45a2-9439-b124166dbbcccHJvZmlsZWdvbmplbGx5',_binary '\0','2023-02-16 15:09:52','박주녕','$2a$10$MmnaFrKoZMITzEmiUsVOU.7Ia0Y/07H1kW4ExU5qFsX7bHGe5vski','2023-02-16 14:40:27','ROLE_USER','gonjelly'),(7,'하이 모두들 내 이름은 강혜성~~','cometstrike@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/50cb4722-ea41-45d1-a5f0-729fe5c0045bcHJvZmlsZWNvbWV0c3RyaWtl',_binary '\0','2023-02-16 15:19:47','강혜성','$2a$10$OMKn/yLs2yFaXGiobrRs9eqoXCdMDcsVnElNfpgoos7PaDONt8E7y','2023-02-16 14:40:36','ROLE_USER','cometstrike'),(8,'취업할 땐 SSAFY로, 합주할 땐 Stackers~','leewonseok@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/8985d08f-c9ba-4bf2-a76d-6ce1426ecc17cHJvZmlsZWxlZXdvbnNlb2s',_binary '\0','2023-02-16 15:27:54','강대범 프로','$2a$10$H7QLT6wE1ixHiC5SuWNLpOit0ZXinqg61rF8P6pRDS4I2kgB.yRKS','2023-02-16 14:40:48','ROLE_USER','leewonseok'),(9,'라면에는 계란, 합주에는 Stackers!','sytakkk@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/fc63e291-5a3b-451c-87bd-d66226de3753cHJvZmlsZXN5dGFra2s',_binary '\0','2023-02-16 15:38:49','계란송 파탁탁','$2a$10$c1UKkcfqct6wYGdbS7U2reLt8OiGMhJs6mMcqTMzrkBWIwvJlqSwy','2023-02-16 14:40:58','ROLE_USER','sytakkk'),(10,'피아노 신, 블로그 왕, 배포 공주 김윤미입니다','yoonmii@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/fb4e14da-3dd1-46ef-8d87-803c49b95080cHJvZmlsZXlvb25taWk',_binary '\0','2023-02-16 15:31:44','김미미','$2a$10$tI/NheMtQNkJEuCmexXYNehB2N8Txdn1DAVwRs1C5nSGA8HfOSA6y','2023-02-16 14:41:05','ROLE_USER','yoonmii'),(11,'취업할 땐 SSAFY로, 합주할 땐 Stackers~','gobigstone@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/183b37da-2676-49a4-ba66-4a44fcac3984cHJvZmlsZWdvYmlnc3RvbmU',_binary '\0','2023-02-16 15:42:41','배용렬 프로','$2a$10$d3fnYS3on9nC//bPTmgMDeboJT6WdGeAOXVfDako2QksoZH0Xk3K.','2023-02-16 14:41:17','ROLE_USER','gobigstone'),(12,'','musclewinner@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/138326ad-9568-4edb-8639-61dbe2a71866cHJvZmlsZW11c2NsZXdpbm5lcg',_binary '\0','2023-02-16 17:54:54','winner lee','$2a$10$zS8Mv4oPQrHZFEaWiWnL3uh/9I9gYPilVkIvGTDQqe/W8YloCBVNS','2023-02-16 14:41:30','ROLE_USER','musclewinner'),(13,'','kiminheok@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg',_binary '\0','2023-02-16 15:23:56','kiminheok','$2a$10$zAHI1coxyt8BFkLDwf56PeMB.NTaFaQzg9Pvve0FeBVs/DI496Fd.','2023-02-16 14:42:45','ROLE_USER','kiminheok'),(14,'나 안수빈, 배포퀸, 칼림바퀸이죠.','ansuqueen@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/bbf64875-32b3-4dcc-b098-ad69956724dccHJvZmlsZWFuc3VxdWVlbg',_binary '\0','2023-02-16 17:04:58','안수퀸','$2a$10$A5VF8B7a9ieU65tyvyomZeuVFrSxJwvTHl69jtC5X39c4lOkIadJC','2023-02-16 15:11:59','ROLE_USER','ansuqueen'),(15,'노래로 힐링을 선사합니다','queensinger@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/d66b5c69-1920-48e8-8b2f-6a7ca8ee6196cHJvZmlsZXF1ZWVuc2luZ2Vy',_binary '\0','2023-02-16 17:02:01','노래하는 공주','$2a$10$TPN/o56mw.RVk/DquRljFO1k.ZtKJsR6AuujvJ5fLlFYfJTui4m06','2023-02-16 17:01:46','ROLE_USER','queensinger'),(16,'트럼펫을 사랑하는 남자, 트럼남입니다.','iluvtrumphet@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg',_binary '\0','2023-02-16 17:24:16','박용구','$2a$10$MMs3J/WCGtMG6jQo4Hw4ze50alfpypkjMV33.DFyXsbCUFbk0UIOq','2023-02-16 17:23:57','ROLE_USER','iluvtrumphet'),(17,'','leaderj@naver.com','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/profile/basic.jpg',_binary '\0','2023-02-16 17:46:34','leaderj','$2a$10$CBcQJiFsd1t9Mj0dG41SL.Il.cIiYNg.a2Gg09lueLWtwOWSIPmmm','2023-02-16 17:46:20','ROLE_USER','leaderj');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_92p5dyus9h57gsn60r1yra8bc` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (3,'TENTEN'),(4,'ZZALU'),(6,'씰리'),(5,'오시옵소'),(7,'오이시쿠나레'),(2,'유부남밴드'),(1,'판교로가죠');
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_member`
--

DROP TABLE IF EXISTS `party_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `member_id` bigint(20) DEFAULT NULL,
  `party_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnysnaqwxtvpxoos0ycwtklbou` (`member_id`),
  KEY `FKctrpcp93h130dwe6j1jlhf960` (`party_id`),
  CONSTRAINT `FKctrpcp93h130dwe6j1jlhf960` FOREIGN KEY (`party_id`) REFERENCES `party` (`id`),
  CONSTRAINT `FKnysnaqwxtvpxoos0ycwtklbou` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_member`
--

LOCK TABLES `party_member` WRITE;
/*!40000 ALTER TABLE `party_member` DISABLE KEYS */;
INSERT INTO `party_member` VALUES (1,5,1),(2,4,1),(3,2,2),(4,14,3),(5,7,4),(6,8,5),(7,9,6),(8,11,7);
/*!40000 ALTER TABLE `party_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playable_instrument`
--

DROP TABLE IF EXISTS `playable_instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playable_instrument` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `instrument_id` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1yjfb8ao13f0uu7f2emqrs70l` (`instrument_id`),
  KEY `FK2dkc1dg1yscrv9234xq52sm33` (`member_id`),
  CONSTRAINT `FK1yjfb8ao13f0uu7f2emqrs70l` FOREIGN KEY (`instrument_id`) REFERENCES `instrument` (`id`),
  CONSTRAINT `FK2dkc1dg1yscrv9234xq52sm33` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playable_instrument`
--

LOCK TABLES `playable_instrument` WRITE;
/*!40000 ALTER TABLE `playable_instrument` DISABLE KEYS */;
INSERT INTO `playable_instrument` VALUES (1,2,5),(2,3,4),(3,4,12),(4,5,2),(5,1,6),(6,6,14),(7,7,7),(8,5,7),(9,8,13),(10,9,8),(11,3,10),(12,1,9),(13,11,9),(14,14,11),(15,9,15),(16,17,16);
/*!40000 ALTER TABLE `playable_instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(300) NOT NULL,
  `heart_cnt` int(11) NOT NULL,
  `is_complete` bit(1) NOT NULL,
  `is_delete` bit(1) NOT NULL,
  `is_public` bit(1) NOT NULL,
  `music` varchar(255) DEFAULT NULL,
  `prev_station_id` bigint(20) NOT NULL,
  `reg_time` datetime NOT NULL,
  `remain_depth` int(11) NOT NULL,
  `instrument_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `video_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKwqitlky3aq01g3xv64hkffhb` (`instrument_id`),
  KEY `FKk6c7hon64uvruqcdku2tgg6io` (`writer_id`),
  KEY `FKme4y4eirnipwc70eudbfgivmb` (`video_id`),
  CONSTRAINT `FKk6c7hon64uvruqcdku2tgg6io` FOREIGN KEY (`writer_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKme4y4eirnipwc70eudbfgivmb` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`),
  CONSTRAINT `FKwqitlky3aq01g3xv64hkffhb` FOREIGN KEY (`instrument_id`) REFERENCES `instrument` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (2,'하울의 움직이는 성을 야외에서 촬영해 보았습니다! 많은 스택 쌓아주세요~~',4,_binary '\0',_binary '\0',_binary '','인생의 회전목마',-1,'2023-02-16 15:00:19',3,3,4,1),(3,'LG 세탁기 끝나는 소리를 리코더로 연주했습니다!!',4,_binary '\0',_binary '\0',_binary '','LG 세탁기 끝나는 소리',-1,'2023-02-16 15:01:49',3,1,6,2),(4,'인생의 회전목마에 오르골 넣어 보았습니다! 잘 어울리네요..~~',7,_binary '\0',_binary '\0',_binary '','인생의 회전목마',2,'2023-02-16 15:03:34',2,4,12,3),(5,'고백을 통기타로 즐겨보세요~~ ',0,_binary '',_binary '\0',_binary '','고백 - 뜨거운 감자',-1,'2023-02-16 15:08:23',3,5,2,4),(6,'오 필승 코리아를 칼림바로 연주해 보았습니다!! 많이 들어주세요~',1,_binary '',_binary '\0',_binary '','[칼림바 전체 연주] 오 필승 코리아',-1,'2023-02-16 15:14:03',3,6,14,5),(7,'칼림바 15초 영상을 요청받아서 올립니다! 멋진 스택 쌓아주세요!!',3,_binary '\0',_binary '\0',_binary '','[칼림바 15초 연주] 오 필승 코리아',-1,'2023-02-16 15:15:36',3,6,14,6),(8,'칼림바 10초 영상을 많은 분들이 요청해주셔서 올립니다! 많은 스택 기대할께요!!!!!!!!!!!!',3,_binary '\0',_binary '\0',_binary '','[칼림바 10초 영상] 오 필승 코리아',-1,'2023-02-16 15:17:06',3,6,14,7),(9,'요즘 핫한 영상, 사건의 지평선을 일렉기타로 연주해보았습니다.',2,_binary '\0',_binary '\0',_binary '','사건의 지평선',-1,'2023-02-16 15:21:20',3,7,7,8),(10,'라벨 볼레로 바순 솔로',3,_binary '',_binary '\0',_binary '','  Ravel Bolero Bassoon Solo.',-1,'2023-02-16 15:24:57',3,8,13,9),(11,'드럼 리듬입니다. 세상에서 제일 유명한 한마디 리듬인데.. 다들 아시겠죠? ㅎㅎ',2,_binary '\0',_binary '\0',_binary '','드럼 리듬',-1,'2023-02-16 15:33:20',3,10,5,10),(12,'펜 비트입니다. 수업 듣다가 너무 심심해서 재능낭비 해봤습니다. 재밌게 들어주세요 ^^',1,_binary '',_binary '\0',_binary '','펜 비트',-1,'2023-02-16 15:34:47',3,12,5,11),(13,'2초만 들어도 알 수 있는 명곡!',0,_binary '\0',_binary '\0',_binary '','We will rock you',-1,'2023-02-16 15:35:13',3,12,9,12),(14,'Rock n roll 🤘🤘🤘',0,_binary '\0',_binary '\0',_binary '','Rock n roll',-1,'2023-02-16 15:40:31',3,13,9,13),(15,'하프 연주 듣고 가세요 𓏢',0,_binary '',_binary '\0',_binary '','Reminiscence',-1,'2023-02-16 15:45:33',3,15,1,14),(16,'아주 기깔나는 통기타 연주 준비해 보았습니다~ 2초만 들어도 어디선가 들어본 거 같지 않나요?',0,_binary '\0',_binary '\0',_binary '','통기타 연주!',-1,'2023-02-16 15:49:29',3,5,2,15),(17,'변하지 않는 것 cover 영상입니다. 제 목소리에 스택을 쌓아주세요~',0,_binary '\0',_binary '\0',_binary '','변하지 않는 것',-1,'2023-02-16 17:06:15',3,16,15,16),(18,'왕왕왕 왕벌의 비행을 초고난도로 올려서 연주합시다~~',1,_binary '\0',_binary '\0',_binary '','왕벌의 비행',-1,'2023-02-16 17:19:49',3,3,4,17),(19,'제주도 해변에서 한번 연주해 보았습니다~ 제주도 푸른 밤 다 함께 떠나요~~',1,_binary '',_binary '\0',_binary '','제주도 푸른 밤',-1,'2023-02-16 17:25:59',3,17,16,18),(20,'기타 연주를 얹어봤습니다 ~',0,_binary '',_binary '\0',_binary '','변하지 않는 것',17,'2023-02-16 17:31:51',2,5,14,19),(21,'기타 연주를 쌓았습니다~',0,_binary '\0',_binary '\0',_binary '','변하지 않는 것',17,'2023-02-16 17:44:43',2,5,14,20),(22,'오카리나를 샀어요!',0,_binary '\0',_binary '\0',_binary '','오카리나 테스트',-1,'2023-02-16 17:47:22',3,11,17,21),(23,'테스트',0,_binary '\0',_binary '\0',_binary '','오카리나 테스트',22,'2023-02-16 17:50:43',2,11,17,22),(24,'리코더 전문가의 연주를 봐라',0,_binary '\0',_binary '\0',_binary '','반짝반짝 작은별',-1,'2023-02-16 17:57:06',3,1,12,23);
/*!40000 ALTER TABLE `station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1wdpsed5kna2y38hnbgrnhi5b` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (20,'RockNRoll'),(23,'가수'),(7,'고백'),(28,'기타'),(31,'내가짱'),(14,'드럼'),(15,'리듬'),(30,'리코더'),(24,'미친연주'),(12,'바순'),(32,'반짝반짝'),(22,'변하지않는것'),(11,'사건의지평선'),(4,'세탁기'),(27,'시간을달리는소녀'),(9,'애국'),(5,'오르골'),(29,'오카리나'),(16,'유명'),(2,'인생의회전목마'),(10,'일렉'),(18,'재능낭비'),(26,'제주도푸른밤'),(19,'젬베'),(8,'칼림바'),(13,'클래식'),(6,'통기타'),(25,'트럼펫'),(17,'펜비트'),(3,'피아노'),(21,'하프');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_list`
--

DROP TABLE IF EXISTS `tag_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `station_id` bigint(20) DEFAULT NULL,
  `tag_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlnry2sybjy6iwxrkou2459dld` (`station_id`),
  KEY `FKhoqt995ervjyctpx87lj0xl40` (`tag_id`),
  CONSTRAINT `FKhoqt995ervjyctpx87lj0xl40` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKlnry2sybjy6iwxrkou2459dld` FOREIGN KEY (`station_id`) REFERENCES `station` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_list`
--

LOCK TABLES `tag_list` WRITE;
/*!40000 ALTER TABLE `tag_list` DISABLE KEYS */;
INSERT INTO `tag_list` VALUES (2,2,2),(3,2,3),(4,3,4),(5,4,2),(6,4,5),(7,5,6),(8,5,7),(9,6,8),(10,6,9),(11,7,9),(12,7,8),(13,8,9),(14,8,8),(15,9,10),(16,9,11),(17,10,12),(18,10,13),(19,11,14),(20,11,15),(21,11,16),(22,12,17),(23,12,18),(24,13,17),(25,14,19),(26,14,20),(27,15,21),(28,16,6),(29,17,22),(30,17,23),(31,18,3),(32,18,24),(33,19,25),(34,19,26),(35,20,22),(36,20,27),(37,20,28),(38,21,27),(39,21,22),(40,21,28),(41,22,29),(42,23,29),(43,24,30),(44,24,31),(45,24,32);
/*!40000 ALTER TABLE `tag_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `video_path` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'202302161500swany0509','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/outsidepiano.mp4'),(2,'202302161501gonjelly','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/lgrecordersound.mp4'),(3,'202302161503musclewinner','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/8257ad16d1aa1a7e.mp4'),(4,'202302161508guitarman','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/tongguitar.mp4'),(5,'202302161514ansuqueen','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/calimbatest.mp4'),(6,'202302161515ansuqueen','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/testtest.mp4'),(7,'202302161517ansuqueen','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/testtest10.mp4'),(8,'202302161521cometstrike','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/yoonhaillek.mp4'),(9,'202302161524kiminheok','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/basoon.mp4'),(10,'202302161533manduthecat','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/drumsound.mp4'),(11,'202302161534manduthecat','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/penbit.mp4'),(12,'202302161535sytakkk','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/penbitsmall.mp4'),(13,'202302161540sytakkk','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/rocknrolldjembe.mp4'),(14,'202302161545muscleman','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/harp.mp4'),(15,'202302161549guitarman','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/gotfovack.mp4'),(16,'202302161706queensinger','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/songsinger.mp4'),(17,'202302161719swany0509','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/beeflying.mp4'),(18,'202302161725iluvtrumphet','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/trumphet.mp4'),(19,'202302161731ansuqueen','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/79c2cf5e-fe5e-4cd2-95ae-e4049eb957b4_E_C_M.mp4'),(20,'202302161744ansuqueen','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/79b1c1c5-8bf5-4f58-a655-6977c0290e01_E_C_M.mp4'),(21,'202302161747leaderj','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/5b8c7ca6-863b-41ca-977a-f2ec0280b62f_E_C.mp4'),(22,'202302161750leaderj','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/022f3aaf-ebef-4289-ba13-ca5594a33785_E_C_M.mp4'),(23,'202302161757musclewinner','https://s3.ap-northeast-2.amazonaws.com/stackers.bucket/static/videos/a35b75ff-978c-4784-b522-81162abd5f07_E_C.mp4');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 18:04:17
