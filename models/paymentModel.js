const db = require('../config/db');

const getAllPayments = (callback) => {
    db.query('SELECT * FROM PaymentRecord', callback);
};

const getPaymentById = (id, callback) => {
    db.query('SELECT * FROM PaymentRecord WHERE id = ?', [id], callback);
};

const addPayment = (paymentData, callback) => {
    const query = `
        INSERT INTO PaymentRecord (userId, year, month, paid)
        VALUES (?, ?, ?, ?)
    `;
    const values = [
        paymentData.userId,
        paymentData.year,
        paymentData.month,
        paymentData.paid ? 1 : 0,
    ];
    db.query(query, values, callback);
};

const updatePayment = (id, paymentData, callback) => {
    const query = `
        UPDATE PaymentRecord SET userId = ?, year = ?, month = ?, paid = ?
        WHERE id = ?
    `;
    const values = [
        paymentData.userId,
        paymentData.year,
        paymentData.month,
        paymentData.paid ? 1 : 0,
        id,
    ];
    db.query(query, values, callback);
};

const deletePayment = (id, callback) => {
    db.query('DELETE FROM PaymentRecord WHERE id = ?', [id], callback);
};

module.exports = {
    getAllPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
};
