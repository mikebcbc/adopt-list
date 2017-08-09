const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { text: 'Hello World' });
});

router.get('/browse', function(req, res) {
	rp({uri: 'http://localhost:3000/pets', json: true}) // Change request to client side (jquery)
	  .then(function(pets) {
	    res.render('browse', {data: pets, title: 'Browse' });
	  });
})

module.exports = router;
