// controllers/userController.js
const User = require('../models/user');

// Create a new user (POST)
const createUser = async (req, res) => {
    const { name, age, surname } = req.body;

    // Validate input fields
    if (!name || !age || !surname) {
        return res.status(400).json({ message: 'Bad Request: Missing name, age, or surname' });
    }

    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ message: 'Bad Request: Age must be a positive number' });
    }

    try {
        const newUser = new User({ name, age, surname });
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


const updateUser = async (req, res) => {
    const { id } = req.params;
   const {name,age,surname} = req.User

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.age = age || user.age;
        user.surname = surname || user.surname;

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
