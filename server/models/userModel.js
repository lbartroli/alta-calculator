const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  username: { type: String, trim: true, required: true },
  password: { type: String, required: true },
  email: { type: String, trim: true, required: true }
});

const User = mongoose.model('User', schema);

module.exports = User;
