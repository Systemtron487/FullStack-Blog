const Comment = require("../../models/Comments/comment")
const Post = require("../../models/posts/post")
const User = require("../../models/users/user")


//Create Comment
const createctrl = async(req,res)=>{
  const {message} = req.body
  try {
    //Find the post 
    const post = await Post.findById(req.params.id) 
    //Create the comment 
    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
    })
    //Push the comment to post
    post.comments.push(comment._id)
    //Find the user
    const user = await User.findById(req.session.userAuth)
    //Push comment into user
    user.comments.push(comment._id)
    //Disable validation
    //save
    await post.save({validateBeforeSave : false})
    await user.save({validateBeforeSave : false})

        res.json({
         status:'success',
         data: comment,
        })
  } catch (error) {
       res.json(error)
  }
}

//Comment Details
const detailctrl= async(req,res)=>{
  try {
        res.json({
         status:'success',
         user: 'Comment details'
        })
  } catch (error) {
       res.json(error)
  }
}

//Delete Comment
const deletectrl = async(req,res)=>{
  try {
        res.json({
         status:'success',
         user: 'Comment Deleted'
        })
  } catch (error) {
       res.json(error)
  }
}

//Update Comment
const updatectrl = async(req,res)=>{
  try {
        res.json({
         status:'success',
         user: 'Comments Updated'
        })
  } catch (error) {
       res.json(error)
  }
}

module.exports = {
  createctrl,
  detailctrl,
  deletectrl,
  updatectrl,
}