const express = require('express');
const { getAllCarts, getCartById, createCart, deleteCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.delete('/:id', deleteCart);
router.post('/:cartId/items', addItemToCart);
router.delete('/:cartId/items/:itemId', removeItemFromCart);

module.exports = router;
