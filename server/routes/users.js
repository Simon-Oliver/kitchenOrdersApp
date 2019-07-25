const express = require('express');

const router = express.Router();
// Login route
router.post('/login', (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

// Register route
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;
