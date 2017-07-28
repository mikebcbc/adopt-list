const express = require('express');
const router = express.Router();

const { data } = require('../public/javascripts/client.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { text: 'Hello World' });
});

router.get('/browse', function(req, res) {
	res.render('browse', { data: data });
})

module.exports = router;
