const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const AdminUser = require('../models/adminUserModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');


exports.getDashboard = async (req, res) => {
    try {
        const totalSold = await orderModel.getTotalSoldProducts();
        const totalOrders = await orderModel.getTotalOrders();
        const totalRevenue = await orderModel.getTotalRevenue();
        const totalUsers = await orderModel.getNewUsersCount();

        const bestSellers = await productModel.getBestSellers(5);
        const lowStockProducts = await productModel.getLowStockBySize(10);

        res.render('admin/dashboard', {
            layout: './layouts/adminMaster',
            title: 'VPQ Studio - Dashboard',
            totalSold,
            totalOrders,
            totalRevenue,
            totalUsers,
            bestSellers,
            lowStocks: lowStockProducts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
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

exports.getCatalogManagement = async (req, res) => {
    try {
        const allCategories = await Category.getAll();

        const male = allCategories
            .filter(c => c.id === 1)
            .map(parent => ({
                ...parent,
                children: allCategories.filter(c => c.parent_id === 1)
            }));

        const female = allCategories
            .filter(c => c.id === 2)
            .map(parent => ({
                ...parent,
                children: allCategories.filter(c => c.parent_id === 2)
            }));

        res.render('admin/catalogManagement', {
            layout: './layouts/adminMaster',
            title: 'VPQ Studio - Quản lý danh mục',
            categories: { male, female }
        });
    } catch (err) {
        console.error(err);
        res.render('admin/catalogManagement', {
            layout: './layouts/adminMaster',
            categories: { male: [], female: [] }
        });
    }
};


exports.getOrderManagement = async (req, res) => {
    try {
        const q = req.query.q || '';

        // Lấy tất cả đơn hàng
        let orders = await orderModel.getAllOrders(); // [{id, order_code, created_at, user_name, total_price, payment_method, status, products[]}, ...]

        // Lọc theo mã đơn hàng nếu có query
        if (q) {
            orders = orders.filter(order => {
                const code = order.order_code ? order.order_code.toString().toLowerCase() : '';
                return code.includes(q.toLowerCase());
            });
        }

        // Thống kê số lượng đơn hàng theo trạng thái
        const stats = {
            pending: orders.filter(o => o.status === 'Chờ xác nhận').length,
            picking: orders.filter(o => o.status === 'Chờ lấy hàng').length,
            shipping: orders.filter(o => o.status === 'Đang giao hàng').length,
            delivered: orders.filter(o => o.status === 'Đã giao').length
        };

        res.render('admin/orderManagement', {
            layout: './layouts/adminMaster',
            title: 'VPQ Studio - Quản lý đơn hàng',
            orders,
            stats,
            q
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
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
exports.updateName = async (id, name) => {
    await db.query(
        'UPDATE categories SET name=? WHERE id=?',
        [name, id]
    );
};
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        await Category.update(id, name);

        return res.redirect('/admin/catalog-management');
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi cập nhật danh mục');
    }
};


