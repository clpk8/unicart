const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const upload = require('./fileUpload');
const verifyToken = require('./verifyToken');

/* GET users listing. */
router.get('/fetch', verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/* GET single user */
router.get('/:userId', async (req, res) => {
  try {
    console.log(req.params.userId);
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/* POST a single user, allow a photo upload for profile image */
router.post('/create', verifyToken, upload.single('photo'), (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, obj) => {
    if (obj === null) {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        photoURL: req.file.path,
        rating: 0,
        reviews: [],
        saved: [],
        selling: [],
      });
      try {
        user.save().then((savedUser) => {
          res.status(200).json(savedUser);
        });
      } catch (saveErr) {
        res.status(400).json({ message: saveErr });
      }
    } else {
      res
        .status(400)
        .json({ message: `user with email ${email} already exist` });
    }
  });
});

/**
 * Add a selling product to user
 */
router.post('/addToSelling', verifyToken, (req, res) => {
  const { userId, itemId } = req.body;

  try {
    User.findByIdAndUpdate(
      userId,
      { $push: { selling: itemId } },
      { safe: true, upsert: true },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated User : ', docs);
        }
      },
    );
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

/**
 * Delete a user
 */
router.delete('/:userId', verifyToken, async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.status(200).json(removedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
