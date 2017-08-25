const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const {Pet, User} = require('../models');

/* GET pets from list */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
	console.log(req.user.id);
	User.findById(req.user.id).populate('pets')
	.then(pets => {
		res.status(201).json(pets.pets);
	})
	.catch(e => {
		console.log(e);
	}) 
})

/* POST pet to list */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Pet.create({
		name: req.body.name,
		description: req.body.description,
		image: req.body.image,
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

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Promise.all([Pet.findById(req.params.id)
		.then(pet => {
			pet.belongsTo.pull({ _id: req.user.id});
			pet.save();
		}),
		User.findById(req.user.id)
		.then(user => {
			user.pets.pull({_id: req.params.id});
			user.save();
		})
	])
	.then(() => res.status(204).end())
  .catch(err => res.status(500).json({message: err}));
})

module.exports = router;
