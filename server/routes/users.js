const express = require('express');
const User = require('../models/User');

const router = express.Router();
// Login route
router.post('/login', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

// Register route
router.get('/register', (req, res) => res.send('Register'));

// register Handle
router.post('/register', (req, res) => {
  const { username, email } = req.body;
  console.log(req.body);
});

module.exports = router;
