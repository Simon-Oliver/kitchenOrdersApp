const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/welcome', auth, (req, res) => {
  console.log('welcome fired');
  res.json({ msg: 'This is a privat route' });
});

module.exports = router;
