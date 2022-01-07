const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../model/user");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("Invalid Email or Password");
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) {
    return res.status(404).send(" Password");
  }
res.send('ok')
});



const validate =(req)=> {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  });
  return schema.validate(req);
}
module.exports = router;
