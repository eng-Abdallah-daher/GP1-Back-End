const DeliveryRequest = require('../models/deliveryRequestModel');

const DeliveryRequestController = {
    create: async (req, res) => {
        try {
            const deliveryRequestData = req.body;
            const result = await DeliveryRequest.create(deliveryRequestData);
            res.status(201).json({ message: 'Delivery request created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating delivery request', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const deliveryRequests = await DeliveryRequest.getAll();
            res.status(200).json({ message: 'Delivery requests retrieved successfully', data: deliveryRequests });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery requests', error });
        }
    },
    getById: async (req, res) => {
        try {
            const deliveryRequestId = req.params.id;
            const deliveryRequest = await DeliveryRequest.getById(deliveryRequestId);
            if (deliveryRequest) {
                res.status(200).json({ message: 'Delivery request retrieved successfully', data: deliveryRequest });
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving delivery request', error });
        }
    },
    update: async (req, res) => {
        try {
            const deliveryRequestId = req.params.id;
            const deliveryRequestData = req.body;
            const result = await DeliveryRequest.update(deliveryRequestId, deliveryRequestData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Delivery request updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating delivery request', error });
        }
    },
     updatestatus: async (req, res) => {
        try {
            const deliveryRequestId = req.params.id;
            const deliveryRequestData = req.body;
            const result = await DeliveryRequest.updatestatus(deliveryRequestId, deliveryRequestData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Delivery request updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating delivery request', error });
        }
    },
    delete: async (req, res) => {
        try {
            const deliveryRequestId = req.params.id;
            const result = await DeliveryRequest.delete(deliveryRequestId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Delivery request deleted successfully' });
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting delivery request', error });
        }
    }
};

module.exports = DeliveryRequestController;
