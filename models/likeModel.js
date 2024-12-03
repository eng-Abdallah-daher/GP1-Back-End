const db = require('../config/db');

class Like {
    static getAllLikes() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `Like`', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static getLikeById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM `Like` WHERE id = ?', [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }

    static addLike(userId, postId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `Like` (userId, postId) VALUES (?, ?)';
            db.query(query, [userId, postId], (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, userId, postId });
            });
        });
    }

    static deleteLike(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM `Like` WHERE id = ?', [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = Like;
