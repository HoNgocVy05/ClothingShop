const db = require('./database');

exports.createOrder = async (order, items) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query(`
            INSERT INTO orders (user_id, fullname, phone, address, note, payment_method, shipping_fee, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
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
