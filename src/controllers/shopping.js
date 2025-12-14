const db = require('../models/database');
const orderModel = require('../models/orderModel');

exports.checkoutFromProduct = async (req, res) => {
    const { productId, size, quantity } = req.body;

    const [[p]] = await db.query(`
        SELECT id, name, final_price AS price, images 
        FROM products WHERE id=?
    `, [productId]);

    req.session.checkoutItems = [{
        product_id: p.id,
        name: p.name,
        image: JSON.parse(p.images)[0],
        size,
        price: p.price,
        quantity
    }];

    res.json({ ok: true });
};

exports.checkoutFromCart = async (req, res) => {
    const userId = req.session.user.id;
    const { items } = req.body;

    const ids = items.map(i => `'${i.productId}-${i.size}'`);

    const [rows] = await db.query(`
        SELECT 
            c.product_id, c.size, c.quantity,
            p.name, p.final_price AS price,
            JSON_UNQUOTE(JSON_EXTRACT(p.images,'$[0]')) AS image
            FROM cart_items c
            JOIN products p ON c.product_id=p.id
            WHERE c.user_id=? 
            AND CONCAT(c.product_id,'-',c.size) IN (${ids.join(',')})
    `, [userId]);

    req.session.checkoutItems = rows;
    res.json({ ok: true });
};

exports.getShoppingPage = (req, res) => {
    const items = req.session.checkoutItems || [];

    const subTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = 20000;

    res.render('user/shoppingPage', {
        layout: './layouts/userMaster',
        title: 'VPQ Studio - Mua hàng',
        items,
        subTotal,
        shipping,
        total: subTotal + shipping
    });
};

exports.submitOrder = async (req, res) => {
    const user = req.session.user;
    const items = req.session.checkoutItems;

    // Kiểm tra
    const { fullname, phone, address, payment } = req.body;
    if (!fullname || !phone || !address || !payment || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    const orderCode = generateOrderCode();

    const orderId = await orderModel.createOrder({
        order_code: orderCode,
        user_id: user.id,
        fullname,
        phone,
        address,
        note: req.body.note,
        payment_method: payment,
        shipping_fee: 20000,
        total_price: req.body.total
    }, items);

    req.session.cart = [];
    await db.query( 
        "DELETE FROM cart_items WHERE user_id = ?",
        [user.id]
    );
    req.session.checkoutItems = null;
    res.json({ success: true, orderId });
};

function generateOrderCode() {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `VPQ-${y}${m}${d}-${random}`;
}
