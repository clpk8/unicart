const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const upload = require('./fileUpload');
const verifyToken = require('./verifyToken');

/* GET products listing. */
router.get('/fetch', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Get a specific product based on product ID
 * Example: curl -X GET localhost:3001/products/607b36e6f153b21c4f6e7499
 * where 607b36e6f153b21c4f6e7499 is the ID
 */
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Create a product object. photos will be saved to /images and the
 * path to the photo will be stored in the mongoDB.
 *
 * When accessing the photo, front-end could access:
 * http://localhost:3001/{photoPath}
 *
 * Request must be a /multipart/form-data, you could try it out in postman
 */
router.post('/create', verifyToken, upload.array('photos'), (req, res) => {
  const photoPaths = [];
  if (req.files) {
    req.files.forEach((file) => {
      photoPaths.push(file.path);
    });
  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    paidFor: req.body.paidFor,
    price: req.body.price,
    buyerId: req.body.buyerId,
    photos: photoPaths,
    sellerId: req.body.sellerId,
    title: req.body.title,
    tags: req.body.tags,
  });

  try {
    product.save().then((savedProduct) => {
      res.status(200).json(savedProduct);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Delete a product
 */
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productId });
    res.status(200).json(removedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * get product by sellderID
 */
router.get('/fetch/:sellerId', async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.params.sellerId });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
