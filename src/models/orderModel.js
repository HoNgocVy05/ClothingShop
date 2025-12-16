const db = require('./database');

exports.createOrder = async (order, items) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query(`
            INSERT INTO orders 
            (order_code, user_id, fullname, phone, address, note, payment_method, shipping_fee, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            order.order_code,
            order.user_id,
            order.fullname,
            order.phone,
            order.address,
            order.note,
            order.payment_method,
            order.shipping_fee,
            order.total_price
        ]);

        const orderId = result.insertId;

        for (let item of items) {
            await conn.query(`
                INSERT INTO order_items 
                (order_id, product_id, product_name, image, size, price, quantity)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                orderId,
                item.product_id,
                item.name,
                item.image,
                item.size,
                item.price,
                item.quantity
            ]);
        }

        await conn.commit();
        return orderId;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

exports.getOrderById = async (orderId) => {
    const conn = await db.getConnection();
    try {
        // Lấy thông tin đơn hàng
        const [orders] = await conn.query(`
            SELECT * FROM orders WHERE id = ?
        `, [orderId]);

        if (!orders[0]) return null;

        const order = orders[0];

        // Lấy các sản phẩm trong đơn hàng
        const [items] = await conn.query(`
            SELECT * FROM order_items WHERE order_id = ?
        `, [orderId]);

        // Trả về object đầy đủ
        return {
            ...order,
            items: items.map(i => ({
                ...i,
                price: Number(i.price),
                quantity: Number(i.quantity)
            }))
        };
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
};
exports.getOrderItems = async (orderId) => {
    const [rows] = await db.query(`
        SELECT * FROM order_items WHERE order_id = ?
    `, [orderId]);

    return rows.map(r => ({
        product_id: r.product_id,
        name: r.product_name,
        image: r.image,
        size: r.size,
        price: r.price,
        quantity: r.quantity
    }));
};
exports.getTotalSoldProducts = async () => {
    const [rows] = await db.query(`SELECT SUM(quantity) as total FROM order_items`);
    return rows[0].total || 0;
};

exports.getTotalOrders = async () => {
    const [rows] = await db.query(`SELECT COUNT(*) as total FROM orders`);
    return rows[0].total || 0;
};

exports.getTotalRevenue = async () => {
    const [rows] = await db.query(`SELECT SUM(total_price) as total FROM orders`);
    return rows[0].total || 0;
};

exports.getNewUsersCount = async () => {
    const [rows] = await db.query(`SELECT COUNT(*) as total FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`);
    return rows[0].total || 0;
};
exports.getAllOrders = async () => {
    const [rows] = await db.query(`
        SELECT 
            o.id,
            o.order_code,
            o.created_at,
            o.fullname AS user_name,
            o.total_price,
            o.payment_method,
            o.status,
            GROUP_CONCAT(
                CONCAT(oi.product_name, ':', oi.quantity, ':', oi.price)
                SEPARATOR ';'
            ) AS products
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `);

    return rows.map(row => {
        const products = row.products
            ? row.products.split(';').map(p => {
                const [name, quantity, price] = p.split(':');
                return {
                    name,
                    quantity: Number(quantity),
                    price: Number(price)
                };
            })
            : [];

        return {
            ...row,
            products
        };
    });
};

exports.updateStatus = async (orderId, status) => {
    await db.query(
        `UPDATE orders SET status = ? WHERE id = ?`,
        [status, orderId]
    );
};
