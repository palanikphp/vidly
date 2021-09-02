const auth = require("../middleware/auth");
const _ = require("lodash");
var md5 = require("md5");
const {User, validate} = require("../models/user");
const mongoose = require("mongoose");
const express = require('express');
const { required } = require("joi/lib/types/lazy");
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User aleady registerd");

  user = new User(
    { 
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password)
    }
  );
  user = await user.save();
  
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(req.params.id,
//     { 
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     }, { new: true });

//   if (!user) return res.status(404).send('The user with the given ID was not found.');
  
//   res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//   const user = await User.findByIdAndRemove(req.params.id);

//   if (!user) return res.status(404).send('The user with the given ID was not found.');

//   res.send(user);
// });

// router.get('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) return res.status(404).send('The user with the given ID was not found.');

//   res.send(user);
// });

module.exports = router; 