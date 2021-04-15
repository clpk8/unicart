const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* GET products listing. */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    console.log(req.params.productId);
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const product = new Product({
    acceptVenmo: req.body.acceptVenmo,
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    paidFor: req.body.paidFor,
    price: req.body.price,
    buyer: req.body.buyer,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productId });
    res.status(200).json(removedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
