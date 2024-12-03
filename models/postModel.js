const db = require('../config/db');

exports.getAll = (callback) => {
    const query = 'SELECT * FROM Post';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.getById = (postId, callback) => {
    const query = 'SELECT * FROM Post WHERE id = ?';
    db.query(query, [postId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        callback(null, results[0]);
    });
};

exports.create = (postData, callback) => {
    const query = 'INSERT INTO Post (ownerId, description, postImage) VALUES (?, ?, ?)';
    const values = [postData.ownerId, postData.description, postData.postImage || null];
    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

exports.update = (postId, postData, callback) => {
    const query = 'UPDATE Post SET description = ?, postImage = ? WHERE id = ?';
    const values = [postData.description, postData.postImage || null, postId];
    db.query(query, values, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

exports.delete = (postId, callback) => {
    const query = 'DELETE FROM Post WHERE id = ?';
    db.query(query, [postId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};
