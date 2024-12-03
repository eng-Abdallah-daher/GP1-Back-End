const db = require('../config/db');

class MaintenanceRequest {
    constructor(userId, ownerId, time) {
        this.userId = userId;
        this.ownerId = ownerId;
        this.time = time;
    }

    static getAll(callback) {
        db.query('SELECT * FROM MaintenanceRequest', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM MaintenanceRequest WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }

    static add(maintenanceRequest, callback) {
        db.query('INSERT INTO MaintenanceRequest (userId, ownerId, time) VALUES (?, ?, ?)', 
        [maintenanceRequest.userId, maintenanceRequest.ownerId, maintenanceRequest.time], 
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static update(id, maintenanceRequest, callback) {
        db.query('UPDATE MaintenanceRequest SET userId = ?, ownerId = ?, time = ? WHERE id = ?',
        [maintenanceRequest.userId, maintenanceRequest.ownerId, maintenanceRequest.time, id], 
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static delete(id, callback) {
        db.query('DELETE FROM MaintenanceRequest WHERE id = ?', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
}

module.exports = MaintenanceRequest;
