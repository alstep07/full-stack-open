const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  text: String,
  link: String,
  likes: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
