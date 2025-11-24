exports.getAdminPage = (req, res) => {
    res.render('admin/adminPage', {layout: './layouts/adminMaster', title: 'VPQ Studio - Quản trị viên'});
};
exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', {layout: false});
};
exports.getProductManagement = (req, res) => {
    res.render('admin/productManagement', {layout: false});
};
exports.getCatalogManagement = (req, res) => {
    res.render('admin/catalogManagement', {layout: false});
};
exports.getOrderManagement = (req, res) => {
    res.render('admin/orderManagement', {layout: false});
};
exports.getAccountManagement = (req, res) => {
    res.render('admin/accountManagement', {layout: false});
};