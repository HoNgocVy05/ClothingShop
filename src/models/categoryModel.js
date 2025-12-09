const db = require('../models/database'); // mysql2/promise

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT * FROM categories ORDER BY id DESC
    `);
    return rows;
};

exports.getById = async (id) => {
    const [rows] = await db.query(`
        SELECT * FROM categories WHERE id = ?
    `, [id]);
    return rows[0] || null;
};

exports.add = async (name) => {
    const [result] = await db.query(`
        INSERT INTO categories (name) VALUES (?)
    `, [name]);
    return result.insertId;
};

exports.update = async (id, name) => {
    await db.query(`
        UPDATE categories SET name=? WHERE id=?
    `, [name, id]);
    return true;
};

exports.delete = async (id) => {
    await db.query(`
        DELETE FROM categories WHERE id=?
    `, [id]);
    return true;
};
