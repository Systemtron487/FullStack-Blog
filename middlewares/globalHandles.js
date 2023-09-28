const globalerrHandler = (err,req,res,next)=>{
 //Status:failed/something happened/server error
 //Actual Message
 //Stack
const stack = err.stack;
const message = err.message;
const status = err.status ? err.status: "failed"
const statuscode = err.statuscode ? err.statuscode: 500
//send response 
res.status(statuscode).json({
  message,
  stack,
  status,
})
}
module.exports = globalerrHandler