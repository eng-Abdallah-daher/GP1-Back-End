const Sale = require('../models/saleModel');

exports.getAll = (req, res) => {
    Sale.getAll((err, sales) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve sales' });
        }
        res.status(200).json(sales);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Sale.getById(id, (err, sale) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve sale' });
        }
        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.status(200).json(sale);
    });
};

exports.create = (req, res) => {
    const { itemId, quantity, price, ownerId } = req.body;
    const saleData = {
        itemId,
        quantity,
        price,
        ownerId
    };
    Sale.create(saleData, (err, newSale) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create sale' });
        }
        res.status(201).json({ message: 'Sale created successfully', sale: newSale });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { itemId, quantity, price, ownerId } = req.body;
    const saleData = {
        itemId,
        quantity,
        price,
        ownerId
    };
    Sale.update(id, saleData, (err, updatedSale) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update sale' });
        }
        res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Sale.delete(id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete sale' });
        }
        res.status(200).json({ message: 'Sale deleted successfully' });
    });
};
