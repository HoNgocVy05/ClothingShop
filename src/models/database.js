const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ClothingShop',
    port: 3306
});

connection.connect(err => {
  if (err) console.error('Kết nối thất bại:', err);
  else console.log('Kết nối thành công!');
});

module.exports = pool;