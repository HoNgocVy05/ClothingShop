const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const searchController = require('../controllers/searchController');
const productInforController = require('../controllers/productInforController')
const productList = require('../controllers/productList');

// các trang user
router.get('/', index.getIndex);
router.get('/search',searchController.getSearchResult)
router.get('/product',productInforController.getProductInfor)
router.get('/product-list',productList.getProductList)

module.exports = router;