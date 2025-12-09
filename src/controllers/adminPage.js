const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', {layout: './layouts/adminMaster',title: 'VPQ Studio - Dashboard'});
};
//quản lý sản phẩm
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

    res.render('admin/productManagement', {layout: './layouts/adminMaster',title: 'VPQ Studio - Quản lý sản phẩm', categories, products, message});
  } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi load trang quản lý sản phẩm');
  }
};
exports.getCatalogManagement = (req, res) => {
    res.render('admin/catalogManagement', {layout: './layouts/adminMaster',title: 'VPQ Studio - Quản lý danh mục'});
};
exports.getOrderManagement = (req, res) => {
    res.render('admin/orderManagement', {layout: './layouts/adminMaster',title: 'VPQ Studio - Quản lý đơn hàng'});
};
exports.getAccountManagement = (req, res) => {
    res.render('admin/accountManagement', {layout: './layouts/adminMaster',title: 'VPQ Studio - Quản lý tài khoản'});
};
