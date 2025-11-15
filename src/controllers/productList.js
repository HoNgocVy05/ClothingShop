exports.getProductList = (req, res) => {
    res.render('user/productList', {layout: './layouts/userMaster', title: 'VPQ Studio - Danh sách sản phẩm'});
};