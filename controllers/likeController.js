const Like = require('../models/likeModel');

const likeController = {
    getAllLikes: async (req, res) => {
        try {
            const likes = await Like.getAllLikes();
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching likes', error: err });
        }
    },

    getLikeById: async (req, res) => {
        try {
            const like = await Like.getLikeById(req.params.id);
            if (!like) {
                return res.status(404).json({ message: 'Like not found' });
            }
            res.status(200).json(like);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching like', error: err });
        }
    },

    addLike: async (req, res) => {
        const { userId, postId } = req.body;
        try {
            const newLike = await Like.addLike(userId, postId);
            res.status(201).json({ message: 'Like added successfully', like: newLike });
        } catch (err) {
            res.status(500).json({ message: 'Error adding like', error: err });
        }
    },

    deleteLike: async (req, res) => {
        try {
            const result = await Like.deleteLike(req.params.id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Like not found' });
            }
            res.status(200).json({ message: 'Like deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting like', error: err });
        }
    }
};

module.exports = likeController;
