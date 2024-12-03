const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.getAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.getItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { ownerId, name, price, description, availableQuantity } = req.body;
        const newItem = await Item.createItem(ownerId, name, price, description, availableQuantity);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item' });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { name, price, description, availableQuantity } = req.body;
        const updatedItem = await Item.updateItem(req.params.id, name, price, description, availableQuantity);
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update item' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const result = await Item.deleteItem(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
};
