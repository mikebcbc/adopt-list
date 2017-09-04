const express = require('express');
const rp = require('request-promise-native');
const passport = require('passport');
const router = express.Router();

/* GET all pets */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
	const petOptions = {
		uri: 'http://api.petfinder.com/pet.find',
		qs: {
			format: 'json',
			key: process.env.DEV_KEY,
			location: req.user.zip
		},
		json: true
	}
	rp(petOptions)
		.then(function(pets) {
			const modifiedPets = pets.petfinder.pets.pet.map((pet)=> {
				pet.media.photos.photo = pet.media.photos.photo.map((photo)=> {
					return photo.$t.substring(0, photo.$t.indexOf('?'));
				})
				.filter((photo, index, arr)=> {
					return arr.indexOf(photo) == index;
				});
				return pet;
			});
			res.send(modifiedPets);
		})
		.catch(function(err) {
			res.send(err);
		});
});

module.exports = router;
