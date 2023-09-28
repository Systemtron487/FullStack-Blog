const express = require('express')

const userRoute = express.Router()
const { registerctrl,loginctrl, detailsctrl,profilectrl,ppctrl,passwordctrl,cpctrl,uuctrl,logoutctrl} = require('../../controllers/users/users1')
const protected = require('../../middlewares/protected')
const storage = require('../../config/cloudinary')
const multer = require('multer')

//Instance Of multer
const upload = multer({storage})

//Rendering Form
//Login Form
userRoute.get('/login',(req,res)=>{
    res.render('users/login',{error: ""})
})
//Register Form
userRoute.get('/register',(req,res)=>{
    res.render('users/register',{
        error: ""
    })
})

//Profile template
userRoute.get('/profile-page',(req,res)=>{
    res.render('users/profile')
})

//Upload Profile Photo
userRoute.get('/upload-profile-photo-form',(req,res)=>{
    res.render('users/uploadProfilePhoto')
})

//Upload Cover Photo
userRoute.get('/upload-cover-photo-form',(req,res)=>{
    res.render('users/uploadCoverPhoto')
})

//Update user   
userRoute.get('/update-user',(req,res)=>{
    res.render('users/updateUser')
})



//Post/api/v1/users/register
userRoute.post('/register',registerctrl)

//Post/api/v1/users/login
userRoute.post('/login',loginctrl)

//Get/api/v1/users/profile
userRoute.get('/profile',protected,profilectrl)

//Put/api/v1/users/profile-upload/:id
userRoute.put('/profile-upload/',protected,upload.single('profile'),ppctrl)

//Put/api/v1/users/cover-profile-upload/:id
userRoute.put('/cover-profile-upload/',protected,upload.single('profile'),cpctrl)

//Put/api/v1/users/update-password/:id
userRoute.put('/update-password/:id',passwordctrl)

//Put/api/v1/users/user-update/:id
userRoute.put('/user-update/:id',uuctrl)

//Get/api/v1/users/:id
userRoute.get('/:id',detailsctrl)

//Get/api/v1/users/logout
userRoute.get('/logout',logoutctrl)

module.exports = userRoute
