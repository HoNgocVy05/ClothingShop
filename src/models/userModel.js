const pool = require('./database');

const User = {
    findByEmail: async (email) => {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    saveRememberToken: async (id, token) => {
        await pool.query(
            "UPDATE users SET remember_token = ? WHERE id = ?",
            [token, id]
        );
    },

    findByRememberToken: async (token) => {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE remember_token = ?",
            [token]
        );
        return rows[0];
    },

    clearRememberToken: async (id) => {
        await pool.query(
            "UPDATE users SET remember_token = NULL WHERE id = ?",
            [id]
        );
    }
};

module.exports = User;
