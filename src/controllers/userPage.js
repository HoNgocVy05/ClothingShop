const User = require('../models/userModel');
const db = require('../models/database');

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
        const [orders] = await db.query(`SELECT * FROM orders WHERE user_id=?`, [currentUser.id]);
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
        title: 'VPQ Studio - Thay đổi mật khẩu'
    });
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
