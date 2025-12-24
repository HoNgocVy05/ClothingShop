const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadProductImages');
const productController = require('../controllers/productController');
const { checkLogin} = require('../middleware/auth');
const shopping = require('../controllers/shopping');
const categoryController = require('../controllers/categoryController');
const { checkAdmin } = require('../middleware/auth');


router.post('/api/products/add', upload.array('images', 4), productController.addProduct);
router.post('/api/products/update/:id', upload.array('images', 4), productController.updateProduct);
router.post('/api/products/delete/:id', productController.deleteProduct);
router.post('/products/delete-multiple',checkAdmin, productController.deleteMultiple);

router.post('/checkout/from-product', checkLogin, shopping.checkoutFromProduct);
router.post('/checkout/from-cart', checkLogin, shopping.checkoutFromCart);
router.post('/checkout/submit', checkLogin, shopping.submitOrder);

router.get('/payment/momo-return', (req, res) => {
    res.redirect('/my-order');
});

router.post('/catalog-management/delete-multiple', checkAdmin, categoryController.deleteMultiple);

module.exports = router;
