const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all users
const getAll = async (req, res) => {
	//#swagger.tags=['Users']
	try {
		const users = await mongodb.getDatabase().collection('users').find().toArray();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// GET /users/profile (mocked for now)
const getProfile = async (req, res) => {
	//#swagger.tags=['Users']
	try {
		const userId = req.query.id; // /users/profile?id=someId
		if (!ObjectId.isValid(userId)) {
			return res.status(400).json('Must use a valid user id.');
		}

		const user = await mongodb
			.getDatabase()
			.collection('users')
			.findOne({ _id: new ObjectId(userId) });

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// POST /users
const createUser = async (req, res) => {
	//#swagger.tags=['Users']
	const user = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		createdAt: new Date()
	};

	try {
		const response = await mongodb
			.getDatabase()
			.collection('users')
			.insertOne(user);

		if (response.acknowledged) {
			res.status(201).json({ _id: response.insertedId, ...user });
		} else {
			res.status(500).json(response.error || 'Error creating user.');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// PUT /users/:id
const updateUser = async (req, res) => {
	//#swagger.tags=['Users']
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).json('Must use a valid user id.');
	}

	const userId = new ObjectId(req.params.id);
	const user = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		updatedAt: new Date()
	};

	try {
		const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);

		if (response.modifiedCount > 0) {
			res.status(200).json({ message: 'User updated successfully.' });
		} else {
			res.status(404).json({ message: 'User not found.' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
	//#swagger.tags=['Users']
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).json('Must use a valid user id.');
	}

	const userId = new ObjectId(req.params.id);

	try {
		const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });

		if (response.deletedCount > 0) {
			res.status(200).json({ message: 'User deleted successfully.' });
		} else {
			res.status(404).json({ message: 'User not found.' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getAll, createUser, getProfile, updateUser, deleteUser };
