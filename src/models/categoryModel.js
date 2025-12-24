const db = require('../models/database'); 

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT * FROM categories
        ORDER BY parent_id ASC, id DESC
    `);
    return rows;
};


exports.getById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM categories WHERE id = ?`, [id]);
    return rows[0] || null;
};


exports.add = async (name, parent_id) => {
    await db.query(
        `INSERT INTO categories (name, parent_id) VALUES (?, ?)`,
        [name, parent_id]
    );
};

exports.update = async (id, name) => {
    await db.query(
        'UPDATE categories SET name = ? WHERE id = ?',
        [name, id]
    );
};

exports.delete = async (id) => {
    await db.query(
        `DELETE FROM categories WHERE id=?`,
        [id]
    );
    return true;
};

exports.deleteMultiple = async (ids) => {
    if (!ids || ids.length === 0) return false;

    await db.query(
        `DELETE FROM categories WHERE id IN (?)`,
        [ids]
    );
    return true;
};