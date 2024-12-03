const MaintenanceRequest = require('../models/maintenanceRequestModel');

exports.getAll= (req, res) => {
    MaintenanceRequest.getAll((err, maintenanceRequests) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch maintenance requests' });
        } else {
            res.status(200).json(maintenanceRequests);
        }
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    MaintenanceRequest.getById(id, (err, maintenanceRequest) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch maintenance request' });
        } else {
            res.status(200).json(maintenanceRequest);
        }
    });
};

exports.create= (req, res) => {
    const { userId, ownerId, time } = req.body;
    const newMaintenanceRequest = new MaintenanceRequest(userId, ownerId, time);
    MaintenanceRequest.add(newMaintenanceRequest, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add maintenance request' });
        } else {
            res.status(201).json({ message: 'Maintenance request added successfully', id: result.insertId });
        }
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { userId, ownerId, time } = req.body;
    const updatedMaintenanceRequest = new MaintenanceRequest(userId, ownerId, time);
    MaintenanceRequest.update(id, updatedMaintenanceRequest, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update maintenance request' });
        } else {
            res.status(200).json({ message: 'Maintenance request updated successfully' });
        }
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    MaintenanceRequest.delete(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete maintenance request' });
        } else {
            res.status(200).json({ message: 'Maintenance request deleted successfully' });
        }
    });
};
