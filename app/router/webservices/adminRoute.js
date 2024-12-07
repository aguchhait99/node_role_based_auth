const express = require('express')
const AdminAuthController = require('../../controller/webservice/webAuthController')
const BlogControllerEjs = require('../../controller/webservice/blogController')
const ImageUpload = require('../../helper/imageUpload')
const { AuthWeb } = require('../../middleware/auth')

const router = express.Router()

// Pages 
router.get('/signin', AdminAuthController.loginPage)
router.get('/blog', AuthWeb, AdminAuthController.blogpage)
router.get('/blog/add', AuthWeb, AdminAuthController.addBlog)
router.get('/', AuthWeb, AdminAuthController.home)

// Ejs 
router.post('/signin-user', AdminAuthController.adminLogin)
router.post('/blog/create', ImageUpload.single('image'), BlogControllerEjs.createBlog)
router.get('/logout', AdminAuthController.logout)


module.exports = router