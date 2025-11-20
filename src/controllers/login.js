exports.getLogin = (req, res) => {
    res.render('user/login', {
        layout: false,
        title: 'VPQ Studio - Đăng nhập'
    });
};