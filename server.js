require('dotenv').config(); //load biến môi trường từ file .env
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.urlencoded({ extended: true }));

//cấu hình EJS và đường dẫn tới thư mục views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//layout master
app.use(expressLayouts);
app.set('layout', './layouts/userMaster');

//route
const userRoute = require('./src/routes/userRoute');
const adminRoute = require('./src/routes/adminRoute');
const actionRoute = require('./src/routes/actionRoute');
app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use('/', actionRoute);

// chạy server 
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
