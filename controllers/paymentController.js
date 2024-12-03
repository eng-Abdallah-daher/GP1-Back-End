const Payment = require('../models/paymentModel');

const PaymentController = {
    create: async (req, res) => {
        try {
            const paymentData = req.body;
            const result = await Payment.create(paymentData);
            res.status(201).json({ message: 'Payment created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating payment', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const payments = await Payment.getAll();
            res.status(200).json({ message: 'Payments retrieved successfully', data: payments });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving payments', error });
        }
    },
    getById: async (req, res) => {
        try {
            const paymentId = req.params.id;
            const payment = await Payment.getById(paymentId);
            if (payment) {
                res.status(200).json({ message: 'Payment retrieved successfully', data: payment });
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving payment', error });
        }
    },
    update: async (req, res) => {
        try {
            const paymentId = req.params.id;
            const paymentData = req.body;
            const result = await Payment.update(paymentId, paymentData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Payment updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating payment', error });
        }
    },
    delete: async (req, res) => {
        try {
            const paymentId = req.params.id;
            const result = await Payment.delete(paymentId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Payment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Payment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting payment', error });
        }
    }
};

module.exports = PaymentController;
