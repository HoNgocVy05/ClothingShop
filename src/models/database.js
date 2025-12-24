require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

if (process.env.NODE_ENV === 'production' && process.env.MYSQL_URL) {
    pool = mysql.createPool(process.env.MYSQL_URL);
    console.log('DB: dùng MYSQL_URL (production)');
} else {
    pool = mysql.createPool({
        host: process.env.mySqlHost,
        user: process.env.mySqlUser,
        password: process.env.mySqlPassword,
        database: process.env.mySqlDb,
        port: process.env.mySqlPort,
        waitForConnections: true,
        connectionLimit: 10
    });
    console.log('DB: dùng config local');
}

// Test connection
(async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Kết nối DB thành công');
    } catch (err) {
        console.error('Kết nối DB thất bại:', err.message);
    }
})();

module.exports = pool;
