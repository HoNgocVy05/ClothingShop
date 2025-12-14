const User = require('../models/userModel');
const db = require('../models/database');
const bcrypt = require('bcryptjs');

exports.getUserInfo = async (req, res) => {
    const currentUser = req.session.user;
    if (!currentUser) return res.redirect('/login');

    try {
        const user = await User.findById(currentUser.id);
        if (!user) return res.redirect('/login');

        res.render('user/userInfo', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Thông tin người dùng',
            user
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.getMyOrder = async (req, res) => {
    const currentUser = req.session.user;
    if (!currentUser) return res.redirect('/login');

    try {
        const [orders] = await db.query(`SELECT * FROM orders WHERE user_id=? ORDER BY id DESC`, [currentUser.id]);
        for (let order of orders) {
            const [items] = await db.query(`SELECT * FROM order_items WHERE order_id=?`, [order.id]);
            order.items = items;
        }

        res.render('user/myOrder', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Đơn hàng của tôi',
            orders
        });
    } catch (err) {
        console.log(err);
        res.send("Lỗi tải đơn hàng");
    }
};

exports.getChangePassword = (req, res) => {
    res.render('user/changePassword', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Thay đổi mật khẩu',
        message: null,
        error: null
    });
};

exports.postChangePassword = async (req, res) => {
    const currentUser = req.session.user;
    if (!currentUser) return res.redirect('/login');

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.render('user/changePassword', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Thay đổi mật khẩu',
            message: null,
            error: 'Vui lòng điền đầy đủ thông tin.'
        });
    }

    if (newPassword !== confirmPassword) {
        return res.render('user/changePassword', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Thay đổi mật khẩu',
            message: null,
            error: 'Mật khẩu mới và xác nhận mật khẩu không khớp.'
        });
    }

    try {
        const user = await User.findById(currentUser.id);

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.render('user/changePassword', {
                layout: './layouts/userMaster',
                title: 'VPQ Studio - Thay đổi mật khẩu',
                message: null,
                error: 'Mật khẩu hiện tại không đúng.'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(currentUser.id, hashedPassword);

        res.render('user/changePassword', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Thay đổi mật khẩu',
            message: 'Đổi mật khẩu thành công!',
            error: null
        });

    } catch (err) {
        console.error(err);
        res.render('user/changePassword', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Thay đổi mật khẩu',
            message: null,
            error: 'Đã có lỗi xảy ra, vui lòng thử lại.'
        });
    }
};

exports.getMyOrderDetail = (req, res) => {
    res.render('user/myOrderDetail', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Chi tiết đơn hàng'
    });
};

exports.updateUserInfo = async (req, res) => {
    const currentUser = req.session.user;
    if (!currentUser) return res.redirect('/login');

    try {
        const { fullname, address, dayOfBirth, gender, email, phoneNumber, bio } = req.body;

        await User.update(currentUser.id, { fullname, address, dayOfBirth, gender, email, phoneNumber, bio });

        // Cập nhật lại session user
        req.session.user.fullname = fullname;
        req.session.user.email = email;

        res.redirect('/user-infomation');
    } catch (err) {
        console.log(err);
        res.send("Lỗi khi cập nhật hồ sơ");
    }
};
