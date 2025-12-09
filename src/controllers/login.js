const User = require('../models/userModel');

exports.getLogin = (req, res) => {
    res.render('user/login', {
        layout: false,
        title: 'VPQ Studio - Đăng nhập',
        message: null
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
        return res.render('user/login', {
            layout: false,
            title: 'VPQ Studio - Đăng nhập',
            message: "Email không tồn tại!"
        });
    }

    if (user.password !== password) {
        return res.render('user/login', {
            layout: false,
            title: 'VPQ Studio - Đăng nhập',
            message: "Sai mật khẩu!"
        });
    }

    // lưu session
    req.session.user = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    };

    // console.log('Đăng nhập thành công -> Lưu session:', req.session.user);

    // Điều hướng theo role
    if (user.role === "admin") {
        return res.redirect('/admin/dashboard');
    } else {
        return res.redirect('/');
    }
};  
