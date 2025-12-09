const db = require('../models/database'); // mysql2/promise

exports.getAll = async () => {
    const sql = `
        SELECT p.*, c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id DESC
    `;
    const [rows] = await db.query(sql);

    return rows.map(r => ({
        ...r,
        images: r.images ? JSON.parse(r.images) : [],
        stock_s: Number(r.stock_s || 0),
        stock_m: Number(r.stock_m || 0),
        stock_l: Number(r.stock_l || 0),
        stock_xl: Number(r.stock_xl || 0)
    }));
};

exports.getById = async (id) => {
    const [rows] = await db.query(`
        SELECT * FROM products WHERE id = ?
    `, [id]);

    if (!rows[0]) return null;

    return {
        ...rows[0],
        images: rows[0].images ? JSON.parse(rows[0].images) : []
    };
};

exports.add = async (data) => {
    const sql = `
        INSERT INTO products 
        (name, category_id, stock_s, stock_m, stock_l, stock_xl, price, description, images)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
        data.name,
        data.category_id,
        data.stock_s,
        data.stock_m,
        data.stock_l,
        data.stock_xl,
        data.price,
        data.description || null,
        JSON.stringify(data.images || [])
    ]);

    return result.insertId;
};

exports.update = async (id, data) => {
    const sql = `
        UPDATE products SET
            name=?, category_id=?, 
            stock_s=?, stock_m=?, stock_l=?, stock_xl=?, 
            price=?, description=?, images=?
        WHERE id=?
    `;

    await db.query(sql, [
        data.name,
        data.category_id,
        data.stock_s,
        data.stock_m,
        data.stock_l,
        data.stock_xl,
        data.price,
        data.description || null,
        JSON.stringify(data.images || []),
        id
    ]);

    return true;
};

exports.delete = async (id) => {
    await db.query(`
        DELETE FROM products WHERE id=?
    `, [id]);
    return true;
};
