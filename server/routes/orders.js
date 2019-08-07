const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/', auth, (req, res) => {
  Order.find({})
    .then(orderArr => {
      res.status(200).json({ orders: orderArr });
    })
    .catch(err => console.log(err));
});

router.post('/new', auth, (req, res) => {
  const { menuItem, allergies, notes } = req.body;
  const { id } = req.user;

  User.findById(id).then(user => {
    const newOrder = new Order({ menuItem, allergies, notes, _author: user._id });
    user.orders.push(newOrder);
    newOrder
      .save()
      .then(order => {
        user.save();
        res.status(200).json({ success: 'Order has been added.' });
      })
      .catch(err => console.log(err));
  });
});

router.get('/order', auth, (req, res) => {
  res.json({ msg: 'Added new order.' });
});

module.exports = router;
