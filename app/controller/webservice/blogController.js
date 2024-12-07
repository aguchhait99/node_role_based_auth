const BlogModel = require('../../model/blog')

class BlogControllerEjs {
    // Create Blog
    async createBlog(req, res){
        try{
            const {heading, content} = req.body
            if(!heading || !content){
                res.redirect('/blog/add')
            }
            const blog = new BlogModel({
                heading,
                content
            })
            if(req.file){
                blog.image = req.file.path
            }
            const data = await blog.save()
            if(data){
                res.redirect('/blog')
            }
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = new BlogControllerEjs()