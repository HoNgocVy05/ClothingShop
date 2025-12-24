-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 24, 2025 lúc 06:44 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `clothingshop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `size` enum('S','M','L','XL') NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `size`, `quantity`, `created_at`) VALUES
(7, 4, 63, 'M', 2, '2025-12-14 11:56:04'),
(10, 9, 44, 'XL', 2, '2025-12-21 16:12:29'),
(11, 9, 56, 'M', 1, '2025-12-21 16:15:56'),
(12, 9, 56, 'S', 1, '2025-12-21 16:18:46'),
(13, 9, 75, 'S', 4, '2025-12-23 17:54:48'),
(14, 9, 63, 'S', 2, '2025-12-23 17:54:54'),
(15, 9, 75, 'L', 1, '2025-12-23 17:55:42'),
(16, 9, 50, 'S', 1, '2025-12-23 17:56:49'),
(17, 9, 47, 'S', 1, '2025-12-23 17:57:07'),
(18, 9, 57, 'S', 3, '2025-12-23 18:02:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Nam', NULL, '2025-12-05 16:35:56', '2025-12-15 10:11:36'),
(2, 'Nữ', NULL, '2025-12-05 16:35:56', '2025-12-15 10:11:36'),
(4, 'Áo Nam', 1, '2025-12-05 16:36:31', '2025-12-15 12:06:22'),
(5, 'Áo khoác nam', 1, '2025-12-05 16:36:31', '2025-12-21 22:46:51'),
(6, 'Áo Nữ', 2, '2025-12-05 16:36:31', '2025-12-15 10:11:36'),
(7, 'Quần Nữ', 2, '2025-12-05 16:36:31', '2025-12-15 10:11:36'),
(8, 'Áo khoác Nữ', 2, '2025-12-05 16:36:31', '2025-12-15 10:11:36'),
(10, 'Quần nam', 1, '2025-12-15 12:06:01', '2025-12-15 12:06:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_code` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `note` text DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `shipping_fee` int(11) DEFAULT 0,
  `total_price` int(11) NOT NULL,
  `status` varchar(50) DEFAULT 'Chờ xử lý',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `order_code`, `user_id`, `fullname`, `phone`, `address`, `note`, `payment_method`, `shipping_fee`, `total_price`, `status`, `created_at`) VALUES
