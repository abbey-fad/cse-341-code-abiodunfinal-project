const router = require('express').Router();

router.use('/', require('./swagger'));

// Simple test route
router.get('/', (req, res) => {
	//#swagger.tags=['Hello World']
	res.send('Hello world');
});

// Users routes
router.use('/users', require('./users'));

// Assignments routes
router.use('/assignments', require('./assignments'));

module.exports = router;
