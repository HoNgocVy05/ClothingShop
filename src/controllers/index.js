const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Format giá tiền: 185938 -> "185,938"
const formatPrice = (price) => {
    if (!price && price !== 0) return '0';
    return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

exports.getIndex = async (req, res) => {
    try {
        // Lấy sản phẩm có discount > 0, tối đa 20
        const allProducts = await Product.getAll();
        const saleProducts = allProducts
            .filter(p => p.discount_percent && p.discount_percent > 0)
            .slice(0, 20);

        // Lấy tất cả categories
        const allCategories = await Category.getAll();

        // Tìm categories cha (parent_id = null)
        const parentCategories = allCategories.filter(c => !c.parent_id);

        // Với mỗi category cha, lấy children và sản phẩm
        const categoriesWithProducts = parentCategories.map(parent => {
            const childCategories = allCategories.filter(c => c.parent_id === parent.id);
            const childIds = [parent.id, ...childCategories.map(c => c.id)];
            
            // Lấy tối đa 10 sản phẩm từ category cha + các con
            const products = allProducts
                .filter(p => childIds.includes(p.category_id))
                .slice(0, 10);

            return {
                ...parent,
                children: childCategories,
                products: products
            };
        });

        res.render('user/index', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Trang chủ',
            saleProducts: saleProducts || [],
            categoriesWithProducts: categoriesWithProducts || [],
            formatPrice: formatPrice
        });
    } catch (err) {
        console.error('Index page error:', err);
        res.status(500).send('Lỗi load trang chủ');
    }
};