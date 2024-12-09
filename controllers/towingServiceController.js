const TowingService = require('../models/towingServiceModel');

const TowingServiceController = {
    create: async (req, res) => {
        try {
            const towingServiceData = req.body;
            const result = await TowingService.create(towingServiceData);
            res.status(201).json({ message: 'Towing Service created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating towing service', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const towingServices = await TowingService.getAll();
            res.status(200).json({ message: 'Towing Services retrieved successfully', data: towingServices });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving towing services', error });

        }
    },
    getById: async (req, res) => {
        try {
            const towingServiceId = req.params.id;
            const towingService = await TowingService.getById(towingServiceId);
            if (towingService) {
                res.status(200).json({ message: 'Towing Service retrieved successfully', data: towingService });
            } else {
                res.status(404).json({ message: 'Towing Service not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving towing service', error });
        }
    },
    update: async (req, res) => {
        try {
            const towingServiceId = req.params.id;
            const towingServiceData = req.body;
            const result = await TowingService.update(towingServiceId, towingServiceData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Towing Service updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Towing Service not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating towing service', error });
        }
    },
    delete: async (req, res) => {
        try {
            const towingServiceId = req.params.id;
            const result = await TowingService.delete(towingServiceId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Towing Service deleted successfully' });
            } else {
                res.status(404).json({ message: 'Towing Service not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting towing service', error });
        }
    }
};

module.exports = TowingServiceController;
