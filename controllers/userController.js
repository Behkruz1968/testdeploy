const User = require('../models/user');

// Create a new user (POST)
const createUser = async (req, res) => {
    const { name, email, password } = req.body; // Include email and password

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Bad Request: Missing name, email, or password' });
    }

    try {
        const newUser = new User({ name, email, password }); // Create user with plain password
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to create user', error: err.message });
    }
};

// Get all users (GET)
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to fetch users', error: err.message });
    }
};

// Update a user (PUT)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body; // Expect name, email, and password

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields only if they are provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // Update password directly

        await user.save(); // Don't forget to save the updated user
        res.json({ message: 'User updated successfully', data: user });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to update user', error: err.message });
    }
};

// Delete a user (DELETE)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete user', error: err.message });
    }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
