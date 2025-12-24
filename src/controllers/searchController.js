const Product = require('../models/productModel');

exports.getSearchResult = async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const sort = req.query.sort || ''; // nhận sort từ query
        let products = [];

        if (searchQuery) {
            products = await Product.searchByName(searchQuery);

            // xử lý sort
            if (sort) {
                switch (sort) {
                    case 'newest':
                        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        break;
                    case 'price-asc':
                        products.sort((a, b) => a.final_price - b.final_price);
                        break;
                    case 'price-desc':
                        products.sort((a, b) => b.final_price - a.final_price);
                        break;
                    }
                }
            }

        res.render('user/searchResult', {
            layout: './layouts/userMaster',
            title: `VPQ Studio - Tìm kiếm: ${searchQuery}`,
            isSearch: true,
            searchQuery,
            sort: '',
            products
        });
    } catch (err) {
        console.error(err);
        res.render('user/searchResult', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Tìm kiếm',
            isSearch: true,
            searchQuery: '',
            sort: '',
            products: []
        });
    }
};

