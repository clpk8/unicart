const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const multer = require("multer");

/**
 * Change the name of the file to the date + the original name
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./product_photos/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

/**
 * Reject a file if mimetype is not jpeg or png for now
 * @param {*} req request
 * @param {*} file file to check for
 * @param {*} cb callback
 */
const fileFilter = (req, file, cb) => {
  // reject a file
  // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  if (file) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * use multer with the storage and fileFilter above, with a file limitation
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/* GET products listing. */
router.get("/", async (req, res) => {
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
router.get("/:productId", async (req, res) => {
  try {
    console.log(req.params.productId);
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Create a product object. photos will be saved to /product_photos and the
 * path to the photo will be stored in the mongoDB.
 *
 * When accessing the photo, front-end could access:
 * http://localhost:3001/{photoPath}
 *
 * Request must be a /multipart/form-data, you could try it out in postman
 */
router.post("/", upload.array("photos"), (req, res) => {
  console.log(req.files);
  let photoPaths = [];
  req.files.forEach((file) => {
    photoPaths.push(file.path);
  });
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    acceptVenmo: req.body.acceptVenmo,
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    paidFor: req.body.paidFor,
    price: req.body.price,
    buyerId: req.body.buyerId,
    photos: photoPaths,
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
router.delete("/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productId });
    res.status(200).json(removedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
