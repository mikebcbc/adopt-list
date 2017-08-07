const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {List} = require('../models');

/* POST pet to list */
router.post('/', function(req, res) {
	List.create({
		name: req.body.name,
		description: req.body.description,
		contactInfo: {
			phone: req.body.contactInfo.phone,
			email: req.body.contactInfo.email
		}
	})
	.then(list => res.status(201).json(list))
	.catch(err => {
		console.log(err);
		res.status(500).json({message: 'Internal Server Error'});
	});
});

module.exports = router;
