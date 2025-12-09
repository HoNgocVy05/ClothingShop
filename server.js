require('dotenv').config(); //load biến môi trường từ file .env
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const Category = require('./src/models/categoryModel');


const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.urlencoded({ extended: true }));

//session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Middleware để lấy categories
app.use(async (req, res, next) => {
    try {
        const allCategories = await Category.getAll();
        const parentCategories = allCategories.filter(c => !c.parent_id);
        
        const categoriesForNav = parentCategories.map(parent => {
            const childCategories = allCategories.filter(c => c.parent_id === parent.id);
            return {
                ...parent,
                children: childCategories || []
            };
        });
        
        res.locals.categoriesForNav = categoriesForNav || [];
    } catch (err) {
        console.error('Error loading categories:', err);
        res.locals.categoriesForNav = [];
    }
    next();
});

//cấu hình EJS và đường dẫn tới thư mục views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//layout master
app.use(expressLayouts);
app.set('layout', './layouts/userMaster');
app.set('layout', './layouts/adminMaster');

//route
const userRoute = require('./src/routes/userRoute');
const adminRoute = require('./src/routes/adminRoute');
const actionRoute = require('./src/routes/actionRoute');
app.use('/', userRoute);
app.use('/', adminRoute);
app.use('/', actionRoute);

// chạy server 
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});