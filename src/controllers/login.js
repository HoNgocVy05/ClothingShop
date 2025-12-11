const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    const rememberedEmail = req.cookies?.rememberedEmail || '';
    res.render('user/login', {
        layout: false,
        title: 'VPQ Studio - Đăng nhập',
        message: null,
        rememberedEmail
    });
};

exports.postLogin = async (req, res) => {
    const rememberedEmail = req.cookies?.rememberedEmail || '';
    const { email, password, loginType, remember } = req.body; // Lấy luôn remember

    const user = await User.findByEmail(email);

    if (!user) {
        return res.render('user/login', { layout: false, message: "Email không tồn tại!", rememberedEmail });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('user/login', { layout: false, message: "Sai mật khẩu!", rememberedEmail });
    }

    if (user.role !== loginType) {
        return res.render('user/login', { layout: false, message: `Tài khoản này không phải ${loginType}!`, rememberedEmail });
    }

    // Lưu session
    req.session.user = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    };

    // ghi nhớ 
    if (remember) {
    res.cookie('rememberedEmail', user.email, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    });
    } else {
        res.clearCookie('rememberedEmail');
    }

    return loginType === "admin" ? res.redirect('admin/dashboard') : res.redirect('/');
};

