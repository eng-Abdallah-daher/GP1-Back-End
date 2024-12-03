const paymentModel = require('../models/paymentModel');

const getAllPayments = (req, res) => {
    paymentModel.getAllPayments((err, payments) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch payments' });
        } else {
            res.status(200).json(payments);
        }
    });
};

const getPaymentById = (req, res) => {
    paymentModel.getPaymentById(req.params.id, (err, payment) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch payment' });
        } else {
            res.status(200).json(payment);
        }
    });
};

const addPayment = (req, res) => {
    paymentModel.addPayment(req.body, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add payment' });
        } else {
            res.status(201).json({ message: 'Payment added successfully', paymentId: result.insertId });
        }
    });
};

const updatePayment = (req, res) => {
    paymentModel.updatePayment(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update payment' });
        } else {
            res.status(200).json({ message: 'Payment updated successfully' });
        }
    });
};

const deletePayment = (req, res) => {
    paymentModel.deletePayment(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete payment' });
        } else {
            res.status(200).json({ message: 'Payment deleted successfully' });
        }
    });
};

module.exports = {
    getAllPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
};
