const pool = require('./database');

const User = {
    findByEmail: async (email) => {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0]; 
    },

    create: async (fullname, email, password) => {
        const [result] = await pool.query(
            "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, 'user')",
            [fullname, email, password]
        );
        return result.insertId; 
    }
};

module.exports = User;
