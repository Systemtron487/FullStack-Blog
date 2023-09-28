const apperr = (message,statuscode)=>{
 let  error = new Error(message)
 error.stack = error.stack
 error.statuscode = statuscode ? statuscode:500
 return error
}

module.exports = apperr