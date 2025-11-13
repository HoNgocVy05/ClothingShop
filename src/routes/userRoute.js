const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const searchController = require('../controllers/searchController');

// các trang user
router.get('/', index.getIndex);
router.get('/search',searchController.getSearchResult)

module.exports = router;