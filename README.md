# VPQ Studio - Hệ thống quản lý cửa hàng bán quần áo online

## Mô tả dự án
Đây là một dự án web bán hàng trực tuyến được xây dựng bằng Node.js, Express.  
Ứng dụng cho phép quản lý sản phẩm, danh mục, đơn hàng và tài khoản khách hàng, đồng thời cung cấp giao diện quản trị (admin) và giao diện người dùng (user).  

**Các tính năng chính:**
- Trang người dùng: xem sản phẩm, tìm kiếm, lọc, xem chi tiết sản phẩm, quản lý đơn hàng cá nhân, mua hàng.
- Trang quản trị: thêm, sửa, xóa sản phẩm, đơn hàng và tài khoản người dùng.
  
**Công nghệ sử dụng:**
- **Backend:** Node.js, Express, MySQL
- **Frontend:** EJS, CSS, JavaScript, FontAwesome
- **Database:** MySQL

## Cài đặt
**1. Clone repository về máy:**
- git clone [<url-repo>](https://github.com/HoNgocVy05/ClothingShop.git)
- cd ClothingShop

**2. Clone repository về máy:**
- npm install

**3. Tạo file .env với các biến môi trường:**
```bash
PORT=3000
mySqlPort=3306
mySqlHost=localhost
mySqlUser=root
mySqlPassword=''
mySqlDb=clothingShop
```

4. Import database MySQL từ file database.sql có sẵn.

## Chạy dự án
npm start
Mở trình duyệt và truy cập: http://localhost:3000

