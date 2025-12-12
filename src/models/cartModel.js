const db = require('../models/database');

exports.countCartRowsByUser = async (userId) => {
    const [rows] = await db.execute(
        'SELECT COUNT(*) AS count FROM cart_items WHERE user_id = ?',
        [userId]
    );
    return rows[0].count;
};