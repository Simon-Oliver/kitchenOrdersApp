const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

const errorObj = {};

// Login route
router.post('/login', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

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
              res.status(200).send(JSON.stringify(user));
            })
            .catch(err => console.log(err));
        })
      );
    }
  });
});

module.exports = router;
