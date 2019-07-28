const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/welcome', (req, res) => {
  res.send('Welcome');
});

module.exports = router;
