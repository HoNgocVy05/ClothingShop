const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', {layout: './layouts/adminMaster',title: 'VPQ Studio - Dashboard'});
};
exports.getProductManagement = (req, res) => {
     res.render('admin/productManagement', {layout: './layouts/adminMaster',title: 'VPQ Studio - Quản lý sản phẩm'});
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