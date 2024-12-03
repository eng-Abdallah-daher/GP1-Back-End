const Comment = require('../models/commentModel');

const CommentController = {
    create: async (req, res) => {
        try {
            const commentData = req.body;
            const result = await Comment.create(commentData);
            res.status(201).json({ message: 'Comment created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating comment', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const comments = await Comment.getAll();
            res.status(200).json({ message: 'Comments retrieved successfully', data: comments });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving comments', error });
        }
    },
    getById: async (req, res) => {
        try {
            const commentId = req.params.id;
            const comment = await Comment.getById(commentId);
            if (comment) {
                res.status(200).json({ message: 'Comment retrieved successfully', data: comment });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving comment', error });
        }
    },
    update: async (req, res) => {
        try {
            const commentId = req.params.id;
            const updatedData = req.body;
            const result = await Comment.update(commentId, updatedData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Comment updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating comment', error });
        }
    },
    addReply: async (req, res) => {
        try {
            const commentId = req.params.id;
            const replyData = req.body;
            const result = await Comment.addReply(commentId, replyData);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: 'Reply added successfully', data: result });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error adding reply', error });
        }
    },
    delete: async (req, res) => {
        try {
            const commentId = req.params.id;
            const result = await Comment.delete(commentId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Comment deleted successfully' });
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error });
        }
    }
};

module.exports = CommentController;
