const log1 = (req, res, next) => { 
  console.log('ayham kattan');
  next()
}
const log2 = (req, res, next) => { 
  console.log('omar kattan');
  next()
}
module.exports={log1,log2}