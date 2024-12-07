const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    heading: {
        type: String, 
        require: true
    }, 
    image: {
        type: String,
        require: true
    }, 
    content: {
        type: String, 
        require: true
    }
}, {
    timestamps: true
})

const BlogModel = mongoose.model('blog', blogSchema)
module.exports = BlogModel