    // exports.getUserPage = (req, res) => {
    //     res.render('user/userPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Người dùng', activePage: 'change-password'});
    // };
    const User = require('../models/userModel');
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
    exports.getMyOrder = (req, res) => {
        res.render('user/myOrder', {layout: './layouts/userMaster', title: 'VPQ Studio - Đơn hàng của tôi'});
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