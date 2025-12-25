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

    //update infor
    update: async (id, data) => {
        const {
            fullname,
            address,
            dayOfBirth,
            gender,
            email,
            phoneNumber,
            bio
        } = data;

        await pool.query(
            `UPDATE users 
             SET fullname = ?, address = ?, dayOfBirth = ?, gender = ?, email = ?, phoneNumber = ?, bio = ?
             WHERE id = ?`,
            [fullname, address, dayOfBirth, gender, email, phoneNumber, bio, id]
        );
    },

    //update password
    updatePassword: async (id, password) => {
        await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [password, id]
        );
    },
    
     updatePasswordByEmail: async (email, password) => {
        await pool.query(
            "UPDATE users SET password = ? WHERE email = ?",
            [password, email]
        );
    },

    //remember
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
    },
    create: async (fullname, email, password) => {
        await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)',
            [fullname, email, password]
        );
    },
};

module.exports = User;
