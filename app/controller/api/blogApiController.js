const BlogModel = require('../../model/blog')

class BlogController {
    // Blog List
    async blogList(req, res){
        try{
            const data = await BlogModel.find()
            res.status(200).json({
                message: "Data fetched",
                status: 200, 
                count: data.length,
                blog: data
            })
        }catch(err){
            console.log(err)
        }
    }

    // Single Blog
    async blogSingle(req, res){
        try{
            const id = req.params.id
            if(!id){
                res.status(400).json({
                    message: "Id is required"
                })
            }
            const data = await BlogModel.findById(id)
            res.status(200).json({
                message: "Data fetched",
                status: 200,
                data: data
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new BlogController()