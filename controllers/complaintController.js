const Complaint = require('../models/complaintModel');

const ComplaintController = {
    create: async (req, res) => {
        try {
            const complaintData = req.body;
            const result = await Complaint.create(complaintData);
            res.status(201).json({ message: 'Complaint created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating complaint', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const complaints = await Complaint.getAll();
            res.status(200).json({ message: 'Complaints retrieved successfully', data: complaints });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving complaints', error });
        }
    },
    getById: async (req, res) => {
        try {
            const complaintId = req.params.id;
            const complaint = await Complaint.getById(complaintId);
            if (complaint) {
                res.status(200).json({ message: 'Complaint retrieved successfully', data: complaint });
            } else {
                res.status(404).json({ message: 'Complaint not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving complaint', error });
        }
    },
    update: async (req, res) => {
        try {
            const complaintId = req.params.id;
            const complaintData = req.body;
            const result = await Complaint.update(complaintId, complaintData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Complaint updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Complaint not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating complaint', error });
        }
    },
    delete: async (req, res) => {
        try {
            const complaintId = req.params.id;
            const result = await Complaint.delete(complaintId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Complaint deleted successfully' });
            } else {
                res.status(404).json({ message: 'Complaint not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting complaint', error });
        }
    }
};

module.exports = ComplaintController;
