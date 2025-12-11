const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Trang login
exports.getLogin = (req, res) => {
    const rememberedEmail = req.cookies?.rememberedEmail || '';
    res.render('user/login', {
        layout: false,
        title: 'VPQ Studio - Đăng nhập',
        message: null,
        rememberedEmail
    });
};

// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
    const rememberedEmail = req.cookies?.rememberedEmail || '';
    const { email, password, loginType, remember } = req.body; // loginType: 'user' hoặc 'admin'

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.render('user/login', { layout: false, message: "Email không tồn tại!", rememberedEmail });
        }

        // Kiểm tra tài khoản bị khóa
        if (user.isActive === 0) {
            return res.render('user/login', { layout: false, message: "Tài khoản của bạn đã bị khóa!", rememberedEmail });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('user/login', { layout: false, message: "Sai mật khẩu!", rememberedEmail });
        }

        if (user.role !== loginType) {
            return res.render('user/login', { layout: false, message: `Tài khoản này không phải ${loginType}!`, rememberedEmail });
        }

        // ===== Lưu session riêng cho từng role =====
        if (loginType === 'admin') {
            req.session.admin = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            };
        } else {
            req.session.user = {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            };
        }

        // ===== Ghi nhớ email nếu chọn Remember Me =====
        if (remember) {
            res.cookie('rememberedEmail', user.email, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
                httpOnly: true
            });
        } else {
            res.clearCookie('rememberedEmail');
        }

        // Chuyển hướng
        return loginType === 'admin' ? res.redirect('/admin/dashboard') : res.redirect('/');

    } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        return res.render('user/login', { layout: false, message: "Lỗi hệ thống, vui lòng thử lại!", rememberedEmail });
    }
};

// Xử lý logout chung
exports.logout = (req, res) => {
    // Xóa session riêng từng role
    if (req.session.user) req.session.user = null;
    if (req.session.admin) req.session.admin = null;

    req.session.destroy(err => {
        if (err) console.error("Lỗi logout:", err);
        // Nếu logout admin thì redirect về login admin, còn user thì về login user
        const redirectUrl = req.originalUrl.startsWith('/admin') ? '/admin/login' : '/login';
        res.redirect(redirectUrl);
    });
};
