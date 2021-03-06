const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItem: { type: String, required: true },
  notes: { type: String },
  allergies: { type: String },
  _author: { type: Schema.Types.ObjectId, ref: 'User' },
  _order: { type: Schema.Types.ObjectId, ref: 'Order' },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);
