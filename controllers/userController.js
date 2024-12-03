const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.status(200).json(users);
        }
    });
};

const getUserById = (req, res) => {
    userModel.getUserById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch user' });
        } else {
            res.status(200).json(user);
        }
    });
};

const addUser = (req, res) => {
    userModel.addUser(req.body, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add user' });
        } else {
            res.status(201).json({ message: 'User added successfully', userId: result.insertId });
        }
    });
};

const updateUser = (req, res) => {
    userModel.updateUser(req.params.id, req.body, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update user' });
        } else {
            res.status(200).json({ message: 'User updated successfully' });
        }
    });
};

const deleteUser = (req, res) => {
    userModel.deleteUser(req.params.id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete user' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
