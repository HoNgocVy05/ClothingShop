exports.getContactPage = (req, res) => {
    res.render('user/contactPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Liên hệ'});
};
exports.getSizePage = (req, res) => {
    res.render('user/sizePage', {layout: './layouts/userMaster', title: 'VPQ Studio - Hướng dẫn chọn size'});
};
exports.getReturnPolicyPage = (req, res) => {
    res.render('user/returnPolicy', {layout: './layouts/userMaster', title: 'VPQ Studio - Hướng dẫn đổi trả hàng'});
};