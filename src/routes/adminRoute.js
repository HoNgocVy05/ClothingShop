const express = require('express');
const router = express.Router();
const adminPage = require('../controllers/adminPage');
const { checkAdmin } = require('../middleware/auth');
const AdminUser = require('../models/adminUserModel');
const Category = require('../models/categoryModel');
const login = require('../controllers/login');


//các trang admin 
// router.get('/admin', checkAdmin, adminPage.getAdminPage);
router.get('/admin/dashboard', checkAdmin, adminPage.getDashboard);
router.get('/admin/product-management',checkAdmin, adminPage.getProductManagement);
router.get('/admin/catalog-management', checkAdmin, adminPage.getCatalogManagement);
router.get('/admin/order-management', checkAdmin, adminPage.getOrderManagement);
router.get('/admin/account-management', checkAdmin, adminPage.getAccountManagement);
router.get('/admin/login', login.getLogin);
router.post('/admin/login', login.postLogin);

router.post('/admin/account-management/delete', checkAdmin, async (req, res) => {
    const { id } = req.body;
    try {
        await AdminUser.delete(id);
        res.json({ success: true, message: 'Xóa thành công!' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Xóa thất bại!' });
    }
});

router.post('/admin/account-management/toggle-status', checkAdmin, async (req, res) => {
    const { id, status } = req.body;
    try {
        await AdminUser.updateStatus(id, status);
        res.json({ success: true, message: status ? 'Mở khóa thành công!' : 'Khóa thành công!' });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Cập nhật thất bại!' });
    }
});

router.post('/admin/catalog-management/add', checkAdmin, async (req, res) => {
    const { name, gender, parent_id } = req.body;
    try {
        await Category.add(name, gender, parent_id || null);
        res.json({ success: true, message: 'Thêm danh mục thành công' });
    } catch(err) {
        console.error(err);
        res.json({ success: false, message: 'Thêm thất bại' });
    }
});

module.exports = router;
