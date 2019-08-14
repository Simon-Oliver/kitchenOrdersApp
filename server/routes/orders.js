const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const router = express.Router();

router.get('/', auth, (req, res) => {
  Order.find({})
    .populate('_items')
    .exec(function(err, order) {
      if (err) console.log(err);
      res.status(200).json({ orders: order });
    });
  // .then(orderArr => {
  //   res.status(200).json({ orders: orderArr });
  // })
  // .catch(err => console.log(err));
});

router.post('/new', auth, (req, res) => {
  const { tableName, orders } = req.body;
  const { id } = req.user;

  User.findById(id).then(user => {
    const newOrder = new Order({ _items: [], _author: user._id, tableName });

    user.orders.push(newOrder);

    orders.forEach(e => {
      const newOrderItem = new OrderItem({
        menuItem: e.menuItem,
        allergies: e.allergies,
        notes: e.notes,
        _author: user._id,
        _order: newOrder._id
      });
      newOrder._items.push(newOrderItem);
      newOrderItem.save();
    });

    newOrder
      .save()
      .then(order => {
        user.save();
        newOrder.save();
        res.status(200).json({ success: 'Order has been added.' });
      })
      .catch(err => console.log(err));
  });
});

router.get('/order', auth, (req, res) => {
  res.json({ msg: 'Added new order.' });
});

module.exports = router;
