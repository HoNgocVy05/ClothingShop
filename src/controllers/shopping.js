exports.getShoppingPage = (req, res) => {
    res.render('user/shoppingPage', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Mua hàng'
    });
};