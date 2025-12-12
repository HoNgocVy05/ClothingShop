const db = require('../models/database');
const Product = require('../models/productModel');

exports.getProductInfor = async (req, res) => {
    const id = req.query.id;
    const cart = req.session.cart || [];
    const userId = req.session.user?.id;
    let totalQuantity = 0;

    if (userId) {
        totalQuantity = await Cart.countCartRowsByUser(userId);
    }

    if (!id) {
        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: 'Không tìm thấy sản phẩm',
            product: null,
            totalQuantity
        });
    }

    try {
        const product = await Product.getById(id);

        if (!product) {
            return res.render('user/productInfor', {
                layout: './layouts/userMaster',
                title: 'Không tìm thấy sản phẩm',
                product: null,
            totalQuantity
            });
        }

        // Lấy ảnh chính
        let mainImage = '';
        let imagesArray = [];
        try {
            imagesArray = JSON.parse(product.images);
            if (Array.isArray(imagesArray) && imagesArray.length > 0) {
                mainImage = imagesArray[0];
            }
        } catch (err) {
            mainImage = '';
            imagesArray = [];
        }

        // Thêm trường image và imagesArray cho EJS
        product.image = mainImage;
        product.imagesArray = imagesArray;

        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: `${product.name} - VPQ Studio`,
            product,
            totalQuantity
        });

    } catch (err) {
        console.log(err);
        return res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: 'Lỗi hệ thống',
            product: null,
            totalQuantity
        });
    }
};
