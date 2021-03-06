const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
