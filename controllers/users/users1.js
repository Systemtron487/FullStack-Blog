const bcrypt = require("bcryptjs")
const User = require('../../models/users/user')
const apperr = require("../../utils/apperr")



//register
const registerctrl = async(req,res,next)=>{
      const {fullname,email, password} = req.body
      console.log(req.body);
      //Check if field is empty
      if(!fullname || !email || !password){
           // return next(apperr('All fields are required'))
           return res.render('users/register',{
             error: "All fields are required",
           })
      }
  try {
      //1. Check if user exist(email)
       const userFound = await User.findOne({email})   
       //Throw error if email exists
       if(userFound)
       return res.render('users/register',{
            error: "User already exists",
          })
       
       //Hash Password
       const salt = await bcrypt.genSalt(10)
       const passwordHashed =  await bcrypt.hash(password, salt);
       //register User
       const user = await User.create({
            fullname,
            email,
            password: passwordHashed,
       })
      //Redirect
      res.redirect('/api/v1/users/profile-page')
  } catch (error) {
       res.json(error)
  }
}   

//Login
const loginctrl = async(req,res,next)=>{
      const {email, password} = req.body
      if(!email || !password){
         return next(apperr('Email and Password required'))
      }
  try {
      //Check If email exists
      const userFound = await User.findOne({email})
      if(!userFound){
            //Throw error
            if(userFound)
            
           
             return res.render('users/login',{
                 error: "Invalid Login Creadentials",
               }) 
      }
      //Verify Password
      const validpassword = await bcrypt.compare(password, userFound.password) 
      if(!validpassword)
      //Throw Error
      return res.render('users/login',{
            error: "Invalid Login Creadentials",
          }) 

      //Save the user into
      req.session.userAuth = userFound._id
      console.log(req.session);
      //Redirect
      res.redirect('/api/v1/users/profile-page')
  } catch (error) {
       res.json(error)
  }
 }

 //Details
 const detailsctrl = async(req,res)=>{
  try {
      //get user id from params
      const userID = req.params.id
      //Find the user
      const user = await User.findById(userID)
        res.json({
         status:'success',
         data: user
        })
  } catch (error) {
       res.json(error)
  }
 }

//User Profile
const profilectrl = async(req,res)=>{
  try {
      //Get the login User
      const userID = req.session.userAuth;
      //Find the user
      const user = await User.findById(userID).populate('posts').populate.apply("comments")
        res.json({
         status:'success',
         data: user
        })
  } catch (error) {
       res.json(error)
  }
 }

//Upload Profile Photo
const ppctrl = async(req,res,next)=>{
      console.log(req.file.path);
  try {
      //Find the user to be updated
      const userID = req.session.userAuth;
      const userFound = await User.findById(userID);
      //Check if user is found
      if(!userFound){
         return next(apperr('User not found',403))
      }
      //Update Profile Photo
      await User.findByIdAndUpdate(userID,{
            profileImage: req.file.path,   
      },{
            new:true
      })
        res.json({
         status:'success',
         user: 'Succesfully Updated Profile Picture'
        })
  } catch (error) {
      next(apperr(error.message))
  }
 }

 //Upload Cover photo
 const cpctrl = async(req,res)=>{
      try {
            //Find the user to be updated
            const userID = req.session.userAuth;
            const userFound = await User.findById(userID);
            //Check if user is found
            if(!userFound){
               return next(apperr('User not found',403))
            }
            //Update Profile Photo
            await User.findByIdAndUpdate(userID,{
                  coverImage: req.file.path,   
            },{
                  new:true
            })
              res.json({
               status:'success',
               user: 'Succesfully Updated Cover Picture'
              })
        } catch (error) {
            next(apperr(error.message))
        }
 }

 //Update Password
 const passwordctrl = async(req,res,next)=>{
      const {password} = req.body
  try {
      //Check if user is updating the password
      if(password){
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt)
               //Update User
            await User.findByIdAndUpdate(req.params.id,{
                  password: passwordHashed
            },{
                  new: true
            })
              res.json({
               status:'success',
               user: 'Password Changed Successfully ',
              })
      }

      
  } catch (error) {
      return next(apperr())
 }
}

 //Update User
 const uuctrl = async(req,res,next)=>{
      const {fullname,email} = req.body
  try {
      //Check If email is taken
      if(email){
            const emailTaken = await User.findOne({email})
            if(emailTaken){
                  return next(apperr('Email is taken',400))
            }
      }
      //Update the User
      const user = await User.findByIdAndUpdate(req.params.id,{
        fullname,
        email,
      },{
          new:true
      })

       res.json({
         status:'success',
         data : user,   
        })
  } catch (error) {
       return next(apperr(error.message))
  }
 }

 //Logout
const logoutctrl =  async(req,res)=>{
  try {
        res.json({
         status:'success',
         user: 'User logout'
        })
  } catch (error) {
       res.json(error)
  }
 }

module.exports = {
  registerctrl,
  loginctrl,
  detailsctrl,
  profilectrl,
  ppctrl,
  cpctrl,
  passwordctrl,
  uuctrl,
  logoutctrl
}