const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const schema = Joi.object({ 
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['edu', 'com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  school: Joi.string().min(2).max(42).required(),
})

router.post('/register', async (req, res) => {
  // Validation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicates
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send("Email already exists in database");

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
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
