const Sale = require('../models/saleModel');

const SaleController = {
    create: async (req, res) => {
        try {
            const saleData = req.body;
            const result = await Sale.create(saleData);
            res.status(201).json({ message: 'Sale created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating sale', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const sales = await Sale.getAll();
            res.status(200).json({ message: 'Sales retrieved successfully', data: sales });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving sales', error });
        }
    },
    getById: async (req, res) => {
        try {
            const saleId = req.params.id;
            const sale = await Sale.getById(saleId);
            if (sale) {
                res.status(200).json({ message: 'Sale retrieved successfully', data: sale });
            } else {
                res.status(404).json({ message: 'Sale not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving sale', error });
        }
    },
    update: async (req, res) => {
        try {
            const saleId = req.params.id;
            const saleData = req.body;
            const result = await Sale.update(saleId, saleData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Sale updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Sale not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating sale', error });
        }
    },
    delete: async (req, res) => {
        try {
            const saleId = req.params.id;
            const result = await Sale.delete(saleId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Sale deleted successfully' });
            } else {
                res.status(404).json({ message: 'Sale not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting sale', error });
        }
    },
    getByOwnerId: async (req, res) => {
        try {
            const ownerId = req.params.ownerId;
            const sales = await Sale.getByOwnerId(ownerId);
            if (sales.length > 0) {
                res.status(200).json({ message: 'Sales retrieved successfully', data: sales });
            } else {
                res.status(404).json({ message: 'No sales found for this owner' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving sales', error });
        }
    }
};

module.exports = SaleController;
