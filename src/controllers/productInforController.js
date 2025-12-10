const Product = require('../models/productModel');

exports.getProductInfor = async (req, res) => {

    const id = req.query.id;

    if (!id) {
        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: 'Không tìm thấy sản phẩm',
            product: null
        });
    }

    try {
        const product = await Product.getById(id);

        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: product ? `${product.name} - VPQ Studio` : 'Không tìm thấy sản phẩm',
            product
        });

    } catch (err) {
        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: 'Lỗi hệ thống',
            product: null
        });
    }
};
