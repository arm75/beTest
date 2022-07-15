const mongoose = require('mongoose');

const TopBarSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('TopBar', TopBarSchema);
