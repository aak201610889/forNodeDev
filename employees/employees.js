const express = require('express');
const router = express.Router();
const {
  Employee,
  emplyeeValidate,
  emplyeePutValidate,
} = require("../model/employee");

router.get("/", async(req, res) => {
  const employees=await Employee.find().sort('name');
  res.send(employees);
  // res.send(employees);
});
router.get("/:id", async(req, res) => {
  const findEmployee =await Employee.findById(req.params.id);
  if (!findEmployee) {
    res.status(404).send("Employee not found");
  }
  res.send(findEmployee);
});

router.post("/", async(req, res) => {
  const { error } = emplyeeValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const employee =new Employee ({
 
    fullname: req.body.fullname,
    salary: req.body.salary,
  });
await employee.save()
  res.send(employee);
});

router.put("/:id", async(req, res) => {
  const { error } = emplyeePutValidate(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  const employee = await Employee.findByIdAndUpdate(req.params.id, {
    fullname: req.body.fullname,
    salary: req.body.salary,
  }, { new: true });
  if (!employee) {
    return res.status(404).send("invaled id");
  }
  res.send(employee);
});

router.delete("/:id", async(req, res) => {
  const findEmployee = await Employee.findByIdAndRemove(req.params.id);
  if (!findEmployee) {
    res.status(404).send("Employee not found");
  }
  res.send(findEmployee);
});

module.exports = router;