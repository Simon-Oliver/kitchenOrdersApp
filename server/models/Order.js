const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  menuItem: { type: String, required: true },
  notes: { type: String },
  allergies: { type: String },
  orderComplete: { type: Boolean, default: false },
  _author: { type: Schema.Types.ObjectId, ref: 'user' },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderItemSchema);
