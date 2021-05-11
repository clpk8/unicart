const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/User');

require('dotenv/config');

const userJoiSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['edu', 'com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  school: Joi.string().min(2).max(42).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['edu', 'com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

router.options('/register', cors());
router.post('/register', async (req, res) => {
  // Validation
  const { error } = userJoiSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicates
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('Email already exists in database');
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    school: req.body.school,
  });

  try {
    // const savedUser = await user.save();
    await user.save();
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err.message);
  }

  return 'Registering new user...';
});

// Log in
router.options('/login', cors());
router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginJoiSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .send('There is no user with this email in the database');
  }

  // Check for password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  // Create and assign JWT
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ token, user });

  return 'Logging in...';
});

module.exports = router;
