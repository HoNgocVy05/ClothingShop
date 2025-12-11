const db = require('../models/database');

// Lấy giỏ hàng
exports.getShoppingCart = async (req, res) => {
    let cart = [];

    if (req.session.user) {
        try {
            // Lấy từ DB nếu đã login
            const [rows] = await db.query(
                `SELECT c.product_id, c.size, c.quantity, p.name, p.price, p.images
                 FROM cart_items c
                 JOIN products p ON c.product_id = p.id
                 WHERE c.user_id = ?`,
                [req.session.user.id]
            );

            cart = rows.map(r => {
                let image = '';
                try {
                    const imgs = JSON.parse(r.images);
                    if (Array.isArray(imgs) && imgs.length > 0) image = imgs[0];
                } catch (err) {
                    image = ''; 
                }
                return {
                    productId: r.product_id,
                    name: r.name,
                    price: r.price,
                    image,
                    size: r.size,
                    quantity: r.quantity
                };
            });

            req.session.cart = cart; // lưu vào session
        } catch (err) {
            console.error("Lỗi lấy giỏ hàng:", err);
        }
    } else {
        cart = req.session.cart || [];
    }

    const totalQuantity = cart.reduce((sum, p) => sum + p.quantity, 0);
    const totalAmount = cart.reduce((sum, p) => sum + p.quantity * p.price, 0);

    res.render('user/shoppingCart', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Giỏ hàng',
        cart,
        totalQuantity,
        totalAmount
    });
};

// Thêm sản phẩm vào giỏ
exports.addToCart = async (req, res) => {
    try {
        let { productId, name, price, size, quantity } = req.body;

        console.log('addToCart payload:', { productId, name, price, size, quantity });

        if (!productId || !size) {
            return res.status(400).json({ message: 'Thiếu productId hoặc size' });
        }

        let qty = Number(quantity);
        if (!Number.isFinite(qty) || qty <= 0) qty = 1; 

        let unitPrice = Number(price) || 0;

        if (!req.session.cart) req.session.cart = [];
        const cart = req.session.cart;

        const existing = cart.find(item => item.productId == productId && item.size == size);
        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({ productId, name, price: unitPrice, size, quantity: qty, image: '' });
        }
        req.session.cart = cart;

        if (req.session.user) {
            try {
                const userId = req.session.user.id;
                const [rows] = await db.query(
                    "SELECT * FROM cart_items WHERE user_id=? AND product_id=? AND size=?",
                    [userId, productId, size]
                );
                if (rows.length > 0) {
                    await db.query(
                        "UPDATE cart_items SET quantity = quantity + ? WHERE user_id=? AND product_id=? AND size=?",
                        [qty, userId, productId, size]
                    );
                } else {
                    await db.query(
                        "INSERT INTO cart_items(user_id, product_id, size, quantity) VALUES(?,?,?,?)",
                        [userId, productId, size, qty]
                    );
                }
            } catch (err) {
                console.error("Lỗi cập nhật DB giỏ hàng:", err);
            }
        }

        const cartCount = (req.session.cart || []).reduce((acc, i) => acc + i.quantity, 0);
        res.json({ cartCount });
    } catch (err) {
        console.error("addToCart error:", err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};


// Cập nhật số lượng sản phẩm trong giỏ
exports.updateCart = async (req, res) => {
    const { productId, size, quantity } = req.body;
    const cart = req.session.cart || [];
    const item = cart.find(i => i.productId == productId && i.size == size);
    if (item) item.quantity = Number(quantity);
    req.session.cart = cart;

    if (req.session.user) {
        try {
            await db.query(
                "UPDATE cart_items SET quantity=? WHERE user_id=? AND product_id=? AND size=?",
                [quantity, req.session.user.id, productId, size]
            );
        } catch (err) {
            console.error("Lỗi cập nhật DB giỏ hàng:", err);
        }
    }

    const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    res.json({ cartCount });
};

// Xóa sản phẩm khỏi giỏ
exports.removeItem = async (req, res) => {
    const { productId, size } = req.body;
    req.session.cart = (req.session.cart || []).filter(i => !(i.productId == productId && i.size == size));

    if (req.session.user) {
        try {
            await db.query(
                "DELETE FROM cart_items WHERE user_id=? AND product_id=? AND size=?",
                [req.session.user.id, productId, size]
            );
        } catch (err) {
            console.error("Lỗi xóa sản phẩm khỏi DB giỏ hàng:", err);
        }
    }

    const cartCount = req.session.cart.reduce((acc, i) => acc + i.quantity, 0);
    res.json({ cartCount });
};
