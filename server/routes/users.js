const express = require('express');

const router = express.Router();
const User = require('../models/User');
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
 * Add a saved product to user
 */
router.post('/addToSaved', verifyToken, (req, res) => {
  const { userId, itemId } = req.body;

  try {
    User.findByIdAndUpdate(
      userId,
      { $push: { saved: itemId } },
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
