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
const { checkLogin, redirectIfLoggedIn } = require('../middleware/auth');

// các trang user
router.get('/', index.getIndex);
router.get('/search',searchController.getSearchResult)
router.get('/product',productInforController.getProductInfor)
router.get('/product-list',productList.getProductList)
router.get('/product-infomation',productInforController.getProductInfor)
router.get('/cart',checkLogin,cartController.getShoppingCart)
router.get('/shopping',checkLogin,shopping.getShoppingPage)
router.get('/login',redirectIfLoggedIn,login.getLogin)
router.get('/signin',redirectIfLoggedIn,signin.getSignin)
// router.get('/user',checkLogin,userPage.getUserPage)
// router.get('/user',checkLogin,userPage.getUserPage)
router.get('/user-infomation',checkLogin,userPage.getUserInfo)
router.get('/my-order',checkLogin,userPage.getMyOrder)
router.get('/change-password',checkLogin,userPage.getChangePassword)
router.get('/my-order-detail',checkLogin,userPage.getMyOrderDetail)
router.get('/contact',support.getContactPage)
router.get('/size',support.getSizePage)
router.get('/return-policy',support.getReturnPolicyPage)
router.post('/login',redirectIfLoggedIn, login.postLogin);
router.post('/signin',redirectIfLoggedIn, signin.postSignin);
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});
router.post('/update-user', checkLogin, userPage.updateUserInfo);


module.exports = router;