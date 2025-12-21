require('dotenv').config(); //load biến môi trường từ file .env
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const Category = require('./src/models/categoryModel');
const cartMiddleware = require('./src/middleware/cartMiddleware');
const cookieParser = require('cookie-parser');
const breadcrumb = require('./src/middleware/breadcrumb');
const User = require('./src/models/userModel');


const app = express();


app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// middleware parse JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

//session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(cartMiddleware);
app.use(breadcrumb);

app.use(async (req, res, next) => {
    if (!req.session.user && req.cookies.remember_token) {
        const user = await User.findByRememberToken(req.cookies.remember_token);
        if (user) {
            req.session.user = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            };
        }
    }
    next();
});
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.admin = req.session.admin || null;
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
app.use('/admin', adminRoute);
app.use('/', actionRoute);

// chạy server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server đang chạy...');
  console.log(PORT)
});