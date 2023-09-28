const express = require('express')

const postRoute = express.Router()
const {postctrl, fetchpostctrl,pdctrl, deletectrl,updatectrl} = require("../../controllers/posts/post1")
const protected = require('../../middlewares/protected')
const multer = require('multer')
const storage = require('../../config/cloudinary')


//Instance  of multer
const upload = multer({
    storage,
})

//Post/api/v1/posts
postRoute.post('/',protected,upload.single('file'),postctrl)

//Get/api/v1/posts
postRoute.get('/',fetchpostctrl)

//get/api/v1/posts/:id
postRoute.get('/:id',pdctrl)

//Delete/api/v1/posts/:id
postRoute.delete('/:id',protected, deletectrl)

//Put/api/v1/posts/:id
postRoute.put('/:id',protected,upload.single('file'),updatectrl)

module.exports = postRoute