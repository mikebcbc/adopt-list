const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const { User} = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
	secretOrKey: 'xczadf152%sxx!)32@1znbos@1az95u40cm%&edaf(#a',
	algorithms: ['HS256']
};

// const jwtAuth = new JwtStrategy(opts, (payload, done) => {
// 	User
// 	.findOne({id: payload.sub})
// 	.then(err, user) => {
// 		if (err) {
// 			return Promise.reject({
// 				reason: 'LoginError',
// 				message: 'Incorrect username or password'
// 			});
// 		}
// 		return Promise.resolve();
// 	}
// })

const jwtAuth = new JwtStrategy(opts, (payload, done) => {
	done(null, payload.user);
});

module.exports = {jwtAuth};