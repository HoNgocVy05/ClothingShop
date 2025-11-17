exports.getShoppingCart = (req, res) => {
    res.render('user/shoppingCart', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Giỏ hàng'
    });
};