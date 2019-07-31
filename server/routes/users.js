const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Config gets secret variables from default.json
const config = require('config');

config.get('jwtSecret');

// User Model
const User = require('../models/User');

const router = express.Router();

// register Handle
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Please enter all fields.' });
  }
  User.findOne({ name: username }).then(user => {
    if (user) {
      return res.status(409).json({ error: 'Username is already taken!' });
    }
    const newUser = new User({
      name: username,
      password,
      role
    });

    // Hash Password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        // Set hashed password
        newUser.password = hash;
        // Save User
        newUser
          .save()
          .then(user => {
            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              {
                expiresIn: 3600
              },

              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                  user: { id: user.id, name: user.name, role: user.role },
                  success: 'Account has been created.'
                });
              }
            );
          })
          .catch(err => console.log(err));
      })
    );
  });
});

// Login Handle
router.post(
  '/login',
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  passport.authenticate('local', (req, res) => {
    console.log(`User`, req.user);
    if (req.user || req.session.user) {
      return res.json({ redirectURI: '/' });
    }
    return res.json({ redirectURI: '/login' });
  })
);

module.exports = router;
