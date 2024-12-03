const DeliveryRequest = require('../models/deliveryRequestModel');

exports.createDeliveryRequest = (req, res) => {
    const { userId, ownerId, phone, address, instructions, status } = req.body;

    const newDeliveryRequest = new DeliveryRequest({
        userId,
        ownerId,
        phone,
        address,
        instructions,
        status
    });

    newDeliveryRequest.save()
        .then(request => res.status(201).json(request))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getAllDeliveryRequests = (req, res) => {
    DeliveryRequest.find()
        .then(requests => res.status(200).json(requests))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getDeliveryRequestById = (req, res) => {
    const { id } = req.params;

    DeliveryRequest.findById(id)
        .then(request => {
            if (request) {
                res.status(200).json(request);
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateDeliveryRequest = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    DeliveryRequest.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedRequest => {
            if (updatedRequest) {
                res.status(200).json(updatedRequest);
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteDeliveryRequest = (req, res) => {
    const { id } = req.params;

    DeliveryRequest.findByIdAndDelete(id)
        .then(deletedRequest => {
            if (deletedRequest) {
                res.status(200).json({ message: 'Delivery request deleted successfully' });
            } else {
                res.status(404).json({ message: 'Delivery request not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};
