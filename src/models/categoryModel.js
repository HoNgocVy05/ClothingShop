const db = require('../models/database'); 

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT * FROM categories ORDER BY gender DESC, parent_id ASC, id DESC
    `);
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM categories WHERE id = ?`, [id]);
    return rows[0] || null;
};


exports.add = async (name, gender, parent_id = null) => {
    const [result] = await db.query(`
        INSERT INTO categories (name, gender, parent_id) VALUES (?, ?, ?)
    `, [name, gender, parent_id]);
    return result.insertId;
};

exports.update = async (id, name, gender, parent_id = null) => {
    await db.query(`
        UPDATE categories SET name=?, gender=?, parent_id=? WHERE id=?
    `, [name, gender, parent_id, id]);
    return true;
};

exports.delete = async (id) => {
    await db.query(`DELETE FROM categories WHERE id=?`, [id]);
    return true;
};
