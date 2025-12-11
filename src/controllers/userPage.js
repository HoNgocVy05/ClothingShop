    // exports.getUserPage = (req, res) => {
    //     res.render('user/userPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Người dùng', activePage: 'change-password'});
    // };
    const User = require('../models/userModel');
    const db = require('../models/database');
    exports.getUserInfo = async (req, res) => {
        if (!req.session.user) return res.redirect('/login');

        try {
            const user = await User.findById(req.session.user.id);
            if (!user) return res.redirect('/login'); 

            res.render('user/userInfo', {
                layout: './layouts/userMaster',
                title: 'VPQ Studio - Thông tin người dùng',
                user: user 
            });
        } catch (err) {
            console.error(err);
            res.redirect('/'); 
        }
    };
    exports.getMyOrder = async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    
    const userId = req.session.user.id;

    try {
        const [orders] = await db.query(`SELECT * FROM orders WHERE user_id=?`, [userId]);

        for (let order of orders) {
            const [items] = await db.query(`SELECT * FROM order_items WHERE order_id=?`, [order.id]);
            order.items = items;
        }

        res.render('user/myOrder', { 
            layout: './layouts/userMaster', 
            title: 'VPQ Studio - Đơn hàng của tôi', 
            orders
        });

    } catch(e) {
        console.log(e);
        res.send("Lỗi tải đơn hàng");
    }
};
    exports.getChangePassword = (req, res) => {
        res.render('user/changePassword', {layout: './layouts/userMaster', title: 'VPQ Studio - Thay đổi mật khẩu'});
    };
    exports.getMyOrderDetail = (req, res) => {
        res.render('user/myOrderDetail', {layout: './layouts/userMaster', title: 'VPQ Studio - Chi tiết đơn hàng'});
    };  
    exports.updateUserInfo = async (req, res) => {
    try {
        const { fullname, address, dayOfBirth, gender, email, phoneNumber } = req.body;
        const userId = req.session.user.id;

        await User.update(userId, {
            fullname,
            address,
            dayOfBirth,
            gender,
            email,
            phoneNumber
        });

        req.session.user.fullname = fullname;
        req.session.user.email = email;

        res.redirect('/user-infomation');
    } catch (error) {
        console.log(error);
        res.send("Lỗi khi cập nhật hồ sơ");
    }
};