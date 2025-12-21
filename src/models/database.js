require('dotenv').config(); 
const mysql = require('mysql2');
const mySqlPort = process.env.mySqlPort;
const mySqlHost = process.env.mySqlHost;
const mySqlUser = process.env.mySqlUser;
const mySqlPassword = process.env.mySqlPassword;
const mySqlDb = process.env.mySqlDb;

const pool = mysql.createPool({
    host: mySqlHost,
    user: mySqlUser,
    password: mySqlPassword,
    database: mySqlDb,
    port: mySqlPort
}).promise();


(async () => {
    try {
        await pool.query('SELECT 1');
        console.log("Kết nối db thành công!");
    } catch (err) {
        console.log("Kết nối db thất bại:", err);
    }
})();

// const mysql = require('mysql2/promise');
// const pool = mysql.createPool(process.env.MYSQL_URL);

module.exports = pool;

