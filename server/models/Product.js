const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  acceptVenmo: Boolean,
  category: String,
  condition: String,
  datePosted: Date,
  dateSold: Date,
  description: String,
  id: String,
  paidFor: Boolean,
  price: Number,
  photos: Array,
  buyer: {
    name: String,
    id: String,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
