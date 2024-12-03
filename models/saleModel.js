const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM Sale', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.getById = (id, callback) => {
    db.query('SELECT * FROM Sale WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

exports.create = (saleData, callback) => {
    const { itemId, quantity, price, ownerId } = saleData;
    const query = 'INSERT INTO Sale (itemId, quantity, price, ownerId) VALUES (?, ?, ?, ?)';
    db.query(query, [itemId, quantity, price, ownerId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: results.insertId, ...saleData });
    });
};

exports.update = (id, saleData, callback) => {
    const { itemId, quantity, price, ownerId } = saleData;
    const query = 'UPDATE Sale SET itemId = ?, quantity = ?, price = ?, ownerId = ? WHERE id = ?';
    db.query(query, [itemId, quantity, price, ownerId, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback(null, null);
        }
        callback(null, { id, ...saleData });
    });
};

exports.delete = (id, callback) => {
    const query = 'DELETE FROM Sale WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.affectedRows === 0) {
            return callback(null);
        }
        callback(null);
    });
};
