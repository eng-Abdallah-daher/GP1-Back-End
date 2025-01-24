const User = require('../models/userModel');

const UserController = {
    create: async (req, res) => {
        try {
            const userData = req.body;
            const result = await User.create(userData);
            res.status(201).json({ message: 'User created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await User.getAll();
            res.status(200).json({ message: 'Users retrieved successfully', data: users });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    },
    getById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.getById(userId);
            if (user) {
                res.status(200).json({ message: 'User retrieved successfully', data: user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    },
    update: async (req, res) => {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const result = await User.update(userId, userData);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'User updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    },
    updatePassword: async (req, res) => {
        try {
            const userId = req.params.id;
            const { newPassword } = req.body;
            const result = await User.updatePassword(userId, newPassword);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Password updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating password', error });
        }
    },
    updateactivestatus: async (req, res) => {
        try {
            const userId = req.params.id;
            const { newstatus } = req.body;
            const result = await User.updatestatus(userId, newstatus);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'Status updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating status', error });
        }
    },
       updateprofileimage: async (req, res) => {
        try {
            const userId = req.params.id;
            const { newimage } = req.body;
            const result = await User.updateprofileimage(userId, newimage);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'image updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating image', error });
        }
    },
      updateonlinestatus: async (req, res) => {
        try {
            const email = req.params.email;
            
            const { status } = req.body;
           
            const result = await User.updateonlinestatus(email, status);
            if (result.matchedCount > 0) {
                res.status(200).json({ message: 'status updated successfully', data: result });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating status', error });
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.params.id;
            const result = await User.delete(userId);
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    },
    getByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const user = await User.getByEmail(email);
            if (user) {
                res.status(200).json({ message: 'User retrieved successfully', data: user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    },
    authenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.authenticate(email, password);
            if (user) {
                res.status(200).json({ message: 'Authentication successful', data: user });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error authenticating user', error });
        }
    },
    addRateToUser : async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body; 

    if (isNaN(rate)) {
        return res.status(400).json({ message: "Invalid rate value" });
    }

    try {
        const result = await User.addRate(id, parseInt(rate));
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Rate added successfully" });
        } else {
            res.status(404).json({ message: "User not foundpppp" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
},
deleteRate : async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;

    if (!rate || isNaN(rate)) {
        return res.status(400).json({ message: "Invalid rate value" });
    }

    try {
        const parsedRate = parseInt(rate);
        const result = await User.removeRate(id, parsedRate);

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Rate removed successfully" });
        } else {
            res.status(404).json({ message: "User not found or rate does not exist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

}; 

module.exports = UserController;
