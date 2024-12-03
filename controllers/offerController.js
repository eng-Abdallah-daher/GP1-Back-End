const Offer = require('../models/offerModel');

exports.getAll = (req, res) => {
    Offer.getAll((err, offers) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving offers', error: err });
        } else {
            res.status(200).json(offers);
        }
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Offer.getById(id, (err, offer) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving offer', error: err });
        } else if (offer) {
            res.status(200).json(offer);
        } else {
            res.status(404).json({ message: 'Offer not found' });
        }
    });
};

exports.create = (req, res) => {
    const { title, description, discount, validUntil, posterId } = req.body;
    const newOffer = { title, description, discount, validUntil, posterId };

    Offer.create(newOffer, (err, offer) => {
        if (err) {
            res.status(500).json({ message: 'Error creating offer', error: err });
        } else {
            res.status(201).json({ message: 'Offer created successfully', offerId: offer.id });
        }
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { title, description, discount, validUntil, posterId } = req.body;
    const updatedOffer = { title, description, discount, validUntil, posterId };

    Offer.update(id, updatedOffer, (err, offer) => {
        if (err) {
            res.status(500).json({ message: 'Error updating offer', error: err });
        } else {
            res.status(200).json({ message: 'Offer updated successfully' });
        }
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Offer.delete(id, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting offer', error: err });
        } else {
            res.status(200).json({ message: 'Offer deleted successfully' });
        }
    });
};
