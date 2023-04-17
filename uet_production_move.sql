-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 30, 2022 lúc 05:06 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `uet_production_move`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roleKey` varchar(255) DEFAULT NULL,
  `workplaceID` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `roleKey`, `workplaceID`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'dung1', 'U2FsdGVkX18/MtoKuvpcmLUDrn45XJMGsTncLhtHUY8=', 'R1', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'kha1', 'U2FsdGVkX1/lrXwLKGDORYQlEMzHWCB0nq9Vd5mbsV8=', 'R1', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'quang1', 'U2FsdGVkX1+lfvauwyXAyl4ayc3NTIkxLGOlQU6THLU=', 'R1', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 'dungAgent1', 'U2FsdGVkX1/OLngtbmi4x09hIuhs7Shi6cB4opaxGVg=', 'R3', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 'quangAgent1', 'U2FsdGVkX1/PBdf6F0+rW4s1lRJeYQvolNItYUEUTTA=', 'R3', 2, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 'khaAgent1', 'U2FsdGVkX189VXLsN9Cg5Tj00VtOO4C5k+mpZrzhZ7A=', 'R3', 3, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 'dungFactory1', 'U2FsdGVkX19rZ4nEi4lsD10RtQuHgLaBfK3Hsmhd6cA=', 'R2', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 'quangFactory1', 'U2FsdGVkX18i4qwu93HZ+fe6xXb0BKWs5+iZEGb/umM=', 'R2', 2, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 'khaFactory1', 'U2FsdGVkX19Ms8LPCtxxRxMlJmf6HwMK+7N9HO0iba8=', 'R2', 3, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 'dungInsurance1', 'U2FsdGVkX1/xafNtnlsHnAaXOhOT8CESLU9yRKow0mPBcu5bzv7ksFBifQWRyifm', 'R4', 1, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 'quangInsurance1', 'U2FsdGVkX19stdjLCDifwo/00FxhkE+rXMM4txLs69c=', 'R4', 2, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 'khaInsurance1', 'U2FsdGVkX1+5hYGd76T7y7jawe2/I3h4wHfA1ljHbMQ=', 'R4', 3, '', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `agents`
--

CREATE TABLE `agents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `agents`
--

