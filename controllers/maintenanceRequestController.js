const MaintenanceRequest = require('../models/maintenanceRequestModel');

const MaintenanceRequestController = {
    create: async (req, res) => {
        try {
            const requestData = req.body;
            const result = await MaintenanceRequest.create(requestData);
            res.status(201).json({ message: 'Maintenance request created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating maintenance request', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const requests = await MaintenanceRequest.getAll();
            res.status(200).json({ message: 'Maintenance requests retrieved successfully', data: requests });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving maintenance requests', error });
        }
    },
    getById: async (req, res) => {
        try {
            const requestId = req.params.id;
            const request = await MaintenanceRequest.getById(requestId);
            if (request) {
                res.status(200).json({ message: 'Maintenance request retrieved successfully', data: request });
            } else {
                res.status(404).json({ message: 'Maintenance request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving maintenance request', error });
        }
    },
    update: async (req, res) => {
        try {
            const requestId = req.params.id;
            const requestData = req.body;
            const result = await MaintenanceRequest.update(requestId, requestData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Maintenance request updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Maintenance request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating maintenance request', error });
        }
    },
    delete: async (req, res) => {
        try {
            const requestId = req.params.id;
            const result = await MaintenanceRequest.delete(requestId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Maintenance request deleted successfully' });
            } else {
                res.status(404).json({ message: 'Maintenance request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting maintenance request', error });
        }
    }
};

module.exports = MaintenanceRequestController;
