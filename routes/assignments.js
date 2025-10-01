// routes/assignments.js
const express = require('express');
const router = express.Router();

const assignmentsController = require('../controllers/assignments');
const validation = require('../middleware/validate');

// GET all assignments
router.get('/', assignmentsController.getAll);

// GET a single assignment by ID
router.get('/:id', assignmentsController.getSingle);

// POST new assignment (with validation)
router.post('/', validation.saveAssignment, assignmentsController.createAssignment);

// PUT update assignment (with validation)
router.put('/:id', validation.saveAssignment, assignmentsController.updateAssignment);

// DELETE assignment
router.delete('/:id', assignmentsController.deleteAssignment);

module.exports = router;
