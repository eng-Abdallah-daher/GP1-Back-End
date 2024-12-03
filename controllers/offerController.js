const Offer = require('../models/offerModel');

const OfferController = {
    create: async (req, res) => {
        try {
            const offerData = req.body;
            const result = await Offer.create(offerData);
            res.status(201).json({ message: 'Offer created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating offer', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const offers = await Offer.getAll();
            res.status(200).json({ message: 'Offers retrieved successfully', data: offers });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving offers', error });
        }
    },
    getById: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offer = await Offer.getById(offerId);
            if (offer) {
                res.status(200).json({ message: 'Offer retrieved successfully', data: offer });
            } else {
                res.status(404).json({ message: 'Offer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving offer', error });
        }
    },
    update: async (req, res) => {
        try {
            const offerId = req.params.id;
            const offerData = req.body;
            const result = await Offer.update(offerId, offerData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Offer updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Offer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating offer', error });
        }
    },
    delete: async (req, res) => {
        try {
            const offerId = req.params.id;
            const result = await Offer.delete(offerId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Offer deleted successfully' });
            } else {
                res.status(404).json({ message: 'Offer not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting offer', error });
        }
    }
};

module.exports = OfferController;
