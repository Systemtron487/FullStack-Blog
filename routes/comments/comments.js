const express = require('express')

const commentRoute = express.Router()
const {createctrl, detailctrl, deletectrl, updatectrl} = require("../../controllers/comment/comment1")
const protected = require('../../middlewares/protected')

//Post/api/v1/comments
commentRoute.post('/:id',protected,createctrl)

//get/api/v1/comments/:id
commentRoute.get('/:id',detailctrl)

//Delete/api/v1/comments/:id
commentRoute.delete('/:id', deletectrl)

//Put/api/v1/comments/:id
commentRoute.put('/:id',updatectrl)

module.exports = commentRoute