const pool = require('./database');

const AdminUser = {
    getAll: async () => {
        const [rows] = await pool.query(`SELECT id, fullname, email, role, isActive, created_at FROM users`);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows[0];
    },

    delete: async (id) => {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        return result;
    },

    updateStatus: async (id, status) => {
        const [result] = await pool.query("UPDATE users SET isActive = ? WHERE id = ?", [status, id]);
        return result;
    }
};


module.exports = AdminUser;
