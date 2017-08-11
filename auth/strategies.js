const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const {User} = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
	secretOrKey: 'xczadf152%sxx!)32@1znbos@1az95u40cm%&edaf(#a',
	algorithms: ['HS256']
};

const basicAuth = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .then(_user => {
      user = _user;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password',
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username or password',
        });
      }
      return callback(null, user)
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false, err);
      }
      return callback(err, false);
    });
});


const jwtAuth = new JwtStrategy(opts, (payload, done) => {
	User.findOne({id: payload.sub}, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		}
	})
	return done(null, true);
});

module.exports = {basicAuth, jwtAuth};