const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "First blog",
    author: "Stepanenko O.",
    url: "http://alstep07.github.io/friends-app/",
    likes: 11,
    },
    {
    title: "Second blog",
    author: "Stepanenko O.",
    url: "http://alstep07.github.io/friends-app/",
    likes: 31,
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will remove soon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }
