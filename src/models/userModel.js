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
    },

    findById: async (id) => {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    },

    update: async (id, data) => {
        const query = `
            UPDATE users SET 
                fullname = ?, 
                address = ?, 
                dayOfBirth = ?, 
                gender = ?, 
                email = ?, 
                phoneNumber = ?,
                bio = ?
            WHERE id = ?
        `;
        const values = [
            data.fullname, data.address, data.dayOfBirth,
            data.gender, data.email, data.phoneNumber, data.bio, id
        ];

        const [result] = await pool.query(query, values);
        return result;
    }
};

module.exports = User;
