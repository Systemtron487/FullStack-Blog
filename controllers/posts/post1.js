const Post = require("../../models/posts/post")
const User = require("../../models/users/user")
const { post } = require("../../routes/users/users")
const apperr = require("../../utils/apperr")




//Create Post
const postctrl = async(req,res,next)=>{
  console.log(req.body);
  console.log(req.file);
  const {title,description,category,user,Image} = req.body
  try {
         if(!title || !description || !category || !req.file){
          return next(apperr('All fields are required'))
         }
    //Find a user
    const userID = req.session.userAuth
    const userFound = await User.findById(userID)
    //Create A post
    const postCreated  = await Post.create({
      title,
      description,
      category,
      user:userFound._id,
      Image:req.file.path,
    })
   //Push the post created into users array  of users posts
   userFound.posts.push(postCreated._id)
   //Re save
   await userFound.save()
   
        res.json({
         status:'success',
         data: postCreated,
        })
  } catch (error) {
      return next(apperr(error.message))
  }
}

//Post lists
const fetchpostctrl = async(req,res,next)=>{
  try {
    const post = await Post.find().populate('comments')
        res.json({
         status:'success',
         data: post,
        })
  } catch (error) {
      return next(apperr(error.message))
  }
}

//Post Details
const pdctrl = async(req,res,next)=>{
  try {
    //Get the id from params
    const id = req.params.id
    //Find the post
    const post = await Post.findById(id).populate("comments")
        res.json({
         status:'success',
         data: post,
        })
  } catch (error) {
      return next(apperr(error.message))
  }
}

//Delete Post
const deletectrl = async(req,res,next)=>{
  try {
    //Find the Post
    const post = await Post.findById(req.params.id)
    //Check IF the post belongs to the user
    if(post.user !== req.session.userAuth){
      return next(apperr('You are not allowed to delete this post ',403))
    }
    //Delete Post
    const postDeleted = await Post.findByIdAndDelete(req.params.id)
        res.json({
         status:'success',
         data: 'Post Deleted Successfully'
        })
  } catch (error) {
      return next(apperr(error.message))
  }
}

//Update Post
const updatectrl = async(req,res,next)=>{  
  const {title,description,category} = req.body  
 
  try {
     //Find the Post
     const post = await Post.findById(req.params.id)
     //Check IF the post belongs to the user
     if(post.user !== req.session.userAuth){
       return next(apperr('You are not allowed to update this post ',403))
     }
     //Update Post
     const postUpdated = await Post.findByIdAndUpdate(req.params.id,{
      title,description,category ,
      Image : req.file.path
     },
     {
      new: true
     })
        res.json({
         status:'success',
         data: postUpdated,
        })
  } catch (error) {
       res.json(error)
  }
}

module.exports = {
  postctrl,
  fetchpostctrl,
  pdctrl,
  deletectrl,
  updatectrl,
}