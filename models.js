const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const petSchema = mongoose.Schema({
	petId: {type: String, required: true},
	name: {type: String, required: true},
	description: {type: String, required: true},
	image: {type: String, required: true},
	contactInfo: {
		phone: {type: String, required: false},
		email: {type: String, required: true}
	},
	belongsTo: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

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
	},
	zip: {
		type: String,
		required: true
	},
	pets: [{type: Schema.Types.ObjectId, ref: 'Pet'}]
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

const Pet = mongoose.model('Pet', petSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Pet, User};