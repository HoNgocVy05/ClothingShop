    // exports.getUserPage = (req, res) => {
    //     res.render('user/userPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Người dùng', activePage: 'change-password'});
    // };
    exports.getUserInfo = (req, res) => {
        res.render('user/userInfo',  {layout: './layouts/userMaster', title: 'VPQ Studio - Thông tin người dùng'});
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