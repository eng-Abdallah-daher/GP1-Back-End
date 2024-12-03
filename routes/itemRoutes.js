const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', async (req, res) => {
    try {
        const items = await itemController.getAllItems();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await itemController.getItemById(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
});

router.post('/', async (req, res) => {
    const { ownerId, name, price, description, availableQuantity } = req.body;
    try {
        const newItem = await itemController.createItem(ownerId, name, price, description, availableQuantity);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, availableQuantity } = req.body;
    try {
        const updatedItem = await itemController.updateItem(id, name, price, description, availableQuantity);
        if (updatedItem) {
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await itemController.deleteItem(id);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
