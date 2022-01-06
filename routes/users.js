const express = require('express');
const router = express.Router();
const { User, userValidate, userPutValidate } = require("../model/user");
const _ = require('lodash');
const bcrypt=require('bcryptjs');

router.get("/", async (req, res) => {
  const user = await User.find().sort('name');
  res.send(user);
});

router.get('/:id', async (req, res) => {
  const findUser = await User.findById(req.params.id);
  if (!findUser) {
    res.status(404).send("User not found");
  }
  res.send(findUser);
})

router.post("/", async (req, res) => {
  const { error } = userValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }
  user = new User(_.pick(req.body, ['fullname', 'email', 'password']))  
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['fullname', 'email']));
})

router.put("/:id", async (req, res) => {
  const { error } = userPutValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const user = await User.findByIdAndUpdate(req.params.id, {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  }, { new: true });
  if (!user) {
    return res.status(404).send("invaled id");
  }
  res.send(user);
})
router.delete("/:id", async (req, res) => {
  const findUser = await User.findByIdAndRemove(req.params.id);
  if (!findUser) {
    res.status(404).send("User not found");
  }
  res.send(findUser);
})
module.exports = router;