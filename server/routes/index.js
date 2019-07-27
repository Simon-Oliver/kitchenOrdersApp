const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/welcome', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }
    res.json(shifts);
  });
});

module.exports = router;
