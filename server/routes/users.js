const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

const errorObj = {};

// Register route
router.get('/register', (req, res) => res.send('Register'));

// register Handle
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ name: username }).then(user => {
    if (user) {
      errorObj.error = 'Username is already taken!';
      res.status(409).send(JSON.stringify(errorObj));
    } else {
      const newUser = new User({
        name: username,
        password,
        role
      });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          // Set
          newUser.password = hash;
          // Save User
          newUser
            .save()
            .then(user => {
              const success = { user, success: 'Account has been created.' };
              res.status(200).send(JSON.stringify(success));
            })
            .catch(err => console.log(err));
        })
      );
    }
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
      return res.send(JSON.stringify({ redirectURI: '/' }));
    }
    return res.send(JSON.stringify({ redirectURI: '/login' }));
  })
);

module.exports = router;
