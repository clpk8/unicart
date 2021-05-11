const mongoose = require('mongoose');
// const Product = require('./Product');

const UserSchema = mongoose.Schema({
  _id: String,
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  school: String,
  firstName: String,
  lastName: String,
  photoURL: String,
  rating: Number,
  reviews: [
    {
      date: Date,
      rating: Number,
      detail: String,
    },
  ],
  saved: [String],
  selling: [String],
});

module.exports = mongoose.model('Users', UserSchema);
