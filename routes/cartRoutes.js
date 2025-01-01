const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
router.get('/', cartController.getAllCarts);
router.get('/:id', cartController.getCartById);
router.put('/:id', cartController.updateCart);
router.put('/add-item/:id', cartController.addItemToCart);
router.put('/remove-item/:id', cartController.removeItemFromCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;
