exports.getProductInfor = (req, res) => {
    res.render('user/productInfor', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Sản phẩm'
    });
};
