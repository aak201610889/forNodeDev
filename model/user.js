const mongoose = require('mongoose')
const Joi = require('joi');
const User = mongoose.model('User', new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024
  },

}))

function userValidate(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  });
  return schema.validate(user);
}

function userPutValidate(user) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  });
  return schema.validate(user);

}
exports.User = User;
exports.userValidate = userValidate;
exports.userPutValidate = userPutValidate;