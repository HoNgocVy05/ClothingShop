// src/controllers/signin.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // dùng bcryptjs cho Windows

exports.getSignin = (req, res) => {
    res.render('user/signin', {
        layout: false,
        title: 'VPQ Studio - Đăng ký',
        message: null
    });
};

exports.postSignin = async (req, res) => {
    try {
        const { fullname, email, password, confirmPassword } = req.body;

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            return res.render('user/signin', {
                layout: false,
                title: 'VPQ Studio - Đăng ký',
                message: "Mật khẩu nhập lại không trùng!"
            });
        }

        // Kiểm tra email đã tồn tại
        const user = await User.findByEmail(email);
        if (user) {
            return res.render('user/signin', {
                layout: false,
                title: 'VPQ Studio - Đăng ký',
                message: "Email đã tồn tại!"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        await User.create(fullname, email, hashedPassword);

        // Redirect sang login
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.render('user/signin', {
            layout: false,
            title: 'VPQ Studio - Đăng ký',
            message: "Đăng ký thất bại, thử lại sau!"
        });
    }
};
