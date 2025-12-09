const express = require('express');
const router = express.Router();
const adminPage = require('../controllers/adminPage');
const { checkAdmin } = require('../middleware/auth');

//các trang admin 
// router.get('/admin', checkAdmin, adminPage.getAdminPage);
router.get('/admin/dashboard', checkAdmin, adminPage.getDashboard);
router.get('/admin/product-management', adminPage.getProductManagement);
router.get('/admin/catalog-management', checkAdmin, adminPage.getCatalogManagement);
router.get('/admin/order-management', checkAdmin, adminPage.getOrderManagement);
router.get('/admin/account-management', checkAdmin, adminPage.getAccountManagement);

module.exports = router;
