exports.getContactPage = (req, res) => {
    res.render('user/contactPage', {layout: './layouts/userMaster', title: 'VPQ Studio - Liên hệ'});
};