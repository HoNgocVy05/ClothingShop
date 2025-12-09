const pool = require('./src/models/database');
const User = require('./src/models/userModel');
const bcrypt = require('bcryptjs');

async function hashExistingPasswords() {
    try {
        const [users] = await pool.query("SELECT id, password FROM users");

        for (let user of users) {
            if (!user.password.startsWith('$2')) {
                const hashed = await bcrypt.hash(user.password, 10);
                await pool.query("UPDATE users SET password = ? WHERE id = ?", [hashed, user.id]);
                console.log(`User ${user.id} password hashed.`);
            }
        }

        console.log("Hash tất cả password hiện có xong!");
    } catch (err) {
        console.error("Lỗi khi hash password:", err);
    }
}

async function createUser(fullname, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create(fullname, email, hashedPassword);
        console.log(`User ${fullname} created.`);
    } catch (err) {
        console.error("Lỗi khi tạo user:", err);
    }
}

hashExistingPasswords();