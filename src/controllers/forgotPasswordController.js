const users = require('../models/userModel');
const crypto = require('crypto');
const mailer = require('../utils/mailer');
const bcrypt = require('bcryptjs');

exports.getStep1 = (req, res) => {
    res.render('user/forgotPassword', { 
        step: 1,
        title: 'Quên mật khẩu - VPQ Studio',
        layout: false
    });
};

exports.sendCode = async (req, res) => {
    const { email } = req.body;
    const user = await users.findByEmail(email);

    if (!user) {
        return res.render('user/forgotPassword', {
            step: 1,
            error: 'Email không tồn tại',
            layout: false
        });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    req.session.forgotCode = code;
    req.session.forgotEmail = email;

    await mailer.sendMail(
        email,
        'Mã xác nhận đặt lại mật khẩu',
        `<p>Mã xác nhận của bạn là: <b>${code}</b></p>`
    );

    res.redirect('/forgot-password/verify');
};


exports.getStep2 = (req, res) => {
    if (!req.session.forgotCode) return res.redirect('/forgot-password');
    res.render('user/forgotPassword', { 
        step: 2,
        title: 'Xác nhận mã - VPQ Studio',
        layout: false
    });
};

exports.verifyCode = (req, res) => {
    const { code1, code2, code3, code4 } = req.body;
    const inputCode = `${code1}${code2}${code3}${code4}`;

    if (inputCode === req.session.forgotCode) {
        return res.redirect('/forgot-password/reset');
    } else {
        return res.render('user/forgotPassword', { 
            step: 2, 
            error: 'Mã xác nhận không đúng',
            title: 'Xác nhận mã - VPQ Studio',
            layout: false
        });
    }
};

exports.getStep3 = (req, res) => {
    if (!req.session.forgotCode) return res.redirect('/forgot-password');
    res.render('user/forgotPassword', { 
        step: 3,
        title: 'Đổi mật khẩu - VPQ Studio',
        layout: false
    });
};

exports.resetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('user/forgotPassword', {
            step: 3,
            error: 'Mật khẩu không khớp',
            layout: false
        });
    }

    const email = req.session.forgotEmail;
    const hashedPassword = await bcrypt.hash(password, 10);

    await users.updatePasswordByEmail(email, hashedPassword);

    req.session.destroy(() => {
        res.redirect('/login?reset=success');
    });
};

