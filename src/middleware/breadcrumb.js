module.exports = function breadcrumb(req, res, next) {
    const path = req.path;

    // Danh sách route cha–con
    const parentMap = {
        "my-order-detail": "my-orders",
        "product-detail": "product-list",
        "cart": "product-infomation",
        "product-infomation": "product-list",
        "shopping": "product-infomation",
        "shopping": "cart"
    };

    const segments = path.split('/').filter(Boolean);

    // Nếu là trang con → thêm segment cha vào trước
    const first = segments[0];
    if (parentMap[first]) {
        segments.unshift(parentMap[first]);
    }

    const mapName = (segment) => {
        switch (segment) {
            case 'product-list':
                return 'Sản phẩm';
            case 'product-detail':
                return 'Chi tiết sản phẩm';
            case 'cart':
                return 'Giỏ hàng';
            case 'product-infomation':
                return 'Thông tin sản phẩm';
            case 'user-infomation':
                return 'Thông tin người dùng';
            case 'contact':
                return 'Liên hệ';
            case 'return-policy':
                return 'Hướng dẫn đổi trả';
            case 'size':
                return 'Hướng dẫn chọn size';
            case 'my-order':
                return 'Đơn hàng của tôi';
            case 'my-order-detail':
                return 'Chi tiết đơn hàng';
            default:
                return segment.replace(/-/g, ' ');
        }
    };

    const breadcrumbs = segments.map(seg => ({
        name: mapName(seg),
        url: '/' + seg
    }));

    res.locals.breadcrumbs = breadcrumbs;
    next();
};
