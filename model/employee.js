const mongoose = require('mongoose');
const Joi = require('joi');

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    fullname: { type: String, required: true, minlength: 3 },
    salary: { type: Number, required: true, max: 100000 },
  })
);
function emplyeeValidate(employee) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    salary: Joi.number().integer().max(100000).required(),
  });
  return schema.validate(employee);
}

function emplyeePutValidate(employee) {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    salary: Joi.number().integer().max(100000).required(),
  });
  return schema.validate(employee);
}
exports.Employee = Employee;
exports.emplyeeValidate = emplyeeValidate;
exports.emplyeePutValidate = emplyeePutValidate;