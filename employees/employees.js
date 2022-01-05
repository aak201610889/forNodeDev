const express = require('express');
const router = express.Router();
const Joi=require('joi')
const employees = [
  { empID: 1, fullname: "John Doe", salary: 3000 },
  { empID: 2, fullname: "depo Doe", salary: 4000 },
  { empID: 3, fullname: "Jack Doe", salary: 5000 },
  { empID: 4, fullname: "Jill Doe", salary: 6000 }
];

router.get("/", (req, res) => {

  res.send(employees);
});
router.get("/:id", (req, res) => {
  const findEmployee = employees.find((emp) => emp.empID == req.params.id);
  if (!findEmployee) {
    res.send("Employee not found");
  }
  res.send(findEmployee);
});
router.post("/", (req, res) => {
  const { error } = emplyeeValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const newEmployee = {
    empID: req.body.empID,
    fullname: req.body.fullname,
    salary: req.body.salary,
  };
  employees.push(newEmployee);
  res.send(employees);
});

router.put("/:id", (req, res) => {
  const findEmployee = employees.find((emp) => emp.empID == req.params.id);
  if (!findEmployee) {
    res.send("Employee not found");
  }
  const { error } = emplyeePutValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  findEmployee.fullname = req.body.fullname;
  res.send(findEmployee);
});

router.delete("/:id", (req, res) => {
  const findEmployee = employees.find((emp) => emp.empID == req.params.id);
  if (!findEmployee) {
    res.send("Employee not found");
  }
  const employeeIndex = employees.indexOf(findEmployee);
  employees.splice(employeeIndex, 1);
  res.send(findEmployee);
});
function emplyeeValidate(employee) {
  const schema = Joi.object({
    empID: Joi.number().integer().max(100).required(),
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
module.exports = router;