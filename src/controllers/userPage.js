exports.getUserPage = (req, res) => {
    res.render('user/userPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Người dùng'});
};