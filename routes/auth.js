const md5 = require("md5");
const Joi = require('joi');
const {User} = require("../models/user");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email});

  if (user && user.password === md5(req.body.password)) {
    const token = user.generateAuthToken();
    return res.send(token);
  } else {
    return res.status(400).send("Invalid email or password");
  }
});

function validateLogin(req) {
  const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}


module.exports = router; 