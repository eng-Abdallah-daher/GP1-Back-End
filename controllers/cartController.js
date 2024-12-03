const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
    try {
        const cartData = req.body;
        const result = await Cart.create(cartData);
        res.status(201).json({
            message: 'Cart created successfully',
            cart: result.ops[0]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error });
    }
};

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.getAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error });
    }
};

const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.getById(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartData = req.body;
        const result = await Cart.update(id, cartData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

const addItemToCart = async (req, res) => {
    try {
        const { cartId, itemData } = req.body;
        const result = await Cart.addItem(cartId, itemData);
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const { cartId, itemId } = req.body;
        const result = await Cart.removeItem(cartId, itemId);
        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cart.delete(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
};

module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    updateCart,
    addItemToCart,
    removeItemFromCart,
    deleteCart
};
