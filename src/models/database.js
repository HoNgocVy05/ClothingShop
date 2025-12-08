const mysql = require('mysql2');
const mySqlPort = process.env.mySqlPort;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ClothingShop',
    port: mySqlPort
}).promise();

(async () => {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Kết nối db thành công!");
    } catch (err) {
        console.log("Kết nối db thất bại:", err);
    }
})();

module.exports = pool;
