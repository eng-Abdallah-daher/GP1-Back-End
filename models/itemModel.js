const db = require('../config/db');

exports.getAllItems = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Item', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

exports.getItemById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Item WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

exports.createItem = (ownerId, name, price, description, availableQuantity) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Item (ownerId, name, price, description, availableQuantity) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [ownerId, name, price, description, availableQuantity], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    id: results.insertId,
                    ownerId,
                    name,
                    price,
                    description,
                    availableQuantity,
                });
            }
        });
    });
};

exports.updateItem = (id, name, price, description, availableQuantity) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Item SET name = ?, price = ?, description = ?, availableQuantity = ? WHERE id = ?';
        db.query(query, [name, price, description, availableQuantity, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.affectedRows > 0 ? { id, name, price, description, availableQuantity } : null);
            }
        });
    });
};

exports.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Item WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
