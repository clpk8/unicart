const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  category: String,
  condition: String,
  datePosted: Date,
  dateSold: Date,
  description: String,
  _id: String,
  paidFor: Boolean,
  price: Number,
  photos: [String],
  buyerId: String,
  sellerId: String,
  title: String,
  tags: [String],
});

module.exports = mongoose.model("Products", ProductSchema);
