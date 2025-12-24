const express = require('express');
const router = express.Router();
const adminPage = require('../controllers/adminPage');
const { checkAdmin } = require('../middleware/auth');
const AdminUser = require('../models/adminUserModel');
const Category = require('../models/categoryModel');
const login = require('../controllers/login');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');

//các trang admin 
// router.get('/admin', checkAdmin, adminPage.getAdminPage);
router.get('/dashboard', checkAdmin, adminPage.getDashboard);
router.get('/product-management',checkAdmin, adminPage.getProductManagement);
router.get('/catalog-management', checkAdmin, adminPage.getCatalogManagement);
router.post('/catalog-management/update/:id', adminPage.updateCategory);
router.get('/order-management', checkAdmin, adminPage.getOrderManagement);
router.get('/account-management', checkAdmin, adminPage.getAccountManagement);
router.get('/login', login.getLogin);
router.post('/login', login.postLogin);

router.post('/account-management/delete', checkAdmin, async (req, res) => {
    const { id } = req.body;
    try {
        await AdminUser.delete(id);
        res.json({ success: true, message: 'Xóa thành công!' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Xóa thất bại!' });
    }
});

router.post('/account-management/toggle-status', checkAdmin, async (req, res) => {
    const { id, status } = req.body;
    try {
        await AdminUser.updateStatus(id, status);
        res.json({
            success: true,
            message: status ? 'Mở khóa thành công!' : 'Khóa thành công!'
        });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Cập nhật thất bại!' });
    }
});


router.post('/catalog-management/add', checkAdmin, async (req, res) => {
    const { name, parent_id } = req.body;
    try {
        await Category.add(name, parent_id);
        res.redirect('/admin/catalog-management');
    } catch (err) {
        console.error(err); 
        res.redirect('/admin/catalog-management');
    }
});

router.post('/catalog-management/delete/:id', checkAdmin, async (req, res) => {
        try {
            const { id } = req.params;

            await Category.delete(id);

            res.redirect('/admin/catalog-management');
        } catch (err) {
            console.error(err);
            res.redirect('/admin/catalog-management');
        }
    }
);
router.get('/order/:id', checkAdmin, adminPage.getOrderDetail);
router.post('/order/:id/update-status', checkAdmin, adminPage.updateOrderStatus);

module.exports = router;