const Item = require('../models/itemModel');

const ItemController = {
    create: async (req, res) => {
        try {
            const itemData = req.body;
            const result = await Item.create(itemData);
            res.status(201).json({ message: 'Item created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating item', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const items = await Item.getAll();
            res.status(200).json({ message: 'Items retrieved successfully', data: items });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving items', error });
        }
    },
    getById: async (req, res) => {
        try {
            const itemId = req.params.id;
            const item = await Item.getById(itemId);
            if (item) {
                res.status(200).json({ message: 'Item retrieved successfully', data: item });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving item', error });
        }
    },
    update: async (req, res) => {
        try {
            const itemId = req.params.id;
            const itemData = req.body;
            const result = await Item.update(itemId, itemData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Item updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating item', error });
        }
    },
    delete: async (req, res) => {
        try {
            const itemId = req.params.id;
            const result = await Item.delete(itemId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Item deleted successfully' });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting item', error });
        }
    }
};

module.exports = ItemController;