const express = require('express');
const router = express.Router();
const passport = require('passport');
const rp = require('request-promise-native');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { text: 'Hello World' });
});

router.get('/browse',
  passport.authenticate('jwt', {session: false, failureRedirect: '/login'}),
  (req, res) => {
  res.render('browse', { title: 'Browse Available Pets' });
});

router.get('/my-list',
  passport.authenticate('jwt', {session: false, failureRedirect: '/login'}),
  (req, res) => {
    res.render('my-list', {title: 'My List'});
  }
);

router.get('/login', (req, res) => {
	res.render('login', {title: 'Login'});
})

router.get('/logout', (req, res) => {
	res.render('logout');
})

module.exports = router;
