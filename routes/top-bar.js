const express = require('express');
const router = express.Router();
const TopBar = require('../models/top-bar');

// Get all records
router.get('/', async (req, res) => {
	const topBar = await TopBar.find();

	res.json(topBar);
});

// Create new record
router.post('/new', async (req, res) => {
	const newTopBar = new TopBar(req.body);

	const savedTopBar = await newTopBar.save();

	res.json(savedTopBar);
});

// Get specific record
router.get('/get/:id', async (req, res) => {
	const q = await TopBar.findById({ _id: req.params.id });
	res.json(q);
});

// Delete record
router.delete('/delete/:id', async (req, res) => {
	const result = await TopBar.findByIdAndDelete({ _id: req.params.id });

	res.json(result);
});

// Update record
router.patch('/update/:id', async (req, res) => {
	const q = await TopBar.updateOne({ _id: req.params.id }, { $set: req.body });

	res.json(q);
});

// Get random record
router.get('/random', async (req, res) => {
	const count = await TopBar.countDocuments();
	const random = Math.floor(Math.random() * count);
	const q = await TopBar.findOne().skip(random);

	res.json(q);
});

module.exports = router;
