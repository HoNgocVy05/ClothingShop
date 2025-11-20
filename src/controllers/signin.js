exports.getSignin = (req, res) => {
    res.render('user/signin', {
        layout: false,
        title: 'VPQ Studio - Đăng ký'
    });
};