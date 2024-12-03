const db = require('../config/db');

const Employee = {
    getAll: (callback) => {
        db.query('SELECT * FROM Employee', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM Employee WHERE id = ?', [id], callback);
    },
    create: (employee, callback) => {
        const { name, position } = employee;
        db.query(
            'INSERT INTO Employee (name, position) VALUES (?, ?)',
            [name, position],
            callback
        );
    },
    update: (id, employee, callback) => {
        const { name, position } = employee;
        db.query(
            'UPDATE Employee SET name = ?, position = ? WHERE id = ?',
            [name, position, id],
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM Employee WHERE id = ?', [id], callback);
    },
};

module.exports = Employee;
