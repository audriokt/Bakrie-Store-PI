-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: bakrie-store
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id_cart` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `id_customer` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `carts_fk1_customer` (`id_customer`),
  CONSTRAINT `carts_fk1_customer` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id_customer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `address` varchar(300) NOT NULL,
  `phone_num` varchar(14) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id_employee` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` enum('admin','cashier') NOT NULL,
  PRIMARY KEY (`id_employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `item_carts`
--

DROP TABLE IF EXISTS `item_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_carts` (
  `id_item_cart` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `added_at` datetime(6) NOT NULL,
  `id_cart` varchar(100) NOT NULL,
  `id_product` varchar(100) NOT NULL,
  PRIMARY KEY (`id_item_cart`),
  KEY `item_carts_fk1_cart` (`id_cart`),
  KEY `item_carts_fk2_product` (`id_product`),
  CONSTRAINT `item_carts_fk1_cart` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id_cart`),
  CONSTRAINT `item_carts_fk2_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id_order_detail` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `id_order` varchar(100) NOT NULL,
  `id_product` varchar(100) NOT NULL,
  `id_cart` varchar(100) NOT NULL,
  PRIMARY KEY (`id_order_detail`),
  KEY `order_details_fk1_order` (`id_order`),
  KEY `order_details_fk2_product` (`id_product`),
  KEY `order_details_fk3_cart` (`id_cart`),
  CONSTRAINT `order_details_fk1_order` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`),
  CONSTRAINT `order_details_fk2_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `order_details_fk3_cart` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id_cart`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id_order` varchar(100) NOT NULL,
  `deliver_address` varchar(100) NOT NULL,
  `order_number` varchar(100) NOT NULL,
  `order_date` datetime(6) NOT NULL,
  `order_status` varchar(20) NOT NULL,
  `id_customer` varchar(100) NOT NULL,
  `id_employee` varchar(100) NOT NULL,
  PRIMARY KEY (`id_order`),
  KEY `order_fk1_customer` (`id_customer`),
  KEY `order_fk2_employee` (`id_employee`),
  CONSTRAINT `order_fk1_customer` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`),
  CONSTRAINT `order_fk2_employee` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id_employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` varchar(100) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_price` double(6,2) NOT NULL,
  `product_description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_stock` int NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id_transaction` varchar(100) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `payment_method` varchar(30) NOT NULL,
  `payment_date` datetime(6) NOT NULL,
  `total` decimal(7,2) NOT NULL,
  `id_customer` varchar(100) NOT NULL,
  `id_order` varchar(100) NOT NULL,
  PRIMARY KEY (`id_transaction`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `transactions_fk1_customer` (`id_customer`),
  KEY `transactions_fk2_order` (`id_order`),
  CONSTRAINT `transactions_fk1_customer` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id_customer`),
  CONSTRAINT `transactions_fk2_order` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-17  0:55:07
