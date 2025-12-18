const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Cart = require('../models/cartModel');

const formatPrice = (price) => {
    if (!price && price !== 0) return '0';
    return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

exports.getIndex = async (req, res) => {
    try {
        // 1. Lấy toàn bộ sản phẩm
        const allProducts = await Product.getAll();

        // 2. Lấy toàn bộ sản phẩm SALE
        const allSaleProducts = allProducts.filter(
            p => p.discount_percent && p.discount_percent > 0
        );

        // 3. Lấy TOP 10 SALE
        const saleTop10 = allSaleProducts.slice(0, 10);
        const saleTop10Ids = saleTop10.map(p => p.id);

        // 4. Lấy category
        const allCategories = await Category.getAll();
        const parentCategories = allCategories.filter(c => !c.parent_id);

        // 5. Gắn sản phẩm cho từng category (KHÔNG TRÙNG SALE)
        const categoriesWithProducts = parentCategories.map(parent => {
            const children = allCategories.filter(c => c.parent_id === parent.id);
            const categoryIds = [parent.id, ...children.map(c => c.id)];

            const products = allProducts
                .filter(p => categoryIds.includes(p.category_id))
                .filter(p => !saleTop10Ids.includes(p.id)) // 🔥 loại sale top 10
                .slice(0, 10);

            return {
                ...parent,
                children,
                products
            };
        });

        // 6. Giỏ hàng
        const userId = req.session.user?.id;
        let totalQuantity = 0;
        if (userId) {
            totalQuantity = await Cart.countCartRowsByUser(userId);
        }

        res.render('user/index', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Trang chủ',

            saleTop10,                // 👈 CHỈ GỬI 10 SALE
            categoriesWithProducts,   // 👈 ĐÃ LỌC

            formatPrice,
            totalQuantity
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi load trang chủ');
    }
};