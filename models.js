const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Lists
const listSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true},
	contactInfo: {
		phone: {type: String, required: false},
		email: {type: String, required: true}
	}
});

// Users
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.methods.apiRepr = function() {
	return {
		username: this.username || ''
	};
};

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const List = mongoose.model('List', listSchema);
const User = mongoose.model('User', userSchema);

module.exports = {List, User};