const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// Config gets secret variables from default.json

config.get('jwtSecret');

// User Model
const User = require('../models/User');

const router = express.Router();

// auth User
router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter all fields.' });
  }

  // Check for user
  User.findOne({ name: username }).then(user => {
    if (!user) {
      return res.status(409).json({ error: 'User does not exist' });
    }

    // Valadating Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ error: 'Invalid Credentials' });

      jwt.sign(
        { id: user.id, role: user.role, name: user.name },
        config.get('jwtSecret'),
        {
          expiresIn: 3600
        },

        (err, token) => {
          if (err) throw err;
          // res.status(200).json({
          //   token,
          //   user: { id: user.id, name: user.name, role: user.role },
          //   success: 'Account has been authenticated.'
          // });
          res
            .cookie('token', token, { httpOnly: true })
            .json({ user: { id: user.id, name: user.name, role: user.role } })
            .sendStatus(200);
        }
      );
    });
  });
});

// Login Handle
router.get('/auth/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

router.get('/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/', httpOnly: true });
  return res.json({ redirect: '/login' }).status(200);
});

module.exports = router;