INSERT INTO `agents` (`id`, `name`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Đại lý DellCorp Cầu Giấy', '32 Đ.Cầu Giấy - Cầu Giấy - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'Đại lý DellCorp Hồ Tùng Mậu', '1 Đ.Hồ Tùng Mậu - Cầu Giấy - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'Đại lý DellCorp Thanh Xuân', '260 Đ.Nguyễn Trãi - Thanh Xuân - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `sdt` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `name`, `sdt`, `email`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'N.A', '0123456789', 'dungn8979@gmail.com', '34 Đ.Cầu Giấy - Cầu Giấy - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'H.B', '0123456788', 'pvtdung0612@gmail.com', '5 Đ.Hồ Tùng Mậu - Cầu Giấy - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'P.C', '0123456787', 'dungnnn8979@gmail.com', '280 Đ.Nguyễn Trãi - Thanh Xuân - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `errorreports`
--

CREATE TABLE `errorreports` (
  `id` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `errorreports`
--

INSERT INTO `errorreports` (`id`, `customerID`, `productID`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 'Khách hàng báo lỗi màn hình không hiển thị', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 2, 6, 'Khách hàng báo lỗi bàn phím không sử dụng được', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 3, 12, 'Khách hàng báo lỗi màn hình xanh', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 3, 14, 'Khách hàng báo lỗi máy không hoạt động', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 1, 17, 'Khách hàng báo lỗi màn hình không hiển thị', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 2, 21, 'Khách hàng báo lỗi bàn phím không sử dụng được', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 3, 27, 'Khách hàng báo lỗi màn hình xanh', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 3, 29, 'Khách hàng báo lỗi máy không hoạt động', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 1, 31, 'Khách hàng báo lỗi máy nứt nhẹ', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 1, 32, 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 1, 33, 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 1, 34, 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `factories`
--

CREATE TABLE `factories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `factories`
--

INSERT INTO `factories` (`id`, `name`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'Nhà Máy Hà Đông cơ sở 1', '1 Hà Đông - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'Nhà Máy Gia Lâm cơ sở 1', '1 Gia Lâm - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'Nhà Máy Đông Anh cơ sở 1', '1 Đông Anh - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `insurancecenters`
--

CREATE TABLE `insurancecenters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `insurancecenters`
--

INSERT INTO `insurancecenters` (`id`, `name`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'TTBH Cầu Giấy', '1 Cầu Giấy - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'TTBH Hồ Tùng Mậu', '32 Hồ Tùng Mậu - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'TTBH Thanh Xuân', '260 Thanh Xuân - Hà Nội', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `insurances`
--

CREATE TABLE `insurances` (
  `id` int(11) NOT NULL,
  `insuranceCenterID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `errorReportsID` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `insurances`
--

INSERT INTO `insurances` (`id`, `insuranceCenterID`, `productID`, `errorReportsID`, `startDate`, `endDate`, `result`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 1, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'sửa lỗi main hình cho khách', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 2, 6, 2, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'sửa lỗi bàn phím không sử dụng được', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 3, 12, 3, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'sửa lỗi màn hình xanh', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 3, 14, 4, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'FAILURE', 'sửa lỗi máy không hoạt động', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 1, 17, 5, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'Khách hàng báo lỗi màn hình không hiển thị', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 2, 21, 6, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'sửa lỗi bàn phím không sử dụng được', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 3, 27, 7, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'sửa lỗi màn hình xanh', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 3, 29, 8, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'FAILURE', 'sửa lỗi máy không hoạt động', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 1, 31, 9, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'FAILURE', 'sửa lỗi máy nứt nhẹ', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 1, 32, 10, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'FAILURE', 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 1, 33, 11, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'SUCCESS', 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 1, 34, 12, '2022-12-30 22:56:28', '2023-01-02 22:56:28', 'FAILURE', 'Khách hàng báo lỗi máy vỡ màn hình, bàn phím, thân máy', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `productlines`
--

CREATE TABLE `productlines` (
  `id` int(11) NOT NULL,
  `productLine` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `cpu` varchar(255) DEFAULT NULL,
  `screen` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `productlines`
--

INSERT INTO `productlines` (`id`, `productLine`, `price`, `cpu`, `screen`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'XPS 13 Plus 9320', '59.490.000₫', 'i71260P2.1GHz', '13.4\"3.5K (3456 x 2160) - OLED', 'Dài 295.3 mm - Rộng 199 mm - Dày 15.28 mm - Nặng 1.26 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'XPS 13 9320', '46.590.000₫', 'i71260P2.1GHz', '13.4\"3.5K (3456 x 2160) - OLED', 'Dài 295.3 mm - Rộng 199 mm - Dày 15.28 mm - Nặng 1.26 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'XPS 13 9310', '39.990.000₫', 'i51135G72.4GHz', '13.4\"Full HD+ (1920 x 1200)', 'Dài 295 mm - Rộng 198 mm - Dày 14.8 mm - Nặng 1.2 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 'Alienware m15 R6A', '61.640.000₫', 'i711800H2.30 GHz', '15.6\"QHD (2560 x 1440)240Hz', 'Dài 356 mm - Rộng 272 mm - Dày 19 mm - Nặng 2.69 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 'Alienware m15 R6B', '61.490.000₫', 'i711800H2.30 GHz', '15.6\"Full HD (1920 x 1080) 165Hz', 'Dài 356.2 mm - Rộng 272.5 mm - Dày 19.2 mm - Nặng 2.69 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 'Gaming G15 5515 R5', '23.090.000₫', 'Ryzen 55600H3.3GHz', '15.6\"Full HD (1920 x 1080) 120Hz', 'Dài 357.26 mm - Rộng 272.11 mm - Dày 26.9 mm - Nặng 2.8 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 'Gaming G15 5511', '25.490.000₫', 'Ryzen 55600H3.3GHz', '15.6\"Full HD (1920 x 1080) 120Hz', 'Dài 357 mm - Rộng 272 mm - Dày 25 mm - Nặng 2.81 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 'Gaming G15 5515 R7', '27.910.000₫', 'Ryzen 75800H3.2GHz', '15.6\"Full HD (1920 x 1080) 120Hz', 'Dài 357 mm - Rộng 272 mm - Dày 25 mm - Nặng 2.81 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 'Gaming G15 5515 R6', '20.090.000₫', 'Ryzen 55600H3.3GHz', '15.6\"Full HD (1920 x 1080) 120Hz', 'Dài 357.26 mm - Rộng 272.11 mm - Dày 26.9 mm - Nặng 2.8 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 'Inspiron 15 3511', '12.090.000₫', 'i31115G43GHz', '15.6\"Full HD (1920 x 1080)', 'Dài 358.5 mm - Rộng 235.5 mm - Dày 18.9 mm - Nặng 1.7 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 'Inspiron 16 5620', '24.690.000₫', 'i71255U1.7GHz', '16\"Full HD+ (1920 x 1200)', 'Dài 356.7 mm - Rộng 251.9 mm - Dày 17.95 mm - Nặng 1.87 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 'Vostro 3510', '19.590.000₫', 'i51135G72.4GHz', '15.6\"Full HD (1920 x 1080)', 'Dài 358.5 mm - Rộng 235.5 mm - Dày 18.9 mm - Nặng 1.69 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(13, 'Vostro 5410', '20.690.000₫', 'i511320H3.2GHz', '14\"Full HD (1920 x 1080)', 'Dài 321.2 mm - Rộng 212.8 mm - Dày 17.9 mm - Nặng 1.44 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(14, 'Vostro 5620', '21.790.000₫', 'i51240P1.7GHz', '16\"Full HD+ (1920 x 1200)', 'Dài 356 mm - Rộng 252 mm - Dày 18 mm - Nặng 1.97 kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(15, 'Latitude 3520', '22.890.000₫', 'i51135G72.4GHz', '15.6\"Full HD (1920 x 1080)', 'Dài 361 mm - Rộng 240.9 mm - Dày 18 mm - Nặng 1.79 Kg', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `bornDate` datetime NOT NULL,
  `factoryID` int(11) DEFAULT NULL,
  `agentID` int(11) DEFAULT NULL,
  `insurancecenterID` int(11) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `hereRole` varchar(255) DEFAULT NULL,
  `hereID` int(11) DEFAULT NULL,
  `productLine` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `bornDate`, `factoryID`, `agentID`, `insurancecenterID`, `status`, `hereRole`, `hereID`, `productLine`, `createdAt`, `updatedAt`) VALUES
(1, 'Laptop Dell XPS 13 Plus 9320 i7 1260P/16GB/512GB/Touch/Cap/OfficeHS/Win11 (5CG56)', '2022-12-30 22:56:28', 1, 1, NULL, 'Đã bán', 'R5', 1, 'XPS 13 Plus 9320', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 'Laptop Dell XPS 13 9320 i5 1240P/16GB/512GB/Touch/Cáp/OfficeHS/Win11 (70295789)', '2022-12-30 22:56:28', 1, 1, 1, 'Đã bảo hành xong', 'R3', 1, 'XPS 13 9320', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 'Laptop Dell XPS 13 9310 i5 1135G7/8GB/512GB/Cáp/Office H&S/Win11 (70273578)', '2021-12-14 07:00:00', 1, NULL, NULL, 'Mới sản xuất', 'R2', 1, 'XPS 13 9310', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 'Laptop Dell: Hiển thị sp đang ở Đại lý và sp ở khách hàng đã đc đại lý hiện tại bán', '2022-12-30 22:56:28', 1, 1, NULL, 'Đưa về đại lý', 'R3', 1, 'Alienware m15 R6A', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 'Laptop Dell Gaming Alienware m15 R6 i7 11800H/32GB/1TB SSD/6GB RTX3060/165Hz/Office H&S/Win11 (P109F001DBL)', '2022-07-15 07:00:00', 1, NULL, NULL, 'Mới sản xuất', 'R2', 1, 'Alienware m15 R6B', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 'Laptop Dell Gaming G15 5515 R5 5600H/16GB/512GB/4GB RTX3050/120Hz/OfficeHS/Win11 (P105F004DGR)', '2022-12-30 22:56:28', 2, 2, 2, 'Đã bảo hành xong', 'R3', 2, 'Gaming G15 5515 R5', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 'Laptop Dell Gaming G15 5511 i5 11400H/8GB/256GB/4GB RTX3050/120Hz/OfficeHS/Win11 (70266676)', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Gaming G15 5511', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 'Laptop Dell Gaming G15 5515 R7 5800H/8GB/512GB/4GB RTX3050/120Hz/Office H&S/Win11 (70266674)', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'aming G15 5515 R7', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 'Laptop Dell Gaming G15 5515 R5 5600H/8GB/256GB/4GB RTX3050/120Hz/OfficeHS/Win11 (P105F004CGR)', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Gaming G15 5515 R6', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 'Laptop Dell Inspiron 15 3511 i3 1115G4/4GB/256GB/Office H&S/Win11 (P112F001CBL)', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Inspiron 15 3511', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 'Laptop Dell Inspiron 16 5620 i7 1255U/8GB/512GB/OfficeHS/Win11 (N6I7110W1)', '2022-12-30 22:56:28', 2, NULL, NULL, 'Mới sản xuất', 'R2', 2, 'Inspiron 16 5620', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 'Laptop Dell Vostro 3510 i5 1135G7/8GB/512GB/2GB MX350/OfficeHS/Win11 (P112F002BBL) ', '2022-12-30 22:56:28', 3, 3, 3, 'Đã bảo hành xong', 'R3', 3, 'Vostro 3510', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(13, 'Laptop Dell Vostro 5410 i5 11320H/8GB/512GB/Office H&S/Win11 (V4I5214W1)', '2022-12-30 22:56:28', 3, 3, NULL, 'Đưa về đại lý', 'R3', 3, 'Vostro 5410', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(14, 'Laptop Dell Vostro 5620 i5 1240P/8GB/256GB/OfficeHS/Win11 (V6I5001W1)', '2022-12-30 22:56:28', 3, 3, 3, 'Lỗi, đã đưa về cơ sở sản xuất', 'R2', 3, 'Vostro 562', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(15, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (70251593)', '2022-12-30 22:56:28', 3, 3, NULL, 'Đưa về đại lý', 'R3', 3, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(16, 'Laptop Dell XPS 13 Plus 9320 i7 1260P/16GB/512GB/Touch/Cap/OfficeHS/Win11 (5CG56) pro2', '2022-12-30 22:56:28', 1, 1, NULL, 'Đã bán', 'R5', 1, 'XPS 13 Plus 9320', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(17, 'Laptop Dell XPS 13 9320 i5 1240P/16GB/512GB/Touch/Cáp/OfficeHS/Win11 (70295789) pro2', '2022-12-30 22:56:28', 1, 1, 1, 'Đã bảo hành xong', 'R3', 1, 'XPS 13 9320', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(18, 'Laptop Dell XPS 13 9310 i5 1135G7/8GB/512GB/Cáp/Office H&S/Win11 (70273578) pro2', '2022-12-30 22:56:28', 1, NULL, NULL, 'Mới sản xuất', 'R2', 1, 'XPS 13 9310', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(19, 'Laptop Dell Gaming Alienware m15 R6 i7 11800H/32GB/1TB SSD/8GB RTX3070/240Hz/OfficeHS/Win11 (70272633) pro2', '2022-12-30 22:56:28', 1, 1, NULL, 'Đưa về đại lý', 'R3', 1, 'Alienware m15 R6A', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(20, 'Laptop Dell Gaming Alienware m15 R6 i7 11800H/32GB/1TB SSD/6GB RTX3060/165Hz/Office H&S/Win11 (P109F001DBL) pro2', '2021-03-13 07:00:00', 1, NULL, NULL, 'Mới sản xuất', 'R2', 1, 'Alienware m15 R6B', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(21, 'Laptop Dell Gaming G15 5515 R5 5600H/16GB/512GB/4GB RTX3050/120Hz/OfficeHS/Win11 (P105F004DGR) pro2', '2022-12-30 22:56:28', 2, 2, 2, 'Đã bảo hành xong', 'R3', 2, 'Gaming G15 5515 R5', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(22, 'Laptop Dell Gaming G15 5511 i5 11400H/8GB/256GB/4GB RTX3050/120Hz/OfficeHS/Win11 (70266676) pro2', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Gaming G15 5511', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(23, 'Laptop Dell Gaming G15 5515 R7 5800H/8GB/512GB/4GB RTX3050/120Hz/Office H&S/Win11 (70266674) pro2', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'aming G15 5515 R7', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(24, 'Laptop Dell Gaming G15 5515 R5 5600H/8GB/256GB/4GB RTX3050/120Hz/OfficeHS/Win11 (P105F004CGR) pro2', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Gaming G15 5515 R6', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(25, 'Laptop Dell Inspiron 15 3511 i3 1115G4/4GB/256GB/Office H&S/Win11 (P112F001CBL) pro2', '2022-12-30 22:56:28', 2, 2, NULL, 'Đưa về đại lý', 'R3', 2, 'Inspiron 15 3511', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(26, 'Laptop Dell Inspiron 16 5620 i7 1255U/8GB/512GB/OfficeHS/Win11 (N6I7110W1) pro2', '2022-12-30 22:56:28', 2, NULL, NULL, 'Mới sản xuất', 'R2', 2, 'Inspiron 16 5620', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(27, 'Laptop Dell Vostro 3510 i5 1135G7/8GB/512GB/2GB MX350/OfficeHS/Win11 (P112F002BBL) pro2', '2022-12-30 22:56:28', 3, 3, 3, 'Đã bảo hành xong', 'R3', 3, 'Vostro 3510', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(28, 'Laptop Dell Vostro 5410 i5 11320H/8GB/512GB/Office H&S/Win11 (V4I5214W1) pro2', '2022-12-30 22:56:28', 3, 3, NULL, 'Đưa về đại lý', 'R3', 3, 'Vostro 5410', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(29, 'Laptop Dell Vostro 5620 i5 1240P/8GB/256GB/OfficeHS/Win11 (V6I5001W1) pro2', '2022-12-30 22:56:28', 3, 3, 3, ' Lỗi, đã đưa về cơ sở sản xuất', 'R2', 3, 'Vostro 562', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(30, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (70251593) pro2', '2022-12-30 22:56:28', 3, 3, NULL, 'Đưa về đại lý', 'R3', 3, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(31, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (999999999)', '2022-12-30 22:56:28', 1, 1, 1, 'Lỗi, cần trả về nhà máy', 'R4', 1, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(32, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (00000000)', '2022-12-30 22:56:28', 1, 1, 1, 'Lỗi, cần trả về nhà máy', 'R4', 1, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(33, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (33333333)', '2022-12-30 22:56:28', 1, 1, 1, 'Đang sửa chữa bảo hành', 'R4', 1, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(34, 'Laptop Dell Latitude 3520 i5 1135G7/8GB/256GB/Win10 Pro (444444444)', '2021-05-19 07:00:00', 1, 1, 1, 'Đang sửa chữa bảo hành', 'R4', 1, 'Latitude 3520', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sells`
--

CREATE TABLE `sells` (
  `id` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `sellDate` datetime DEFAULT NULL,
  `agentID` int(11) DEFAULT NULL,
  `insuranceTermEndDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `sells`
--

INSERT INTO `sells` (`id`, `customerID`, `productID`, `sellDate`, `agentID`, `insuranceTermEndDate`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2022-11-20 07:00:00', 1, '2023-05-20 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(2, 2, 16, '2022-11-15 07:00:00', 1, '2023-05-15 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(3, 1, 2, '2022-12-26 07:00:00', 1, '2023-06-26 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(4, 2, 6, '2022-12-29 07:00:00', 2, '2023-06-29 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(5, 3, 12, '2022-01-29 00:00:00', 3, '2023-07-29 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(6, 3, 14, '2022-03-29 00:00:00', 3, '2023-09-29 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(7, 1, 17, '2022-06-30 00:00:00', 1, '2023-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(8, 2, 21, '2022-06-30 00:00:00', 2, '2023-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(9, 3, 27, '2022-06-30 00:00:00', 3, '2022-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(10, 3, 29, '2022-06-30 00:00:00', 3, '2022-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(11, 1, 31, '2022-06-30 00:00:00', 1, '2022-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(12, 1, 32, '2022-06-30 00:00:00', 1, '2022-12-30 07:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(13, 1, 33, '2022-12-27 07:00:00', 1, '2023-06-27 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28'),
(14, 1, 34, '2022-12-30 07:00:00', 1, '2023-06-30 00:00:00', '2022-12-30 22:56:28', '2022-12-30 22:56:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-accounts.js'),
('create-agents.js'),
('create-customers.js'),
('create-errorreports.js'),
('create-factories.js'),
('create-insurancecenters.js'),
('create-insurances.js'),
('create-productlines.js'),
('create-products.js'),
('create-sells.js');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `errorreports`
--
ALTER TABLE `errorreports`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `factories`
--
ALTER TABLE `factories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `insurancecenters`
--
ALTER TABLE `insurancecenters`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `insurances`
--
ALTER TABLE `insurances`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `productlines`
--
ALTER TABLE `productlines`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sells`
--
ALTER TABLE `sells`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `agents`
--
ALTER TABLE `agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `errorreports`
--
ALTER TABLE `errorreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `factories`
--
ALTER TABLE `factories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `insurancecenters`
--
ALTER TABLE `insurancecenters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `insurances`
--
ALTER TABLE `insurances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `productlines`
--
ALTER TABLE `productlines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `sells`
--
ALTER TABLE `sells`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
