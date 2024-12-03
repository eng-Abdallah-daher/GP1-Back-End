const db = require('../config/db');

const DeliveryRequest = {
    getAll: (callback) => {
        db.query('SELECT * FROM DeliveryRequest', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM DeliveryRequest WHERE id = ?', [id], callback);
    },
    create: (deliveryRequest, callback) => {
        const { userId, ownerId, phone, address, instructions, status } = deliveryRequest;
        db.query(
            'INSERT INTO DeliveryRequest (userId, ownerId, phone, address, instructions, status) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, ownerId, phone, address, instructions, status],
            callback
        );
    },
    update: (id, deliveryRequest, callback) => {
        const { userId, ownerId, phone, address, instructions, status } = deliveryRequest;
        db.query(
            'UPDATE DeliveryRequest SET userId = ?, ownerId = ?, phone = ?, address = ?, instructions = ?, status = ? WHERE id = ?',
            [userId, ownerId, phone, address, instructions, status, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM DeliveryRequest WHERE id = ?', [id], callback);
    },
};

module.exports = DeliveryRequest;
