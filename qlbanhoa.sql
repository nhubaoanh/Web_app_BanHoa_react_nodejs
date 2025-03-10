-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: qlbanhoa
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Current Database: `qlbanhoa`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `qlbanhoa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `qlbanhoa`;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `MaAdmin` int NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) DEFAULT NULL,
  `TenDangNhap` varchar(50) DEFAULT NULL,
  `MatKhau` varchar(255) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `QuyenHan` enum('quanly','nhanvien') DEFAULT 'nhanvien',
  `TrangThai` tinyint DEFAULT '1',
  PRIMARY KEY (`MaAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Quản Lý A','admin1','123456','admin@example.com','0901234567','quanly',1),(2,'Nhân Viên B','staff1','123456','staff@example.com','0912345678','nhanvien',1),(3,'Quản Lý C','admin2','654321','admin2@example.com','0902345678','quanly',1),(4,'Nhân Viên D','staff2','654321','staff2@example.com','0913456789','nhanvien',1),(5,'Quản Lý E','admin3','abcdef','admin3@example.com','0904567890','quanly',1),(6,'Nhân Viên F','staff3','abcdef','staff3@example.com','0914567890','nhanvien',1),(7,'Quản Lý G','admin4','123abc','admin4@example.com','0905678901','quanly',1),(8,'Nhân Viên H','staff4','123abc','staff4@example.com','0915678902','nhanvien',1),(9,'Quản Lý I','admin5','qwerty','admin5@example.com','0906789012','quanly',1),(10,'Nhân Viên J','staff5','qwerty','staff5@example.com','0916789013','nhanvien',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `MaChiTiet` int NOT NULL AUTO_INCREMENT,
  `MaDonHang` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `GiaBan` decimal(10,2) DEFAULT NULL,
  `ThanhTien` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`MaChiTiet`),
  KEY `MaDonHang` (`MaDonHang`),
  KEY `MaSanPham` (`MaSanPham`),
  CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`MaDonHang`) REFERENCES `donhang` (`MaDonHang`),
  CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (11,1,1,2,50000.00,100000.00),(12,1,3,1,30000.00,30000.00),(13,2,2,1,120000.00,120000.00),(14,2,5,2,70000.00,140000.00),(15,3,3,3,30000.00,90000.00),(16,3,7,1,25000.00,25000.00),(17,4,4,2,40000.00,80000.00),(18,4,6,1,80000.00,80000.00),(19,5,1,3,50000.00,150000.00),(20,6,9,1,100000.00,100000.00);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdonhangnhap`
--

DROP TABLE IF EXISTS `chitietdonhangnhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhangnhap` (
  `MaChiTietNhap` int NOT NULL AUTO_INCREMENT,
  `MaDonNhap` int DEFAULT NULL,
  `MaSanPham` int DEFAULT NULL,
  `SoLuong` int DEFAULT NULL,
  `GiaNhap` decimal(10,2) DEFAULT NULL,
  `ThanhTien` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`MaChiTietNhap`),
  KEY `MaDonNhap` (`MaDonNhap`),
  KEY `MaSanPham` (`MaSanPham`),
  CONSTRAINT `chitietdonhangnhap_ibfk_1` FOREIGN KEY (`MaDonNhap`) REFERENCES `donhangnhap` (`MaDonNhap`),
  CONSTRAINT `chitietdonhangnhap_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanpham` (`MaSanPham`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhangnhap`
--

