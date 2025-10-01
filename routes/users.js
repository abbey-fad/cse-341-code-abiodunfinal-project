// routes/users.js
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

// GET /users/profile – get currently logged-in student
router.get('/profile', usersController.getProfile);

router.post('/', validation.saveUser, usersController.createUser);

// Update a student account
router.put('/:id', validation.saveUser, usersController.updateUser);

// Delete a student account
router.delete('/:id', usersController.deleteUser);
module.exports = router;
