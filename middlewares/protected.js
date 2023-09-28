const apperr = require("../utils/apperr")
const protected = (req,res,next)=>{
  //Check if user is logged in 
  if(req.session.userAuth){
    next()
  }else{
    next(apperr('Not Authorized, login again ')) 
  }
}
module.exports = protected