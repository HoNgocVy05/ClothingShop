const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const searchController = require('../controllers/searchController');
const productInforController = require('../controllers/productInforController');
const productList = require('../controllers/productList');
const cartController = require('../controllers/cartController');
const shopping = require('../controllers/shopping');
const login = require('../controllers/login');
const signin = require('../controllers/signin');
const userPage = require('../controllers/userPage');
const support = require('../controllers/support');

// các trang user
router.get('/', index.getIndex);
router.get('/search',searchController.getSearchResult)
router.get('/product',productInforController.getProductInfor)
router.get('/product-list',productList.getProductList)
router.get('/product-infomation',productInforController.getProductInfor)
router.get('/cart',cartController.getShoppingCart)
router.get('/shopping',shopping.getShoppingPage)
router.get('/login',login.getLogin)
router.get('/signin',signin.getSignin)
router.get('/user',userPage.getUserPage)
router.get('/user-infomation',userPage.getUserInfo)
router.get('/my-order',userPage.getMyOrder)
router.get('/change-password',userPage.getChangePassword)
router.get('/my-order-detail',userPage.getMyOrderDetail)
router.get('/contact',support.getContactPage)
router.get('/size',support.getSizePage)
router.get('/return-policy',support.getReturnPolicyPage)

module.exports = router;