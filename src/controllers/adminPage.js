const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const AdminUser = require('../models/adminUserModel');


exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', {
        layout: './layouts/adminMaster',
        title: 'VPQ Studio - Dashboard'
    });
};

// Quản lý sản phẩm
exports.getProductManagement = async (req, res) => {
    const message = req.session.message;
    req.session.message = null;

    try {
        const [rawCategories, products] = await Promise.all([
            Category.getAll(),
            Product.getAll()
        ]);

        const catMap = {};
        rawCategories.forEach(c => { catMap[c.id] = { ...c }; });

        const buildPath = (cat) => {
            const parts = [];
            let cur = cat;
            const seen = new Set();
            while (cur) {
                if (seen.has(cur.id)) break;
                seen.add(cur.id);
                parts.unshift(cur.name);
                if (!cur.parent_id) break;
                cur = catMap[cur.parent_id];
            }
            return parts.join(' > ');
        };

        const categories = rawCategories.map(c => ({
            ...c,
            full_name: buildPath(c)
        })).sort((a, b) => a.full_name.localeCompare(b.full_name, 'vi'));

        res.render('admin/productManagement', {
            layout: './layouts/adminMaster',
            title: 'VPQ Studio - Quản lý sản phẩm',
            categories,
            products,
            message
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi load trang quản lý sản phẩm');
    }
};

exports.getCatalogManagement = (req, res) => {
    res.render('admin/catalogManagement', {
        layout: './layouts/adminMaster',
        title: 'VPQ Studio - Quản lý danh mục'
    });
};

exports.getOrderManagement = (req, res) => {
    res.render('admin/orderManagement', {
        layout: './layouts/adminMaster',
        title: 'VPQ Studio - Quản lý đơn hàng'
    });
};

exports.getAccountManagement = async (req, res) => {
    const users = await AdminUser.getAll();
    const adminEmail = req.session.admin.email;
    const mainAdminEmail = 'ngocvy@gmail.com'; 
    res.render('admin/accountManagement', { 
        layout: './layouts/adminMaster', 
        title: 'VPQ Studio - Quản lý tài khoản', 
        users, 
        adminEmail,
        mainAdminEmail
    });
};



exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Thiếu ID' });

    try {
        await AdminUser.delete(id);
        res.json({ success: true, message: 'Xóa tài khoản thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi xóa tài khoản' });
    }
};

exports.toggleUserStatus = async (req, res) => {
    const { id, status } = req.body;
    if (!id) return res.status(400).json({ success: false, message: 'Thiếu ID' });

    try {
        await AdminUser.updateStatus(id, status); 
        res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi cập nhật trạng thái' });
    }
};

