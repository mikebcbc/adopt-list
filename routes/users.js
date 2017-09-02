const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('../models');

/* POST new user */
router.post('/', jsonParser, (req, res) => {
  let {username, password, zip} = req.body;
  return User
  	.find({username})
  	.count()
  	.then(count => {
  		if (count > 0) {
  			return Promise.reject({
  				code: 422,
  				reason: 'TakenError',
  				message: 'Username already taken'
  			});
  		};
  		return User.hashPassword(password);
  	})
  	.then(hash => {
  		return User
  			.create({
  				username,
  				password: hash,
          zip
  			})
  	})
  	.then(user => {
  		return res.status(201).json(user.apiRepr());
  	})
  	.catch(err => {
  		if (err.reason === 'TakenError') {
  			return res.status(err.code).json(err);
  		}
      console.log(req.body);
  		res.status(500).json({code: 500, message: 'Internal server error'});
  	});
});

module.exports = router;
