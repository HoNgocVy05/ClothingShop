exports.getIndex = (req, res) => {
    res.render('user/index', {layout: './layouts/userMaster', title: 'VPQ Studio - Trang chủ'});
};