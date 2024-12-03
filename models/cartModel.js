const db = require('../config/db');

class Cart {
    static async getAll() {
        const query = 'SELECT * FROM Cart';
        const [rows] = await db.promise().query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM Cart WHERE id = ?';
        const [rows] = await db.promise().query(query, [id]);
        return rows[0];
    }

    static async create(userId) {
        const query = 'INSERT INTO Cart (userId) VALUES (?)';
        const [result] = await db.promise().execute(query, [userId]);
        return { id: result.insertId, userId };
    }

    static async delete(id) {
        const query = 'DELETE FROM Cart WHERE id = ?';
        const [result] = await db.promise().execute(query, [id]);
        return result.affectedRows > 0;
    }
}

class CartItem {
    static async add(cartId, itemId, quantity) {
        const query = 'INSERT INTO CartItem (cartId, itemId, quantity) VALUES (?, ?, ?)';
        const [result] = await db.promise().execute(query, [cartId, itemId, quantity]);
        return { id: result.insertId, cartId, itemId, quantity };
    }

    static async remove(cartId, itemId) {
        const query = 'DELETE FROM CartItem WHERE cartId = ? AND itemId = ?';
        const [result] = await db.promise().execute(query, [cartId, itemId]);
        return result.affectedRows > 0;
    }
}

module.exports = { Cart, CartItem };
