const Cart = require('../models/cartModel');


exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.getAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.getById(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createCart = async (req, res) => {
    try {
        const newCart = await Cart.create(req.body.userId);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    try {
        const { cartId, itemId, quantity } = req.body;
        const addedItem = await CartItem.add(cartId, itemId, quantity);
        res.status(201).json(addedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    try {
        const { cartId, itemId } = req.body;
        const removedItem = await CartItem.remove(cartId, itemId);
        if (!removedItem) return res.status(404).json({ message: 'Item not found in cart' });
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await Cart.delete(req.params.id);
        if (!deletedCart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
