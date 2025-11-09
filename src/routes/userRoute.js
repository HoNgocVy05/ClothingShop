const express = require('express');
const router = express.Router();
const index = require('../controllers');

//các trang user
router.get('/', index.getIndex);

module.exports = router;