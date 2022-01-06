const express = require('express');
const Joi = require('joi')
const morgan=require('morgan')
const logging = require('./logger/logger')
const mongoose = require('mongoose');
const app = express();
const users=require('./routes/user/users')
const employees=require('./routes/employees/employees')
app.use(express.json())
app.use('/api/employees', employees)
app.use('/api/users',users)

mongoose.connect('mongodb://localhost/mycompany', {
  useNewUrlParser: true,
}).then(()=>console.log('connected to database')).catch((error) => {console.error('Error:'+error)});
/*
if (app.get('env')==='development') {
  app.use(logging.log1);
  app.use(logging.log2);
  app.use(morgan("tiny"));
}
*/

/* middleware app.use((req, res, next) => {  console.lo("hello"); next();})*/


app.get('/', (req, res) => { 
    res.send('Hello World!');
})


/* get
app.get('/api/employee/:firstname/:lasname', (req, res) => {
   res.send(req.query) //filter ?userid=1  output { userid: 1 }
  res.send(req.params)//get params output {firstname:ali,lasname:ayja}
})
*/

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));