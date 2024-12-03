const db = require('../config/db');

const Booking = {
    getAll: (callback) => {
        db.query('SELECT * FROM Booking', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Booking WHERE id = ?', [id], callback);
    },
    create: (booking, callback) => {
        const { userId, ownerId, customerName, appointmentDate, status } = booking;
        db.query(
            'INSERT INTO Booking (userId, ownerId, customerName, appointmentDate, status) VALUES (?, ?, ?, ?, ?)',
            [userId, ownerId, customerName, appointmentDate, status],
            callback
        );
    },
    update: (id, booking, callback) => {
        const { userId, ownerId, customerName, appointmentDate, status } = booking;
        db.query(
            'UPDATE Booking SET userId = ?, ownerId = ?, customerName = ?, appointmentDate = ?, status = ? WHERE id = ?',
            [userId, ownerId, customerName, appointmentDate, status, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Booking WHERE id = ?', [id], callback);
    },
};

module.exports = Booking;
