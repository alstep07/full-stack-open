const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const blogsPromises = blogObjects.map(blog => blog.save())
  await Promise.all(blogsPromises)
})

test('there are two blogs in DB', async () => {
  const response = await api.get('/api/blogs/').expect(200)
  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})
