const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadProductImages');
const productController = require('../controllers/productController');

router.post('/api/products/add', upload.array('images', 4), productController.addProduct);
router.post('/api/products/update/:id', upload.array('images', 4), productController.updateProduct);
router.post('/api/products/delete/:id', productController.deleteProduct);

module.exports = router;
