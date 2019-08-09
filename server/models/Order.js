const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  orderComplete: { type: Boolean, default: false },
  _items: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  _author: { type: Schema.Types.ObjectId, ref: 'users' },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Orders', OrderSchema);
