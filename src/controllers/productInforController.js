const db = require('../models/database');

exports.getProductInfor = async (req, res) => {
    const productId = req.query.id;

    if (!productId) return res.send("Thiếu ID sản phẩm!");

    try {
        const [result] = await db.query("SELECT * FROM products WHERE id=?", [productId]);

        if (result.length === 0) return res.send("Không tìm thấy sản phẩm!");

        const product = result[0];

        // Lấy ảnh đầu tiên từ JSON
        let mainImage = '';
        try {
            const imgs = JSON.parse(product.images);
            if (Array.isArray(imgs) && imgs.length > 0) mainImage = imgs[0];
        } catch (err) {
            mainImage = '';
        }
        product.image = mainImage; // thêm để EJS dùng

        // Nếu muốn, có thể lưu luôn mảng images để hiển thị thumbnails
        try {
            product.imagesArray = JSON.parse(product.images);
        } catch(err) {
            product.imagesArray = [];
        }

        res.render('user/productInfor', {
            layout: './layouts/userMaster',
            title: product.name,
            product
        });

    } catch (err) {
        console.log(err);
        res.send("Lỗi lấy sản phẩm!");
    }
};
