# VPQ Studio – Website bán quần áo trực tuyến

## 1. Giới thiệu
VPQ Studio là website bán quần áo trực tuyến được xây dựng nhằm mô phỏng một hệ thống thương mại điện tử quy mô nhỏ đến vừa.  
Hệ thống hỗ trợ người dùng mua sắm thời trang online và giúp chủ cửa hàng quản lý sản phẩm, đơn hàng, khách hàng một cách hiệu quả.

Website hướng đến giao diện trực quan, dễ sử dụng, phù hợp cho việc học tập, nghiên cứu và có khả năng mở rộng trong thực tế.

---

## 2. Công nghệ sử dụng
- **Backend**: Node.js, Express
- **Frontend**: EJS, HTML, CSS, JavaScript
- **Database**: MySQL
- **Thanh toán**: MoMo (Sandbox)

---

## 3. Cấu trúc thư mục chính
```bash
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
│   ├── admin/
│   ├── user/
│   └── layouts/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
└── config/
```
---

## 4. Chuẩn bị môi trường

### 4.1. Yêu cầu
- Node.js >= 16
- MySQL
- Git

### 4.2. Clone project
```bash 
git clone https://github.com/HoNgocVy05/ClothingShop.git
cd ClothingShop
```

### 4.3. Cài đặt thư viện
```bash
npm install
npm install nodemailer
```

---

## 5. Cấu hình môi trường (.env)
Tạo file .env ở thư mục gốc với nội dung:
```bash
# Server
PORT=3000

# Database local
mySqlPort=3306
mySqlHost=localhost
mySqlUser=root
mySqlPassword=your_password_here
mySqlDb=clothingShop

# MoMo Sandbox
MOMO_ACCESS_KEY=your_access_key
MOMO_SECRET_KEY=your_secret_key
MOMO_PARTNER_CODE=MOMO

# Mail
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

---

## 6. Khởi tạo database

### 6.2. Import dữ liệu
File clothingshop.sql đã có sẵn trong project.
Import vào database vừa tạo bằng MySQL Workbench hoặc command line:
```bash
mysql -u root -p clothingShop < clothingshop.sql
```

---

## 7. Chạy project

### 7.1. Chạy server
```bash
npm start
```

---

## 7.2. Truy cập website
Trang người dùng:
http://localhost:3000

Trang quản trị (admin):
http://localhost:3000/admin

---

## 8. Chức năng chính

### 8.1. Người dùng
- Đăng ký, đăng nhập
- Xem và tìm kiếm sản phẩm
- Lọc sản phẩm theo danh mục, giá, size, sale
- Thêm sản phẩm vào giỏ hàng
- Đặt hàng và thanh toán (MoMo Sandbox)
- Xem lịch sử đơn hàng

### 8.2. Quản trị viên
- Quản lý sản phẩm
- Quản lý danh mục
- Quản lý đơn hàng và trạng thái đơn
- Quản lý khách hàng
- Thống kê sơ lược doanh thu và sản phẩm


