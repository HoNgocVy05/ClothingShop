require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.port;

app.get('/', (req, res) => {
  res.send('!');
});

// chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
