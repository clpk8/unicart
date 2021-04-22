const mongoose = require("mongoose");
const Product = require("./Product");

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  _id: String,
  photoURL: String,
  rating: Number,
  reviews: [
    {
      date: Date,
      rating: Number,
      detail: String,
    },
  ],
  buying: [String],
  selling: [String],
});

module.exports = mongoose.model("Users", UserSchema);
