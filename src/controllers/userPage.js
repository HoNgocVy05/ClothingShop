exports.getUserPage = (req, res) => {
    res.render('user/userPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Người dùng'});
};
exports.getUserInfo = (req, res) => {
    res.render('user/userInfo', {layout: false});
};
exports.getMyOrder = (req, res) => {
    res.render('user/myOrder', {layout: false});
};
exports.getChangePassword = (req, res) => {
    res.render('user/changePassword', {layout: false});
};