const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/', usersController.getAll);

// GET /users/profile – get currently logged-in student
router.get('/profile', usersController.getProfile);

router.post('/', validation.saveUser, usersController.createUser);

router.put('/:id', validation.saveUser, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);
module.exports = router;
