const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const searchController = require('../controllers/searchController');
const productInforController = require('../controllers/productInforController');
const productList = require('../controllers/productList');
const cartController = require('../controllers/cartController');
const shopping = require('../controllers/shopping');
const userPage = require('../controllers/userPage');

// các trang user
router.get('/', index.getIndex);
router.get('/search',searchController.getSearchResult)
router.get('/product',productInforController.getProductInfor)
router.get('/product-list',productList.getProductList)
router.get('/product-infomation',productInforController.getProductInfor)
router.get('/cart',cartController.getShoppingCart)
router.get('/shopping',shopping.getShoppingPage)
router.get('/user',userPage.getUserPage)
router.get('/userInfo',userPage.getUserInfo)
router.get('/myOrder',userPage.getMyOrder)
router.get('/changePassword',userPage.getChangePassword)

module.exports = router;