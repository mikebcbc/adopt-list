const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	contactInfo: {
		phone: {type: String, required: false},
		email: {type: String, required: true}
	}
});

const List = mongoose.model('List', listSchema);

module.exports = {List};