const mongoose = require("mongoose")

//Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required:true,
    },
    description:{
      type: String,
      required:true,
    },
    category:{
      type: String,
      required:true,
      enum:["react js","html","css","javascript"]
    },
    Image:{
      type:String,
      required:true, 
    },
    
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
   },

   comments:  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
   ],
},
{
  timestamps:true,
})
//Compile the schema to form a model

const Post = mongoose.model("Post",postSchema)

module.exports = Post