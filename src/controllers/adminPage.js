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
    const [categories, products] = await Promise.all([
        Category.getAll(),
        Product.getAll()
    ]);
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
