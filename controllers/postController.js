const Post = require('../models/postModel');

exports.getAll = (req, res) => {
    Post.getAll((err, posts) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving posts' });
        }
        res.status(200).json(posts);
    });
};

exports.getById = (req, res) => {
    const postId = req.params.id;
    Post.getById(postId, (err, post) => {
        if (err || !post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    });
};

exports.create = (req, res) => {
    const { ownerId, description, postImage } = req.body;
    const postData = { ownerId, description, postImage };
    Post.create(postData, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating post' });
        }
        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    });
};

exports.update = (req, res) => {
    const postId = req.params.id;
    const { description, postImage } = req.body;
    Post.update(postId, { description, postImage }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating post' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully' });
    });
};

exports.delete = (req, res) => {
    const postId = req.params.id;
    Post.delete(postId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting post' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    });
};
