const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/welcome', auth, (req, res) => {
  return res.json({ user: req.user, msg: 'This is a privat route and you can see it.' });
});

module.exports = router;
