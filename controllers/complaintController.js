const Complaint = require('../models/complaintModel');

exports.create = (req, res) => {
    const { description, userName, ownerId, rate } = req.body;
    Complaint.create({ description, userName, ownerId, rate })
        .then(complaint => res.status(201).json(complaint))
        .catch(err => res.status(500).json({ error: 'Failed to create complaint' }));
};

exports.getAll = (req, res) => {
    Complaint.findAll()
        .then(complaints => res.status(200).json(complaints))
        .catch(err => res.status(500).json({ error: 'Failed to get complaints' }));
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Complaint.findByPk(id)
        .then(complaint => {
            if (!complaint) {
                return res.status(404).json({ error: 'Complaint not found' });
            }
            res.status(200).json(complaint);
        })
        .catch(err => res.status(500).json({ error: 'Failed to get complaint' }));
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { description, userName, ownerId, rate } = req.body;
    Complaint.update({ description, userName, ownerId, rate }, { where: { id } })
        .then(([affectedRows]) => {
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Complaint not found' });
            }
            res.status(200).json({ message: 'Complaint updated successfully' });
        })
        .catch(err => res.status(500).json({ error: 'Failed to update complaint' }));
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Complaint.destroy({ where: { id } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                return res.status(404).json({ error: 'Complaint not found' });
            }
            res.status(200).json({ message: 'Complaint deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: 'Failed to delete complaint' }));
};
