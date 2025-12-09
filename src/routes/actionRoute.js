const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadProductImages');
const productController = require('../controllers/productController');

// thêm
router.post('/api/products/add', upload.array('images', 4), productController.addProduct);

// sửa
router.post('/api/products/update/:id', upload.array('images', 4), productController.updateProduct);

// xóa
router.post('/api/products/delete/:id', productController.deleteProduct);

module.exports = router;
