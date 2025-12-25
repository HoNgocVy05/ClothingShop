const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Trang login
exports.getLogin = (req, res) => {
    let message = null;
    let messageType = null; 

    // nhận thông báo từ reset mật khẩu
    if (req.query.reset === 'success') {
        message = 'Đổi mật khẩu thành công, hãy đăng nhập';
        messageType = 'success';
    }

    res.render('user/login', {
        layout: false,
        title: 'VPQ Studio - Đăng nhập',
        message,
        messageType
    });
};

// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
    const { email, password, loginType, remember } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.render('user/login', {
                layout: false,
                message: 'Email không tồn tại!',
                messageType: 'error'
            });
        }

        if (user.isActive === 0) {
            return res.render('user/login', {
                layout: false,
                message: 'Tài khoản của bạn đã bị khóa!',
                messageType: 'error'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('user/login', {
                layout: false,
                message: 'Sai mật khẩu!',
                messageType: 'error'
            });
        }

        if (user.role !== loginType) {
            return res.render('user/login', {
                layout: false,
                message: `Tài khoản này không phải ${loginType}!`,
                messageType: 'error'
            });
        }

        // Xóa session cũ
        if (loginType === 'admin') req.session.user = null;
        else req.session.admin = null;

        // Tạo session mới
        const sessionData = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        };

        if (loginType === 'admin') {
            req.session.admin = sessionData;
        } else {
            req.session.user = sessionData;
        }

        // Remember login
        if (remember) {
            const token = crypto.randomBytes(32).toString('hex');
            await User.saveRememberToken(user.id, token);

            res.cookie('remember_token', token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
        }

        return loginType === 'admin'
            ? res.redirect('/admin/dashboard')
            : res.redirect('/');

    } catch (err) {
        console.error("Lỗi đăng nhập:", err);
        return res.render('user/login', {
            layout: false,
            message: 'Lỗi hệ thống!',
            messageType: 'error'
        });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        // Nếu là user → xóa remember_token trong DB
        if (req.session.user) {
            await User.clearRememberToken(req.session.user.id);
        }

        // Nếu là admin (nếu admin cũng có remember_token thì xử lý tương tự)
        if (req.session.admin) {
            await User.clearRememberToken(req.session.admin.id);
        }

        // Xóa cookie remember_token
        res.clearCookie('remember_token', {
            httpOnly: true,
            path: '/'
        });

        // Hủy session
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.redirect('/');
            }

            // Redirect đúng trang
            const redirectUrl = req.originalUrl.startsWith('/admin')
                ? '/admin/login'
                : '/login';

            res.redirect(redirectUrl);
        });

    } catch (err) {
        console.error('Logout exception:', err);
        res.redirect('/');
    }
};