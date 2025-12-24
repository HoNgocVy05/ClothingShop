    const productModel = require('../models/productModel');
    const categoryModel = require('../models/categoryModel');

    const formatPrice = (price) => {
        if (!price && price !== 0) return '0';
        return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    exports.getProductList = async (req, res) => {
        try {
            const categoryId = req.query.category || null;
            const isSale = req.query.sale === "1" ? true : false;

            // price: 0-200, 200-500, 500-1000, 1000+
            const priceRange = req.query.price || null;
            // size: S, M, L, XL
            const size = req.query.size || null;
            const sort = req.query.sort || null;

            let products = await productModel.filterProducts({
                categoryId,
                isSale,
                priceRange,
                size,
                sort
            });

            const categories = await categoryModel.getAll();
            let selectedCategoryName = null;

            if (req.query.category) {
                const cat = categories.find(c => c.id == req.query.category);
                if (cat) selectedCategoryName = cat.name;
            }
            res.render('user/productList', {
                layout: './layouts/userMaster',
                title: 'VPQ Studio - Danh sách sản phẩm',
                products,
                categories,
                activeCategory: categoryId,
                formatPrice,
                selectedCategoryName,
                selected: { priceRange, size, isSale }
            });

        } catch (err) {
            console.error("Error loading product list:", err);
            res.status(500).send("ERROR");
        }
    };
