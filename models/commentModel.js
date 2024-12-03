const db = require('../config/db');

const Comment = {
    create: (commentData, callback) => {
        const query = `INSERT INTO Comment (commenterId, postId, text) VALUES (?, ?, ?)`;
        const values = [commentData.commenterId, commentData.postId, commentData.text];
        db.query(query, values, callback);
    },
    getAll: (callback) => {
        const query = `SELECT * FROM Comment`;
        db.query(query, callback);
    },
    getById: (id, callback) => {
        const query = `SELECT * FROM Comment WHERE id = ?`;
        db.query(query, [id], callback);
    },
    update: (id, updatedData, callback) => {
        const query = `UPDATE Comment SET text = ?, isLiked = ? WHERE id = ?`;
        const values = [updatedData.text, updatedData.isLiked, id];
        db.query(query, values, callback);
    },
    delete: (id, callback) => {
        const query = `DELETE FROM Comment WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = Comment;
