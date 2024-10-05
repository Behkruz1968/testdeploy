// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

// Create user (POST)
router.post('/', createUser);

// Get all users (GET)
router.get('/', getUsers);

// Update a user (PUT)
router.put('/:id', updateUser);

// Delete a user (DELETE)
router.delete('/:id', deleteUser);

module.exports = router;
