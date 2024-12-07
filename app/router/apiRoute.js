const express = require('express')
const AuthController = require('../controller/api/authController')
const BlogController = require('../controller/api/blogApiController')
const ImageUpload = require('../helper/imageUpload')
const { Auth } = require('../middleware/auth')


const router = express.Router()


// APIs
router.post('/register/user', ImageUpload.single('image'), AuthController.userRegistration)
router.post('/login/user', AuthController.userLogin)
router.get('/blog/list', BlogController.blogList)
router.get('/blog/details/:id', Auth, BlogController.blogSingle)


module.exports = router