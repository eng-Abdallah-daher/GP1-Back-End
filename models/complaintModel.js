const db = require('../config/db');

exports.getAll = (callback) => {
    db.query('SELECT * FROM Complaint', (err, results) => {
        callback(err, results);
    });
};

exports.getById = (id, callback) => {
    db.query('SELECT * FROM Complaint WHERE id = ?', [id], (err, results) => {
        callback(err, results);
    });
};

exports.create = (data, callback) => {
    const { description, userName, ownerId, rate } = data;
    const query = 'INSERT INTO Complaint (description, userName, ownerId, rate) VALUES (?, ?, ?, ?)';
    db.query(query, [description, userName, ownerId, rate], (err, result) => {
        callback(err, result);
    });
};

exports.update = (id, data, callback) => {
    const { description, userName, ownerId, rate } = data;
    const query = 'UPDATE Complaint SET description = ?, userName = ?, ownerId = ?, rate = ? WHERE id = ?';
    db.query(query, [description, userName, ownerId, rate, id], (err, result) => {
        callback(err, result);
    });
};

exports.delete = (id, callback) => {
    const query = 'DELETE FROM Complaint WHERE id = ?';
    db.query(query, [id], (err, result) => {
        callback(err, result);
    });
};