(1, 'OD1', 4, 'Như Phúc', '0123456789', 'xã Thạnh Hóa, tỉnh Tây Ninh - đường Phạm Văn Bạch', '', 'cod', 20000, 340000, 'Chờ xác nhận', '2025-12-14 11:55:29'),
(2, 'OD2', 4, 'Phúc', '0123456789', 'Quận 12, thành phố Hồ Chí Minh - đường Huỳnh Thị Hai', '', 'cod', 20000, 237600, 'Đã hủy', '2025-12-14 11:57:40'),
(3, 'VPQ-20251215-OCVZCP', 4, 'fwè', 'àdsfa', 'fádfádfadsfádf - dsfádf', '', 'cod', 20000, 220000, 'Chờ lấy hàng', '2025-12-14 18:29:12'),
(4, 'VPQ-20251221-9EOEI6', 9, 'Hồ Ngọc Vy', '0123456789', 'TPHCM - 70 Tô Ký, Quận 12', '', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 15:47:59'),
(5, 'VPQ-20251221-XKT0OC', 9, 'Hồ Ngọc Vy', '0123456789', 'TPHCM - 70 Tô Ký, Quận 12', '', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 15:48:00'),
(6, 'VPQ-20251221-TB2TC1', 9, 'Hồ Ngọc Vy', '0123456789', 'TPHCM - 70 Tô Ký, Quận 12', '', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 15:48:00'),
(7, 'VPQ-20251221-VOBRTM', 9, 'Hồ Ngọc Vy', '0123456789', 'TPHCM - 70 Tô Ký, Quận 12', '', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 15:48:03'),
(8, 'VPQ-20251221-2W4QFW', 9, 'dfgsdf', 'gsdfgsdf', 'gsfdgsdfg - sdfgsdfg', 'sfg', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 15:49:55'),
(9, 'VPQ-20251221-JGRP2M', 9, 'ầdsf', 'ấdfa', 'dfasdfasd - fasdfadf', 'ádf', 'momo', 20000, 220000, 'Chờ xử lý', '2025-12-21 16:03:50'),
(10, 'VPQ-20251224-JP72ND', 9, 'nsnssn', '65659464946', 'shshueidjixekks - xjjdkaosndudbdu', 'idjdjd', 'momo', 20000, 420000, 'Chờ xử lý', '2025-12-23 17:59:10'),
(11, 'VPQ-20251224-XJ4OJ8', 9, 'gsdfgafads', '3523452435fd', 'gsdgjs;ldg - meljfoaf oimf', 'kjoejr', 'momo', 20000, 128800, 'Chờ xử lý', '2025-12-23 18:21:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `image`, `size`, `price`, `quantity`) VALUES
(1, 1, 55, 'Áo hoodie zip gấu xám', '1765692230637-331089710.jpg', 'S', 320000, 1),
(2, 2, 63, 'Áo thun new daily xanh', '1765694227866-950460056.jpg', 'M', 108800, 2),
(3, 3, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(4, 4, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(5, 5, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(6, 6, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(7, 7, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(8, 8, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(9, 9, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'S', 200000, 1),
(10, 10, 56, 'Quần nỉ xám nam', '1765692854929-310625791.jpg', 'L', 200000, 2),
(11, 11, 63, 'Áo thun new daily xanh', '1765694227866-950460056.jpg', 'L', 108800, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `stock_s` int(10) UNSIGNED DEFAULT 0,
  `stock_m` int(10) UNSIGNED DEFAULT 0,
  `stock_l` int(10) UNSIGNED DEFAULT 0,
  `stock_xl` int(10) UNSIGNED DEFAULT 0,
  `price` decimal(12,2) NOT NULL,
  `description` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `discount_percent` int(11) DEFAULT 0,
  `final_price` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `stock_s`, `stock_m`, `stock_l`, `stock_xl`, `price`, `description`, `images`, `created_at`, `updated_at`, `discount_percent`, `final_price`) VALUES
(30, 'Áo hoa nhí', 6, 51, 20, 24, 20, 215000.00, 'Áo hoa nhí mang phong cách vintage nhẹ nhàng, dễ mặc với họa tiết hoa nhí trên nền vải gân, điểm nhấn nút hình trái tim duyên dáng. Áo thiết kế dáng ôm, ngực rút nhún vừa vặn, đường viền ren nữ tính giúp tôn lên vẻ đẹp mềm mại và trẻ trung cho người mặc.\r\nChi tiết:\r\n•	Áo hai dây dáng ôm, ngực nhún nhẹ tạo điểm nhấn\r\n•	Dây mảnh có thể điều chỉnh, dễ chịu khi mặc\r\n•	Chất liệu thun gân cotton pha, họa tiết hoa nhí toàn thân\r\n•	Viền cổ và gấu áo viền ren nhẹ nhàng, mang hơi hướng vintage\r\n•	Co giãn tốt, ôm dáng thoải mái\r\n', '[\"1765690120455-897270449.webp\",\"1765690120455-206618831.webp\",\"1765690120456-839454178.webp\",\"1765690120456-928352006.webp\"]', '2025-12-14 12:28:40', '2025-12-14 12:28:40', 20, 172000),
(31, 'Áo elena ', 6, 5, 44, 45, 3, 256000.00, 'Áo elena phối hợp dáng sơ mi cổ bẻ cùng thiết kế vạt chéo trẻ trung trên nền vải thun be nhạt, nhẹ thoáng. Phần thân wrap tạo hiệu ứng xếp lớp mềm mại, chất thun mỏng giúp áo trở nên nhẹ nhàng, dễ phối đủ kiểu từ đi học, đi chơi đến công sở.\r\nChi tiết:\r\n•	Áo thun tay ngắn, cổ sơ mi basic\r\n•	Thiết kế vạt chéo, tạo hiệu ứng layer tinh tế\r\n•	Vải thun be nhạt nhẹ, thoáng mát, co giãn tốt\r\n•	Logo trước ngực nhỏ nổi bật\r\n•	Áo mỏng nhẹ, hiệu ứng xuyên thấu nhẹ nhàng, hiện đại\r\n', '[\"1765690209590-4952696.webp\",\"1765690209591-4898897.webp\",\"1765690209591-680371127.webp\",\"1765690209592-146126335.webp\"]', '2025-12-14 12:30:09', '2025-12-14 21:54:58', 30, 179200),
(33, 'Áo Yeshi ', 6, 25, 42, 32, 28, 243000.00, 'Áo Yeshi mang vẻ đẹp gợi cảm tinh tế với thiết kế baby tee ôm sát, tôn tối đa đường cong cơ thể. \r\nChi tiết:\r\n•	Dáng croptop lửng, ôm body cực chuẩn\r\n•	Cổ tròn basic, tay ngắn bó sát nhẹ\r\n•	Chất cotton co giãn 4 chiều mềm mại, mặc mát cả ngày\r\n•	Điểm nhấn dòng chữ “yeshi” đính đá lấp lánh chạy ngang ngực, vừa sang vừa nổi bật\r\n•	Phù hợp mix&match mọi kiểu: jeans, chân váy, layer áo khoác đều cực chất\r\n', '[\"1765690361794-668505194.webp\",\"1765690361794-687187792.webp\",\"1765690361794-485840615.webp\",\"1765690361795-590452703.webp\"]', '2025-12-14 12:32:41', '2025-12-14 12:32:41', 0, 243000),
(35, 'Áo Stella ', 6, 23, 34, 23, 45, 261000.00, 'Áo Stella mang vẻ đẹp ngọt ngào cổ điển với thiết kế corset bèo nhún lãng mạn, tôn vòng eo con kiến cực đỉnh. \r\nChi tiết:\r\n•	Dáng corset croptop ôm sát, đan dây trước quyến rũ\r\n•	Cổ vuông viền bèo tầng, tay cánh tiên phồng nhẹ nhàng\r\n•	Phần ngực nhún bèo xếp ly tinh tế, tạo hiệu ứng đầy đặn tự nhiên\r\n•	Eo chiết ly corset chuẩn form, phía sau chun co giãn nhẹ ôm vừa vặn\r\n', '[\"1765690796477-93337269.webp\",\"1765690796477-579343326.webp\",\"1765690796479-382527218.webp\",\"1765690796482-786873131.webp\"]', '2025-12-14 12:39:56', '2025-12-14 12:39:56', 25, 195750),
(36, 'Áo Apony ', 6, 45, 24, 24, 34, 285000.00, 'Áo Apony mang vibe tiểu thư ngọt ngào, vừa nữ tính vừa quyến rũ khó cưỡng với thiết kế trễ vai phối dây buộc tinh tế. \r\nChi tiết:\r\n•	Form ôm sát nhẹ, tôn vòng 1 và thắt eo con kiến\r\n•	Cổ yếm buộc dây sau gáy + dây nơ cổ điển, thêm dây buộc nơ cố định hai bên vai tạo độ phồng nhẹ nhàng\r\n•	Tay cánh tiên ngắn, viền nơ thắt nơ xinh xắn\r\n•	Hai bên thân phối ren hoa nổi ôm sát, tạo hiệu ứng thon eo “ảo thuật”\r\n•	Chất vải muslin mềm nhẹ, thoáng mát, hoa nổi 3D bay bổng\r\n', '[\"1765690864944-355948562.webp\",\"1765690864944-511359819.webp\",\"1765690864945-35560944.webp\"]', '2025-12-14 12:41:04', '2025-12-14 12:41:04', 30, 199500),
(37, 'Áo Tana ', 6, 34, 45, 44, 55, 255000.00, 'Áo Tana mang vibe tiểu thư Pháp ngọt ngào chết người với cổ vuông xinh, tay dài ôm sát và chi tiết ren bèo chạy dọc thân cực kỳ cầu kỳ. \r\nChi tiết:\r\n•	Form ôm body nhẹ nhàng, tôn vòng 1 và thắt eo “ảo” cực đỉnh\r\n•	Cổ vuông viền ren bèo nhỏ, vừa thanh lịch vừa sexy nhẹ\r\n•	Phần ngực phối ren hoa nổi 3D kèm dây rút nơ xinh, điều chỉnh được độ phồng tùy ý\r\n•	Tay dài bó sát, cổ tay viền ren bèo tầng nữ tính\r\n•	Chất thun cotton co giãn 4 chiều siêu mềm mịn, mặc ôm mà vẫn thoải mái cả ngày\r\n', '[\"1765690917247-518643386.webp\",\"1765690917247-475467557.webp\",\"1765690917248-211517667.webp\"]', '2025-12-14 12:41:57', '2025-12-14 12:41:57', 0, 255000),
(38, 'Áo Erica ', 6, 34, 45, 20, 16, 211000.00, 'Áo Erica nàng thơ cổ điển với thiết kế yếm cổ đổ nhún bèo sang trọng, tôn vòng 1 và eo “con kiến” đến từng milimet. \r\nChi tiết:\r\n•	Form croptop yếm ôm sát, chiết ly corset chuẩn dáng, hack eo nhỏ xíu\r\n•	Phần ngực nhún bèo xếp tầng cầu kỳ, tạo hiệu ứng đầy đặn tự nhiên và cực kỳ quyến rũ\r\n•	Cổ yếm cao thanh lịch, dây buộc sau cổ + sau lưng điều chỉnh vừa vặn\r\n•	Hai bên thân phối đường chiết ly sắc nét, tôn dáng “đồng hồ cát”\r\n', '[\"1765690970565-483746076.webp\",\"1765690970565-849891016.webp\",\"1765690970566-625636936.webp\"]', '2025-12-14 12:42:50', '2025-12-14 12:42:50', 0, 211000),
(39, 'Áo Vivian', 6, 22, 77, 554, 33, 310000.00, 'Áo Vivian mang hơi thở cổ tích với lớp vải xếp tầng mềm mại và viền bèo nữ tính. Thiết kế cổ bèo, tay áo bèo nhẹ kết hợp phần tà trước ngắn - sau dài giúp nàng di chuyển uyển chuyển, thích hợp cả đi chơi lẫn dịp đặc biệt.\r\nChi tiết:\r\n•	Áo sát nách phối tầng, viền bèo nhẹ nhàng\r\n•	Tà áo trước ngắn, sau dài tạo đường bay bổng\r\n•	Cổ áo và tay áo bèo mềm, chi tiết buộc dây ở cổ\r\n•	Chất liệu mỏng nhẹ, thoáng mát\r\n•	Dáng áo rộng rãi, dễ chịu khi mặc\r\n', '[\"1765691050250-471644998.webp\",\"1765691050251-803742657.webp\",\"1765691050251-942740353.webp\",\"1765691050252-91306349.webp\"]', '2025-12-14 12:44:10', '2025-12-14 12:44:10', 0, 310000),
(40, 'Áo alexa ', 6, 33, 6, 23, 33, 216000.00, 'Áo alexa nổi bật với phom quây ôm gọn, đường nhún bèo sắc nét và điểm nhấn sọc trắng trẻ trung. Chất liệu thun mềm co giãn, thiết kế ôm sát cơ thể giúp tôn dáng, dễ phối cho phong cách dự tiệc hoặc streetwear cá tính.\r\nChi tiết:\r\n•	Áo quây dáng ôm, nhún bèo dọc thân hiện đại\r\n•	Sọc trắng bất đối xứng tạo điểm nhấn nổi bật\r\n•	Chất liệu thun co giãn mềm mại, thoải mái khi mặc\r\n•	Thiết kế ôm gọn, tôn nét cá tính và nữ tính\r\n', '[\"1765691095368-209868410.webp\",\"1765691095370-203020819.webp\",\"1765691095370-758215876.webp\",\"1765691095371-32429454.webp\"]', '2025-12-14 12:44:55', '2025-12-14 21:55:18', 0, 216000),
(41, 'Áo Trixie ', 6, 34, 23, 22, 13, 215000.00, 'Áo Trixie mang đến phong cách basic tiện dụng với dáng ôm nhẹ, gam hồng pastel ngọt ngào cùng logo đá lấp lánh giữa ngực. Thiết kế racerback năng động, chất thun gân co giãn mềm mại giúp áo mặc thoải mái cả ngày, dễ phối từ outfit thường ngày đến tập luyện.\r\nChi tiết:\r\n•	Áo ba lỗ dáng ôm với lưng thể thao (racerback) dễ vận động\r\n•	Vải thun gân hồng phấn, co giãn nhẹ, thoải mái\r\n•	Logo đá lấp lánh trang trí nổi bật phía trước\r\n•	Chất cotton pha thấm hút, thích hợp mặc chơi thể thao hoặc thường ngày\r\n•	Lai cong nhẹ nữ tính\r\n', '[\"1765691167104-296308697.webp\",\"1765691167104-677414767.webp\",\"1765691167104-70204850.webp\"]', '2025-12-14 12:46:07', '2025-12-14 12:46:07', 0, 215000),
(42, 'Áo xanh tay dài ', 6, 34, 34, 34, 34, 145000.00, 'Áo xanh tay dài mang dấu ấn cá tính với kiểu dáng hiện đại cùng thiết kế cổ áo đặc biệt. Được cắt may từ chất liệu thun gân, áo Taylor tạo điểm nhấn ở đường cắt sắc nét và hàng nút ở thân trước, tôn lên vóc dáng của nàng một cách sang trọng, đồng thời mang đến sự mới lạ cho tủ đồ của bạn.\r\nChi tiết:\r\n•	Áo thun dáng ôm, trễ vai, chi tiết gập tay nổi bật\r\n•	Cài nút phía trước với kiểu dáng hiện đại\r\n•	Chất liệu thun gân co giãn, ôm dáng thoải mái\r\n•	Kiểu dáng tôn eo, dễ phối riêng hoặc layer sáng tạo\r\n', '[\"1765691259839-118019776.webp\",\"1765691259841-810237617.webp\",\"1765691259841-577248962.webp\",\"1765691259843-270656836.webp\"]', '2025-12-14 12:47:39', '2025-12-14 12:47:39', 0, 145000),
(43, 'Áo trễ vai xám ', 6, 23, 33, 44, 55, 281000.00, 'Áo trễ vai xám mang đến vẻ hiện đại với thiết kế cổ bất đối xứng, nhún nhẹ và điểm nhấn nơ duyên dáng ở eo.\r\nChi tiết:\r\n•	Áo dài tay với cổ lệch vai cá tính\r\n•	Nơ thắt bên hông mềm mại\r\n•	Thân áo nhún nhẹ ôm dáng, tôn đường cong\r\n•	Chất liệu cotton pha co giãn, nhẹ nhàng, dễ chịu\r\n•	Phom ôm vừa vặn\r\n', '[\"1765691322773-459516195.webp\",\"1765691322773-71939074.webp\",\"1765691322773-949420045.webp\",\"1765691322774-320429051.webp\"]', '2025-12-14 12:48:42', '2025-12-14 12:48:42', 0, 281000),
(44, 'Quần jeans denim nữ ', 7, 33, 23, 4, 22, 320000.00, 'Quần jeans denim nữ ống rộng màu xanh bạc, phong cách vintage tối giản và thoải mái.\r\nChi tiết:\r\n•	Dáng wide-leg rộng từ hông xuống gấu, dài chấm gót, tôn chân dài\r\n•	Lưng cao vừa, che bụng tốt, tạo tỷ lệ cơ thể đẹp\r\n•	Chất denim cotton dày dặn, co giãn nhẹ, form giữ dáng lâu\r\n•	Wash bạc loang tự nhiên, hiệu ứng bụi bặm cổ điển\r\n', '[\"1765691415270-72108948.jpg\",\"1765691415271-324096808.jpg\",\"1765691415272-36844169.jpg\",\"1765691415272-226875351.jpg\"]', '2025-12-14 12:50:15', '2025-12-14 21:55:41', 25, 240000),
(45, 'Quần nỉ nữ xám ', 7, 33, 33, 333, 33, 185000.00, 'Quần nỉ nữ xám ống suông rộng màu xám nhạt, phong cách casual California nhẹ nhàng và nữ tính.\r\nChi tiết:\r\n•	Dáng suông rộng thoải mái, dài chạm mắt cá chân\r\n•	Lưng thun cao có dây rút, ôm vừa vặn, không lộ bụng\r\n•	Chất cotton nỉ dày, lót bông mềm mại, ấm áp, mặt trong mịn\r\n•	Màu xám melange nhạt sạch sẽ, không xù lông\r\n•	Thêu chữ “Calif” nhỏ màu hồng phấn bên đùi trái, chi tiết tinh tế\r\n', '[\"1765691566097-723542755.jpg\",\"1765691566098-329600315.jpg\",\"1765691566098-757343075.jpg\"]', '2025-12-14 12:52:46', '2025-12-14 12:52:46', 0, 185000),
(46, 'Quần jeans denim ngắn nữ', 7, 33, 44, 44, 44, 222000.00, 'Quần jeans ngắn nữ dáng bermuda màu xanh wash nhạt, phong cách Hàn Quốc tối giản và trẻ trung.\r\nChi tiết:\r\n•	Dáng bermuda ống suông rộng vừa, dài qua đầu gối khoảng 10–15 cm, che đùi tốt\r\n•	Lưng cao vừa phải, ôm eo nhẹ, tôn dáng và hack chân dài\r\n•	Chất denim cotton dày dặn, co giãn nhẹ, form cứng cáp giữ dáng đẹp\r\n•	Wash xanh nhạt loang tự nhiên, hiệu ứng phai bụi bặm nhẹ nhàng\r\n', '[\"1765691632342-944438266.jpg\",\"1765691632343-132388600.png\",\"1765691632352-759263643.png\",\"1765691632373-848039416.png\"]', '2025-12-14 12:53:52', '2025-12-14 12:53:52', 30, 155400),
(47, 'Chân váy grace', 7, 55, 55, 55, 55, 219000.00, 'Chân váy ngắn grace màu kem sữa, phong cách công chúa ngọt ngào và nữ tính.\r\nChi tiết:\r\n•	Dáng siêu ngắn, lưng cao xếp ly tinh tế, ôm eo tạo vòng eo con kiến\r\n•	Phần eo đính 4 hàng cúc nhỏ ngọc trai xếp tầng đối xứng, chi tiết nổi bật sang chảnh\r\n•	Chất tuyết mưa cao cấp, dày dặn, đứng form, không nhăn\r\n•	Phần tùng váy xếp ly bồng bềnh, tạo độ phồng tự nhiên như váy ballet\r\n', '[\"1765691709883-19705310.webp\",\"1765691709883-494492249.webp\",\"1765691709884-902121021.webp\",\"1765691709884-210422120.webp\"]', '2025-12-14 12:55:09', '2025-12-14 12:55:09', 0, 219000),
(48, 'Chân váy lila', 7, 33, 33, 33, 33, 150000.00, 'Chân váy Lila đen sọc trắng, phong cách tennis preppy thanh lịch và năng động.\r\nChi tiết:\r\n•	Dáng siêu ngắn, lưng cao ôm sát, tạo vòng eo nhỏ gọn\r\n•	Chất vải tuyết mưa cao cấp pha sọc trắng mịn, dày dặn, đứng form đẹp\r\n•	Thiết kế xếp ly lớn đều quanh thân, tạo độ bồng nhẹ nhàng khi di chuyển\r\n•	Đai eo phối viền trắng nổi bật, kèm dây rút trắng dài buộc nơ một bên – điểm nhấn dễ thương\r\n', '[\"1765691762612-553152963.webp\",\"1765691762612-418123224.webp\"]', '2025-12-14 12:56:02', '2025-12-22 13:41:25', 10, 135000),
(49, 'Chân váy da đỏ', 7, 33, 33, 33, 33, 188000.00, 'Chân váy da đỏ rượu, phong cách Y2K cá tính và quyến rũ.\r\nChi tiết:\r\n•	Dáng siêu ngắn, lưng thấp vừa phải, ôm sát hông tạo đường cong đẹp\r\n•	Chất da PU cao cấp mềm mại, bề mặt bóng nhẹ, dày dặn, không nứt\r\n•	Màu đỏ rượu vang sang trọng, nổi bật và thu hút mọi ánh nhìn\r\n•	Phần eo gập chéo bất đối xứng, phối đai da kèm khoá kim loại bạc nhỏ một bên – chi tiết cực chất\r\n', '[\"1765691807180-551282814.webp\",\"1765691807180-730040593.webp\",\"1765691807181-900482037.webp\",\"1765691807182-273270738.webp\"]', '2025-12-14 12:56:47', '2025-12-14 12:56:47', 0, 188000),
(50, 'Chân váy dalya', 7, 34, 34, 34, 34, 210000.00, 'Chân váy ngắn Dalya đen, phong cách preppy chic tối giản và sang trọng.\r\nChi tiết:\r\n•	Dáng siêu ngắn, lưng thấp vừa phải, ôm sát hông tạo vòng eo rõ nét\r\n•	Chất tuyết mưa cao cấp dày dặn, đứng form, không nhăn, mặt vải mịn đẹp\r\n•	Màu đen tuyền sâu, tôn da và dễ phối mọi màu áo\r\n•	Phần eo gập chéo bất đối xứng, đính hai khoá kim loại vàng nhỏ kèm dây vải buộc nơ hai bên\r\n', '[\"1765691858811-116591185.webp\",\"1765691858811-558322649.webp\",\"1765691858813-258502938.webp\"]', '2025-12-14 12:57:38', '2025-12-14 12:57:38', 0, 210000),
(51, 'Chân váy mandy', 7, 55, 55, 55, 55, 190000.00, 'Chân váy ngắn Mandy đen, phong cách balletcore thanh lịch và mong manh.\r\nChi tiết:\r\n•	Dáng ôm sát dạng tube, siêu ngắn, lưng vừa phải, tôn vòng eo và hông hoàn hảo\r\n•	Chất voan lưới mềm mại, nhiều lớp xếp tầng mỏng nhẹ tạo hiệu ứng mờ ảo\r\n•	Phần eo phối dải voan đen quấn nhiều vòng.\r\n', '[\"1765691920833-768616799.webp\",\"1765691920834-474693775.webp\",\"1765691920834-824401311.webp\"]', '2025-12-14 12:58:40', '2025-12-14 12:58:40', 0, 190000),
(52, 'Áo khoác len đỏ', 8, 55, 55, 55, 5, 450000.00, 'Áo khoác len đỏ mang hơi thở mùa đông Bắc Âu ấm áp, vừa vintage vừa sang chảnh chết người với họa tiết thổ cẩm truyền thống cực kỳ bắt mắt. \r\nChi tiết:\r\n•	Form cardigan ngắn dáng cropped, ôm vừa tôn dáng mà vẫn thoải mái\r\n•	Phần ngực và vai phối họa tiết fair isle cổ điển đa sắc (đỏ rượu, be, xanh pastel), nhìn là mê\r\n•	Cổ tròn viền thổ cẩm đồng điệu, gấu áo + gấu tay bo chun nhẹ nhàng\r\n•	Hàng cúc nhỏ xinh chạy dọc thân, dễ mặc dễ phối\r\n', '[\"1765692011187-620950366.jpg\",\"1765692011188-658866989.jpg\",\"1765692011189-406645580.jpg\",\"1765692011189-920575758.jpg\"]', '2025-12-14 13:00:11', '2025-12-14 13:00:11', 0, 450000),
(53, 'Áo khoác len xanh', 8, 55, 33, 33, 33, 480000.00, 'Áo khoác len xanh cổ điển, ấm áp và thanh lịch.\r\nChi tiết:\r\n•	Dáng cropped ngắn, ôm vừa vặn, tôn dáng\r\n•	Chất len cashmere pha, mềm mại, ấm, nhẹ\r\n•	Họa tiết đan bím (cable-knit) chạy dọc thân áo\r\n•	Logo Polo Bear thêu nhỏ bên ngực trái\r\n•	Hàng cúc cùng màu chạy dọc thân trước\r\n', '[\"1765692066717-139542893.jpg\",\"1765692066718-379844267.jpg\",\"1765692066721-445278192.jpg\",\"1765692066721-86151365.jpg\"]', '2025-12-14 13:01:06', '2025-12-14 13:01:06', 0, 480000),
(54, 'Áo hoodie zip xám', 8, 55, 33, 33, 33, 550000.00, 'Áo hoodie zip xám phong cách American varsity nhẹ nhàng và nữ tính.\r\nChi tiết:\r\n•	Dáng ngắn trên hông, form suông nhẹ, che bụng tốt mà vẫn gọn gàng\r\n•	Chất cotton nỉ dày dặn, lót bông mềm, ấm áp, mặt trong lông mịn\r\n•	Màu xám melange nhạt, sạch và dễ phối\r\n•	In nhung nổi chữ “Calif” và “W.A.” màu hồng phấn pastel trước ngực, tone-sur-tone dịu mắt\r\n•	Khoá kéo kim loại đồng bộ màu bạc, kéo mượt\r\n•	Mũ rộng có dây rút cùng màu thân áo\r\n', '[\"1765692140537-232508345.jpg\",\"1765692140537-272536922.jpg\",\"1765692140538-537402745.jpg\",\"1765692140538-78206759.jpg\"]', '2025-12-14 13:02:20', '2025-12-14 13:02:20', 0, 550000),
(56, 'Quần nỉ xám nam', 4, 33, 33, 33, 33, 250000.00, 'Quần jogger ống suông xám tối giản và năng động, phong cách trẻ trung.\r\nChi tiết:\r\n\r\nDáng ống rộng thoải mái, hơi wide leg, dài qua mắt cá chân, che dáng tốt và tạo cảm giác thon gọn\r\nChất liệu cotton pha polyester mềm mại, co giãn nhẹ, mặt vải mịn mượt, giữ ấm tốt\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit casual hoặc streetwear\r\nEo chun co giãn kèm dây rút đồng màu – điều chỉnh vừa vặn dễ dàng', '[\"1765692854929-310625791.jpg\",\"1765692854930-633724602.jpg\",\"1765692854933-195869073.jpg\"]', '2025-12-14 13:14:14', '2025-12-14 13:14:14', 20, 200000),
(57, 'Quần nỉ xanh nam', 4, 22, 22, 22, 22, 210000.00, 'Quần jogger ống suông tối giản và năng động, phong cách trẻ trung.\r\nChi tiết:\r\n\r\nDáng ống rộng thoải mái, hơi wide leg, dài qua mắt cá chân, che dáng tốt và tạo cảm giác thon gọn\r\nChất liệu cotton pha polyester mềm mại, co giãn nhẹ, mặt vải mịn mượt, giữ ấm tốt\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit casual hoặc streetwear\r\nEo chun co giãn kèm dây rút đồng màu – điều chỉnh vừa vặn dễ dàng', '[\"1765692992255-998934559.jpg\",\"1765692992256-202677488.jpg\"]', '2025-12-14 13:16:32', '2025-12-14 13:16:32', 30, 147000),
(58, 'Quần kaki nam', 4, 33, 333, 33, 33, 240000.00, 'Quần tây ống suông be tối giản và thanh lịch, phong cách trẻ trung.\r\nChi tiết:\r\n\r\nDáng ống rộng thoải mái, có ly trước tinh tế, dài chạm mắt cá chân, tạo form dáng chuẩn và tôn chân\r\nChất liệu kaki cotton pha co giãn nhẹ, mềm mại, thoáng mát, không nhăn dễ bảo quản\r\nMàu be nhạt tinh tế, ấm áp, dễ phối với mọi tông màu từ basic đến nổi bật', '[\"1765693153112-337745142.jpg\",\"1765693153113-848341672.jpg\",\"1765693153116-742589973.jpg\"]', '2025-12-14 13:19:13', '2025-12-14 13:19:13', 0, 240000),
(59, 'Quần kaki đen nam', 4, 33, 33, 33, 55, 125000.00, 'Quần tây ống suông đen tối giản và thanh lịch, phong cách trẻ trung.\r\nChi tiết:\r\n\r\nDáng ống rộng thoải mái, có ly trước tinh tế, dài chạm mắt cá chân, tạo form dáng chuẩn và tôn chân\r\nChất liệu kaki cotton pha co giãn nhẹ, mềm mại, thoáng mát, không nhăn dễ bảo quản\r\nMàu be nhạt tinh tế, ấm áp, dễ phối với mọi tông màu từ basic đến nổi bật', '[\"1765693253763-744737726.jpg\",\"1765693253763-542731230.jpg\",\"1765693253764-576931316.jpg\"]', '2025-12-14 13:20:53', '2025-12-14 13:20:53', 0, 125000),
(60, 'Áo sweater sọc nam', 3, 22, 22, 22, 22, 255000.00, 'Áo polo dài tay sọc ngang nâu navy tối giản và năng động, phong cách trẻ trung preppy.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mại, giữ ấm tốt cho mùa thu đông\r\nHọa tiết sọc ngang to bản nâu navy cổ điển, kết hợp cổ polo trắng tinh tế với nút cài\r\nLogo huy hiệu thêu vàng nhỏ bên ngực trái – chi tiết nhận diện sang trọng, nổi bật', '[\"1765693435352-397168575.jpg\",\"1765693435352-76541650.jpg\",\"1765693435353-942283216.jpg\"]', '2025-12-14 13:23:55', '2025-12-14 13:23:55', 0, 255000),
(61, 'Áo sweater xám nam', 3, 44, 44, 44, 4, 255000.00, 'Áo polo dài tay xám tối giản và năng động, phong cách trẻ trung preppy.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mại, giữ ấm tốt cho mùa thu đông\r\nHọa tiết sọc ngang to bản nâu navy cổ điển, kết hợp cổ polo trắng tinh tế với nút cà', '[\"1765693657951-727291744.jpg\",\"1765693657951-659683214.jpg\",\"1765693657952-980510582.jpg\"]', '2025-12-14 13:27:37', '2025-12-14 13:27:37', 0, 255000),
(62, 'Áo thun boxy trắng', 3, 33, 33, 33, 33, 125000.00, 'Áo thun boxy trắng tối giản và năng động, phong cách trẻ trung holiday vibe.\r\nChi tiết:\r\n\r\nDáng boxy oversize vuông vắn, vai hơi rũ, dài vừa hông, thoải mái và che dáng cực tốt\r\nChất liệu cotton dày dặn, mềm mịn, thoáng mát, form giữ tốt sau nhiều lần giặt\r\nMàu trắng tinh khôi, sạch sẽ, dễ phối với mọi kiểu quần từ jogger đến jeans\r\nLogo thêu nhỏ \"Happiness is Holiday\" kèm hình lon nước đỏ bên ngực trái – chi tiết dễ thương, nổi bật tinh tế\r\nCổ tròn basic, đường may chắc chắn, tay áo rộng thoải mái', '[\"1765694110423-38019342.jpg\",\"1765694110423-720135962.jpg\",\"1765694110424-595244427.jpg\"]', '2025-12-14 13:35:10', '2025-12-14 13:35:10', 0, 125000),
(63, 'Áo thun new daily xanh', 3, 44, 44, 44, 44, 136000.00, 'o thun oversize navy tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ tự nhiên, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mịn, thoáng khí, form giữ bền đẹp sau nhiều lần giặt\r\nMàu navy sâu tinh tế, sang trọng, dễ phối với mọi kiểu quần từ jogger đến shorts', '[\"1765694227866-950460056.jpg\",\"1765694227867-45579002.jpg\",\"1765694227867-622649241.jpg\"]', '2025-12-14 13:37:07', '2025-12-14 13:37:07', 20, 108800),
(64, 'Áo thun new daily trắng', 3, 44, 55, 55, 55, 135000.00, 'Áo thun oversize tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ tự nhiên, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mịn, thoáng khí, form giữ bền đẹp sau nhiều lần giặt\r\nMàu navy sâu tinh tế, sang trọng, dễ phối với mọi kiểu quần từ jogger đến shorts', '[\"1765694338089-798035544.jpg\",\"1765694338089-971859058.jpg\",\"1765694338090-717284740.jpg\"]', '2025-12-14 13:38:58', '2025-12-14 13:38:58', 0, 135000),
(65, 'Ảo thun newdaily xám', 3, 66, 66, 66, 66, 135000.00, 'Áo thun oversize tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ tự nhiên, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mịn, thoáng khí, form giữ bền đẹp sau nhiều lần giặt\r\nMàu navy sâu tinh tế, sang trọng, dễ phối với mọi kiểu quần từ jogger đến shorts', '[\"1765694454762-992716753.jpg\",\"1765694454763-328427925.jpg\",\"1765694454764-633473758.jpg\"]', '2025-12-14 13:40:54', '2025-12-14 13:40:54', 0, 135000),
(66, 'Áo owlbrand trắng', 3, 55, 55, 55, 55, 222000.00, 'Áo thun oversize kem tối giản và năng động, phong cách trẻ trung campus.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ nhẹ, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mại, thoáng khí, giữ form đẹp sau nhiều lần giặt\r\nMàu kem sữa nhạt tinh tế, ấm áp, dễ phối đồ từ basic đến layering mùa thu đông\r\nIn chữ \"OWLBRAND® DAILY LIFE\" phong cách varsity xanh navy nổi bật giữa ngực – điểm nhấn cổ điển, mạnh mẽ', '[\"1765694779188-588802621.jpg\",\"1765694779189-440171870.jpg\",\"1765694779189-955214986.jpg\"]', '2025-12-14 13:46:19', '2025-12-14 13:46:19', 0, 222000),
(67, 'Áo owlbrand đen', 3, 66, 66, 66, 66, 225000.00, 'Áo thun oversize kem tối giản và năng động, phong cách trẻ trung campus.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ nhẹ, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mại, thoáng khí, giữ form đẹp sau nhiều lần giặt\r\nMàu kem sữa nhạt tinh tế, ấm áp, dễ phối đồ từ basic đến layering mùa thu đông\r\nIn chữ \"OWLBRAND® DAILY LIFE\" phong cách varsity xanh navy nổi bật giữa ngực – điểm nhấn cổ điển, mạnh mẽ', '[\"1765694885488-587358006.jpg\",\"1765694885489-496990933.jpg\",\"1765694885489-987837801.jpg\"]', '2025-12-14 13:48:05', '2025-12-14 13:48:05', 0, 225000),
(68, 'Áo owlbrand nâu', 3, 44, 44, 44, 44, 220000.00, 'Áo thun oversize kem tối giản và năng động, phong cách trẻ trung campus.\r\nChi tiết:\r\n\r\nDáng suông rộng oversize, vai rũ nhẹ, dài qua hông một chút, thoải mái và che dáng tốt\r\nChất liệu cotton dày dặn, mềm mại, thoáng khí, giữ form đẹp sau nhiều lần giặt\r\nMàu kem sữa nhạt tinh tế, ấm áp, dễ phối đồ từ basic đến layering mùa thu đông\r\nIn chữ \"OWLBRAND® DAILY LIFE\" phong cách varsity xanh navy nổi bật giữa ngực – điểm nhấn cổ điển, mạnh mẽ', '[\"1765694995572-923597269.jpg\",\"1765694995572-712912518.jpg\",\"1765694995573-396399170.jpg\"]', '2025-12-14 13:49:55', '2025-12-14 13:49:55', 0, 220000),
(69, 'Áo khoác owlbrand xám', 5, 55, 55, 55, 55, 350000.00, 'Áo hoodie zip xám nhạt tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, che dáng tốt và tạo form thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót bông ấm áp, giữ nhiệt tuyệt vời cho mùa thu đông\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit từ casual đến layering\r\nLogo \"OWL BRAND Simplicity\" in nhỏ bên ngực trái – chi tiết nhận diện brand tinh tế, tối giản', '[\"1765695171546-364885993.jpg\",\"1765695171547-88525198.jpg\",\"1765695171547-748261446.jpg\"]', '2025-12-14 13:52:51', '2025-12-14 13:52:51', 0, 350000),
(70, 'Áo khoác owlbrand olive', 5, 66, 66, 66, 66, 320000.00, 'Áo hoodie zip olive tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, che dáng tốt và tạo form thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót bông ấm áp, giữ nhiệt tuyệt vời cho mùa thu đông\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit từ casual đến layering\r\nLogo &quot;OWL BRAND Simplicity&quot; in nhỏ bên ngực trái – chi tiết nhận diện brand tinh tế, tối giản', '[\"1765695428565-846238308.jpg\",\"1765695428566-164294160.jpg\",\"1765695428566-850207706.jpg\"]', '2025-12-14 13:57:08', '2025-12-14 13:59:40', 0, 320000),
(71, 'Áo khoác owlbrand navy', 5, 55, 33, 33, 33, 325000.00, 'Áo hoodie zip navy tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, che dáng tốt và tạo form thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót bông ấm áp, giữ nhiệt tuyệt vời cho mùa thu đông\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit từ casual đến layering\r\nLogo \"OWL BRAND Simplicity\" in nhỏ bên ngực trái – chi tiết nhận diện brand tinh tế, tối giản', '[\"1765695568489-382598826.jpg\",\"1765695568490-390958293.jpg\",\"1765695568490-846051319.jpg\"]', '2025-12-14 13:59:28', '2025-12-14 13:59:28', 0, 325000),
(72, 'Áo khoác owlbrand nâu', 5, 55, 55, 55, 55, 360000.00, 'Áo hoodie zip nâu tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài qua hông một chút, che dáng tốt và tạo form thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót bông ấm áp, giữ nhiệt tuyệt vời cho mùa thu đông\r\nMàu xám nhạt tinh tế, sạch sẽ, dễ phối với mọi outfit từ casual đến layering\r\nLogo \"OWL BRAND Simplicity\" in nhỏ bên ngực trái – chi tiết nhận diện brand tinh tế, tối giản', '[\"1765695713037-730181101.jpg\",\"1765695713037-149895581.jpg\",\"1765695713038-727010030.jpg\"]', '2025-12-14 14:01:53', '2025-12-14 14:01:53', 0, 360000),
(73, 'Áo khoác blouson navy', 5, 77, 77, 77, 77, 352000.00, 'Áo khoác blouson navy tối giản và năng động, phong cách trẻ trung classic.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài vừa hông, bo gấu và bo tay chun co giãn nhẹ, tạo form gọn gàng thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót trong mịn, giữ ấm tốt cho mùa thu đông\r\nMàu navy sâu tinh tế, sang trọng, dễ phối với mọi outfit từ casual đến smart casual\r\nCổ bẻ classic, khóa kéo chính giữa đồng màu bạc kéo êm; logo OWL thêu tone-sur-tone nhỏ bên ngực trái – chi tiết nhận diện tinh tế, đẳng cấp', '[\"1765695947601-736842528.jpg\",\"1765695947601-427362015.jpg\",\"1765695947602-227557530.jpg\"]', '2025-12-14 14:05:47', '2025-12-14 14:08:29', 0, 352000),
(74, 'Áo khoác blouson xám', 5, 66, 66, 66, 66, 368000.00, 'Áo khoác blouson tối giản và năng động, phong cách trẻ trung classic.\r\nChi tiết:\r\n\r\nDáng suông nhẹ, hơi oversize, dài vừa hông, bo gấu và bo tay chun co giãn nhẹ, tạo form gọn gàng thoải mái\r\nChất liệu cotton nỉ dày dặn, mềm mại, lót trong mịn, giữ ấm tốt cho mùa thu đông\r\nMàu navy sâu tinh tế, sang trọng, dễ phối với mọi outfit từ casual đến smart casual\r\nCổ bẻ classic, khóa kéo chính giữa đồng màu bạc kéo êm; logo OWL thêu tone-sur-tone nhỏ bên ngực trái – chi tiết nhận diện tinh tế, đẳng cấp', '[\"1765696092970-875866737.jpg\",\"1765696092970-287522981.jpg\",\"1765696092970-630916957.jpg\"]', '2025-12-14 14:08:12', '2025-12-14 14:08:12', 0, 368000),
(75, 'Quần short jeans nam', 4, 55, 55, 44, 33, 260000.00, 'Quần short jeans nam tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông rộng thoải mái, ống đứng dài qua đầu gối một chút, tạo cảm giác chill và che đùi tốt\r\nChất liệu denim cotton pha co giãn nhẹ, dày dặn nhưng mềm mại, wash bạc màu tự nhiên đẹp mắt\r\nMàu xanh jeans wash nhạt cổ điển, dễ phối với mọi kiểu áo từ thun basic đến hoodie oversize', '[\"1765696456327-464590027.jpg\",\"1765696456328-937904972.jpg\",\"1765696456328-946396167.jpg\"]', '2025-12-14 14:14:16', '2025-12-14 14:14:16', 0, 260000),
(76, 'Quần short jeans nhạt nam', 4, 44, 44, 44, 44, 250000.00, 'Quần short jeans nam wash xanh nhạt tối giản và năng động, phong cách trẻ trung streetwear.\r\nChi tiết:\r\n\r\nDáng suông rộng thoải mái, ống đứng dài qua đầu gối một chút, tạo cảm giác chill và che đùi tốt\r\nChất liệu denim cotton pha co giãn nhẹ, dày dặn nhưng mềm mại, wash bạc màu tự nhiên đẹp mắt\r\nMàu xanh jeans wash nhạt cổ điển, dễ phối với mọi kiểu áo từ thun basic đến hoodie oversize', '[\"1765696501892-155405539.jpg\",\"1765696501892-492000420.jpg\",\"1765696501893-768788650.jpg\"]', '2025-12-14 14:15:01', '2025-12-14 14:15:01', 0, 250000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `address` varchar(255) DEFAULT NULL,
  `dayOfBirth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `role`, `created_at`, `address`, `dayOfBirth`, `gender`, `phoneNumber`, `isActive`, `remember_token`, `bio`) VALUES
(1, 'Ngọc Vy', 'ngocvy@gmail.com', '$2b$10$ouWCj/CX9nzwNv1ZODFIAOjQf.ERqc/n3lN9eQLYv1XRKaSLFfKPq', 'admin', '2025-12-06 22:18:39', NULL, NULL, NULL, NULL, 1, NULL, NULL),
(2, 'Như Phúc', 'nhuphuc@gmail.com', '$2b$10$db9tQ8kxfokHwQyWYlNlBeu/nqxS5jJMcxu3DFxb.kTy8A2N0zU2O', 'admin', '2025-12-06 22:18:39', NULL, NULL, NULL, NULL, 1, NULL, NULL),
(3, 'Minh Quân', 'minhquan@gmail.com', '$2b$10$qxS0Y12fb2MHUXxGHfkmHe8UhdvxR26cX1857BuHDb3dQ3JkjHGCy', 'admin', '2025-12-06 22:18:39', NULL, NULL, NULL, NULL, 1, NULL, NULL),
(4, 'Nguyễn Văn A', 'user1@gmail.com', '$2b$10$I6Ohpcxywzb9kcQW1iSx3Oo4lEZAO9tupKatyNXsvWQ/5buyYG9EW', 'user', '2025-12-06 22:20:23', 'Thạnh Hóa, tỉnh Long An', '2005-10-30', 'male', '0123456789', 1, NULL, ''),
(5, 'Nguyễn Văn B', 'user2@gmail.com', '$2b$10$NYqVMdfQJbDj6t5eY7SDVOCMoMBqdUvhGyXXMIZfo02xdd4gCNsLK', 'admin', '2025-12-06 22:20:23', NULL, NULL, NULL, NULL, 1, NULL, NULL),
(6, 'Nguyễn Như Phúc', 'user3@gmail.com', '$2b$10$RDpq2Vt62Ind.diHT1pYdeaqAgG6I0NkFDj0b0CbQouMeXPMnVIKa', 'user', '2025-12-07 13:40:50', 'Thành phố Hồ Chí Minh', '2005-10-29', 'male', '0123456789', 1, NULL, ''),
(7, 'vy', 'user5@gmail.com', '$2b$10$XkMu/i.XxQQsIrmz3Irgu.2mPROGhZVoAmV6aE6WADJWSU/dXj9sG', 'user', '2025-12-08 09:55:59', NULL, NULL, NULL, NULL, 1, NULL, NULL),
(9, 'vy', 'v@gmail.com', '$2b$10$MxoItuRA9gCNw6tjt8lG0e0Y88MprsjArsYVbj49EOzhN0Io3Gq8K', 'user', '2025-12-09 08:37:05', '', '2025-12-19', 'female', '', 1, 'f4e5d40121c1d8c68fcc6640b00d74a4fe4989cadd1a79db4757e27047d29111', 'Hehe'),
(10, 'Hồ Ngọc Vy', 'vy1@gmail.com', '$2b$10$OIZl6c3b28Jc4Jl4N2Bb.uk8fo.GPtxHsZGF6Mo1aJgLPY3IANOLm', 'user', '2025-12-14 11:08:09', NULL, NULL, NULL, NULL, 1, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_fk` (`user_id`),
  ADD KEY `product_fk` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_code_2` (`order_code`),
  ADD UNIQUE KEY `order_code` (`order_code`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_items_order` (`order_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_product_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
