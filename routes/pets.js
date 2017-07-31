const express = require('express');
const rp = require('request-promise-native');
const router = express.Router();

/* GET all pets */
router.get('/', function(req, res) {
	const petOptions = {
		uri: 'http://api.petfinder.com/pet.find',
		qs: {
			format: 'json',
			key: process.env.DEV_KEY,
			location: 34787
		},
		json: true
	}
	rp(petOptions)
		.then(function(pets) {
			res.send(pets.petfinder.pets.pet);
		})
		.catch(function(err) {
			res.send(err);
		})
});

module.exports = router;
