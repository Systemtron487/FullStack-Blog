const mongoose = require("mongoose")

//Schema
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required:true,
    },
    email:{
      type: String,
      required:true,
    },
    password:{
      type: String,
      required:true,
    },
    profileImage:{
      type:String,
    },
    coverImage:{
      type: String,
    },
  posts:[{type: mongoose.Schema.Types.ObjectId, ref:'Post'}],
  comment:[{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
},
{
  timestamps:true,
})
//Compile the schema to form a model

const user = mongoose.model("User", userSchema)

module.exports = user 