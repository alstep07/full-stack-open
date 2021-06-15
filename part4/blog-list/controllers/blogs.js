const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body, author } = request

  if (!body.text || !body.link) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      text: body.text,
      author: author._id,
      link: body.link,
      likes: body.likes || 0
    })

    const savedBlog = await blog.save()

    author.blogs = [...author.blogs, savedBlog._id]
    await author.save()

    response.json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { author } = request
  const blogToBeDeleted = await Blog.findById(request.params.id)

  if (blogToBeDeleted.author.toString() !== author.id.toString()) {
    return response.status(401).json({ error: 'you don\'t have permission to delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
