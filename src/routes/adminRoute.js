const express = require('express');
const router = express.Router();
const adminPage = require('../controllers/adminPage');

//các trang admin 
router.get('/admin', adminPage.getAdminPage);
router.get('/dashboard', adminPage.getDashboard);
router.get('/product-management', adminPage.getProductManagement);
router.get('/catalog-management', adminPage.getCatalogManagement);
router.get('/order-management', adminPage.getOrderManagement);
router.get('/account-management', adminPage.getAccountManagement);

module.exports = router;