const Product = require('../models/productModel');

exports.getSearchResult = async (req, res) => {
    try {
        const searchQuery = req.query.q || ''; // lấy từ form
        let products = [];

        if (searchQuery) {
            products = await Product.searchByName(searchQuery);
        }

        res.render('user/searchResult', {
            layout: './layouts/userMaster',
            title: `VPQ Studio - Tìm kiếm: ${searchQuery}`,
            isSearch: true,
            searchQuery,
            products
        });
    } catch (err) {
        console.error(err);
        res.render('user/searchResult', {
            layout: './layouts/userMaster',
            title: 'VPQ Studio - Tìm kiếm',
            isSearch: true,
            searchQuery: '',
            products: []
        });
    }
};
