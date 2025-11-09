//get trang chủ 
exports.getIndex = (req, res) => {
    res.render('user/index', {layout: './layouts/userMaster', title: 'VPQ Studio - Trang chủ'});
    // 'user/index' là đường dẫn tới file ejs
    // layout: './layouts/userMaster' là đường dẫn tới file layout
    // title: 'VPQ Studio - Trang chủ' là tiêu đề của trang
};