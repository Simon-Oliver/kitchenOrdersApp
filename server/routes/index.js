const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/welcome', auth, (req, res) => {
  res.json({ msg: 'This is a privat route' });
});

module.exports = router;
