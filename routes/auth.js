const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const createAuthToken = user => {
  return jwt.sign({user}, 'xczadf152%sxx!)32@1znbos@1az95u40cm%&edaf(#a', {
    subject: user.username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

router.post('/login',
  passport.authenticate('basic', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user.apiRepr());
    res.json({authToken});
  }
);

router.post('/refresh',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    console.log(res);
    res.json({authToken});
  }
);

module.exports = router;
