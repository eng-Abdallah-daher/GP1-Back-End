const db = require('../config/db');

exports.getAll = (callback) => {
    const query = 'SELECT * FROM Offer';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.getById = (id, callback) => {
    const query = 'SELECT * FROM Offer WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]);
    });
};

exports.create = (offer, callback) => {
    const query = 'INSERT INTO Offer (title, description, discount, validUntil, posterId) VALUES (?, ?, ?, ?, ?)';
    const values = [offer.title, offer.description, offer.discount, offer.validUntil, offer.posterId];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, { id: results.insertId });
    });
};

exports.update = (id, offer, callback) => {
    const query = 'UPDATE Offer SET title = ?, description = ?, discount = ?, validUntil = ?, posterId = ? WHERE id = ?';
    const values = [offer.title, offer.description, offer.discount, offer.validUntil, offer.posterId, id];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.delete = (id, callback) => {
    const query = 'DELETE FROM Offer WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
