const Comment = require('../models/commentModel');

exports.create = (req, res) => {
    const { commenterId, postId, text } = req.body;
    Comment.create({ commenterId, postId, text })
        .then(comment => res.status(201).json(comment))
        .catch(err => res.status(500).json({ error: 'Failed to create comment' }));
};

exports.getAll = (req, res) => {
    Comment.findAll()
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json({ error: 'Failed to get comments' }));
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Comment.findByPk(id)
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.status(200).json(comment);
        })
        .catch(err => res.status(500).json({ error: 'Failed to get comment' }));
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { text, isLiked } = req.body;
    Comment.update({ text, isLiked }, { where: { id } })
        .then(([affectedRows]) => {
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment updated successfully' });
        })
        .catch(err => res.status(500).json({ error: 'Failed to update comment' }));
};

exports.delete = (req, res) => {
    const { id } = req.params;
    Comment.destroy({ where: { id } })
        .then(deletedCount => {
            if (deletedCount === 0) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.status(200).json({ message: 'Comment deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: 'Failed to delete comment' }));
};