LOCK TABLES `chitietdonhangnhap` WRITE;
/*!40000 ALTER TABLE `chitietdonhangnhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietdonhangnhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MaDonHang` int NOT NULL AUTO_INCREMENT,
  `MaKhachHang` int DEFAULT NULL,
  `NgayDatHang` datetime DEFAULT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `TrangThai` enum('Cho xu ly','dang giao','hoan thanh','da huy') DEFAULT 'Cho xu ly',
  PRIMARY KEY (`MaDonHang`),
  KEY `MaKhachHang` (`MaKhachHang`),
  CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`MaKhachHang`) REFERENCES `khachhang` (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,1,'2025-02-18 14:23:11',150000.00,'Cho xu ly'),(2,2,'2025-02-18 14:23:11',120000.00,'dang giao'),(3,3,'2025-02-18 14:23:11',100000.00,'hoan thanh'),(4,4,'2025-02-18 14:23:11',200000.00,'da huy'),(5,5,'2025-02-18 14:23:11',180000.00,'Cho xu ly'),(6,6,'2025-02-18 14:23:11',160000.00,'dang giao'),(7,7,'2025-02-18 14:23:11',220000.00,'hoan thanh'),(8,8,'2025-02-18 14:23:11',250000.00,'da huy'),(9,9,'2025-02-18 14:23:11',270000.00,'Cho xu ly'),(10,10,'2025-02-18 14:23:11',240000.00,'dang giao');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhangnhap`
--

DROP TABLE IF EXISTS `donhangnhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhangnhap` (
  `MaDonNhap` int NOT NULL AUTO_INCREMENT,
  `MaNhaCungCap` int DEFAULT NULL,
  `MaNhanVien` int DEFAULT NULL,
  `NgayNhap` datetime DEFAULT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `TrangThai` enum('cho nhap','da nhap','da huy') DEFAULT 'cho nhap',
  PRIMARY KEY (`MaDonNhap`),
  KEY `MaNhaCungCap` (`MaNhaCungCap`),
  KEY `MaNhanVien` (`MaNhanVien`),
  CONSTRAINT `donhangnhap_ibfk_1` FOREIGN KEY (`MaNhaCungCap`) REFERENCES `nhacungcap` (`MaNhaCungCap`),
  CONSTRAINT `donhangnhap_ibfk_2` FOREIGN KEY (`MaNhanVien`) REFERENCES `nhanvien` (`MaNhanVien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhangnhap`
--

LOCK TABLES `donhangnhap` WRITE;
/*!40000 ALTER TABLE `donhangnhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `donhangnhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MaKhachHang` int NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `NgayTao` datetime DEFAULT NULL,
  PRIMARY KEY (`MaKhachHang`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1,'Nguyễn Văn A','0987654321','nguyenvana@example.com','Hà Nội','2025-02-18 14:21:46'),(2,'Trần Thị B','0976543210','tranthib@example.com','TP HCM','2025-02-18 14:21:46'),(3,'Lê Văn C','0965432109','levanc@example.com','Đà Nẵng','2025-02-18 14:21:46'),(4,'Phạm Thị D','0954321098','phamthid@example.com','Cần Thơ','2025-02-18 14:21:46'),(5,'Nguyễn Hoàng E','0943210987','nguyenhoange@example.com','Hải Phòng','2025-02-18 14:21:46'),(6,'Lê Minh F','0932109876','leminhf@example.com','Hà Nội','2025-02-18 14:21:46'),(7,'Trần Hoàng G','0921098765','tranhoangg@example.com','Đà Nẵng','2025-02-18 14:21:46'),(8,'Nguyễn Thị H','0910987654','nguyenthih@example.com','TP HCM','2025-02-18 14:21:46'),(9,'Phan Thi K','0909876543','phanthik@example.com','Cần Thơ','2025-02-18 14:21:46'),(10,'Hoàng Minh L','0898765432','hoangminhl@example.com','Hải Phòng','2025-02-18 14:21:46');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyenmai`
--

DROP TABLE IF EXISTS `khuyenmai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyenmai` (
  `MaKhuyenMai` int NOT NULL AUTO_INCREMENT,
  `TenKhuyenMai` varchar(100) DEFAULT NULL,
  `GiamGia` decimal(5,2) DEFAULT NULL,
  `NgayBatDau` date DEFAULT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `TrangThai` tinyint DEFAULT '1',
  PRIMARY KEY (`MaKhuyenMai`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyenmai`
--

LOCK TABLES `khuyenmai` WRITE;
/*!40000 ALTER TABLE `khuyenmai` DISABLE KEYS */;
INSERT INTO `khuyenmai` VALUES (1,'Tết Giảm Giá',10.00,'2025-02-01','2025-02-15',1),(2,'Valentine Sale',15.00,'2025-02-10','2025-02-20',1),(3,'Khuyến Mãi Mùa Xuân',20.00,'2025-03-01','2025-03-15',1),(4,'Giảm Giá Hè',25.00,'2025-06-01','2025-06-30',1),(5,'Giảm Giá Cuối Năm',30.00,'2025-12-01','2025-12-31',1),(6,'Giảm Giá Đặc Biệt',40.00,'2025-04-01','2025-04-15',1),(7,'Khuyến Mãi Black Friday',50.00,'2025-11-01','2025-11-30',1),(8,'Giảm Giá Tết Trung Thu',10.00,'2025-09-01','2025-09-15',1),(9,'Giảm Giá Lễ Tạ Ơn',15.00,'2025-10-01','2025-10-15',1),(10,'Khuyến Mãi Mới',5.00,'2025-01-01','2025-01-15',1);
/*!40000 ALTER TABLE `khuyenmai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaihoa`
--

DROP TABLE IF EXISTS `loaihoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaihoa` (
  `MaLoaiHoa` int NOT NULL AUTO_INCREMENT,
  `TenLoaiHoa` varchar(100) DEFAULT NULL,
  `MoTa` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`MaLoaiHoa`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaihoa`
--

LOCK TABLES `loaihoa` WRITE;
/*!40000 ALTER TABLE `loaihoa` DISABLE KEYS */;
INSERT INTO `loaihoa` VALUES (1,'Hoa Hồng','Hoa hồng đủ loại màu sắc'),(2,'Hoa Lan','Hoa lan cao cấp'),(3,'Hoa Cúc','Hoa cúc trắng và vàng'),(4,'Hoa Cẩm Chướng','Hoa cẩm chướng màu đỏ, hồng, trắng'),(5,'Hoa Tulip','Hoa tulip nhiều màu sắc'),(6,'Hoa Sen','Hoa sen thanh khiết'),(7,'Hoa Dã Quỳ','Hoa dã quỳ vàng rực rỡ'),(8,'Hoa Mẫu Đơn','Hoa mẫu đơn hồng, đỏ, trắng'),(9,'Hoa Cẩm Tú Cầu','Hoa cẩm tú cầu nhiều màu sắc'),(10,'Hoa Anh Đào','Hoa anh đào màu hồng nhẹ');
/*!40000 ALTER TABLE `loaihoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `MaNhaCungCap` int NOT NULL AUTO_INCREMENT,
  `TenNhaCungCap` varchar(100) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `GhiChu` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MaNhaCungCap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `MaNhanVien` int NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) DEFAULT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MatKhau` varchar(255) DEFAULT NULL,
  `TrangThai` tinyint DEFAULT '1',
  PRIMARY KEY (`MaNhanVien`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES (1,'Nguyen Thi Lan','0123456789','lan.nguyen@example.com','password123',1),(2,'Tran Minh Tuan','0987654321','tuan.tran@example.com','password123',1),(3,'Le Thanh Son','0912345678','son.le@example.com','password123',1),(4,'Pham Minh Hoang','0934567890','hoang.pham@example.com','password123',1),(5,'Vu Thi Bich','0908765432','bich.vu@example.com','password123',1),(6,'Nguyen Tuan Anh','0988777666','tuananh.nguyen@example.com','password123',1),(7,'Nguyen Thi Kim','0912233445','kim.nguyen@example.com','password123',1),(8,'Hoang Thi Lan','0986543210','lan.hoang@example.com','password123',1),(9,'Pham Minh Bao','0909876543','bao.pham@example.com','password123',1),(10,'Nguyen Thi Hoa','0933222334','hoa.nguyen@example.com','password123',1);
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MaSanPham` int NOT NULL AUTO_INCREMENT,
  `TenHoa` varchar(100) DEFAULT NULL,
  `MaLoaiHoa` int DEFAULT NULL,
  `GiaBan` decimal(10,2) DEFAULT NULL,
  `SoLuongTon` int DEFAULT '0',
  `MoTa` varchar(500) DEFAULT NULL,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `TrangThai` tinyint DEFAULT '1',
  `NgayThem` datetime DEFAULT NULL,
  PRIMARY KEY (`MaSanPham`),
  KEY `MaLoaiHoa` (`MaLoaiHoa`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaLoaiHoa`) REFERENCES `loaihoa` (`MaLoaiHoa`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Hoa Hồng Đỏ',1,50000.00,100,'Hoa hồng nhập khẩu','hong_do.jpg',1,'2025-02-18 14:22:15'),(2,'Hoa Lan Tím',2,120000.00,50,'Hoa lan màu tím','lan_tim.jpg',1,'2025-02-18 14:22:15'),(3,'Hoa Cúc Trắng',3,30000.00,200,'Hoa cúc trắng đẹp','cuc_trang.jpg',1,'2025-02-18 14:22:15'),(4,'Hoa Cẩm Chướng Đỏ',4,40000.00,150,'Hoa cẩm chướng đỏ tươi','cam_chuong_do.jpg',1,'2025-02-18 14:22:15'),(5,'Hoa Tulip Đỏ',5,70000.00,80,'Hoa tulip đỏ rực rỡ','tulip_do.jpg',1,'2025-02-18 14:22:15'),(6,'Hoa Sen Trắng',6,80000.00,60,'Hoa sen trắng thuần khiết','sen_trang.jpg',1,'2025-02-18 14:22:15'),(7,'Hoa Dã Quỳ Vàng',7,25000.00,120,'Hoa dã quỳ vàng tươi','da_quy_vang.jpg',1,'2025-02-18 14:22:15'),(8,'Hoa Mẫu Đơn Đỏ',8,60000.00,40,'Hoa mẫu đơn đỏ rực','mau_don_do.jpg',1,'2025-02-18 14:22:15'),(9,'Hoa Cẩm Tú Cầu Xanh',9,50000.00,150,'Hoa cẩm tú cầu xanh mát','cam_tu_cau_xanh.jpg',1,'2025-02-18 14:22:15'),(10,'Hoa Anh Đào Hồng',10,100000.00,90,'Hoa anh đào hồng nhẹ nhàng','anh_dao_hong.jpg',1,'2025-02-18 14:22:15'),(11,'Hoa Hồng Đỏ máu quá ',1,9990000.00,100,'Hoa hồng nhập khẩu','hong_do.jpg',1,'2025-02-18 14:22:15');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-10 10:48:45
