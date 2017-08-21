const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const {Pet} = require('../models');

/* POST pet to list */
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {
	Pet.create({
		name: req.body.name,
		description: req.body.description,
		contactInfo: {
			phone: req.body.contactInfo.phone,
			email: req.body.contactInfo.email
		}
	})
	.then(pet => {
		req.user.pets.push(pet._id);
		req.user.save((err, user) => {
			pet.belongsTo.push(req.user.id);
			pet.save((err, pet) => {
				if (err) {
					console.log(err);
				}
				res.status(201).json(pet)
			});
		})
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal Server Error'});
	});
});

router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {

})

module.exports = router;
