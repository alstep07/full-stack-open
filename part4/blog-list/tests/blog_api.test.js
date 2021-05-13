const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const Author = require('../models/author')
const bcrypt = require('bcrypt');

describe('Testing blogs', () => {
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

  test('unique identifier named "id"', async () => {
    const response = await api.get('/api/blogs/').expect(200)
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('a blog can be posted', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Stepanenko',
      url: '#',
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAtEnd.map(blog => blog.title)

    expect(blogTitles).toContain('test blog')
  })

  test('default likes = 0', async () => {
    const nonLikedBlog = {
      title: 'no likes',
      url: '#'
    }

    await api
      .post('/api/blogs')
      .send(nonLikedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogLikes = blogsAtEnd.map(blog => blog.likes)

    expect(blogLikes).toContain(0)
  })

  test('if url or title are missed, response status is 400', async () => {
    const noTitledBlog = {}

    await api.post('/api/blogs').send(noTitledBlog).expect(400)
  })
})

describe('Testing authors', () => {
  beforeEach(async () => {
    await Author.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const authors = new Author({ username: 'root', passwordHash })

    await authors.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const authorsAtStart = await helper.authorsInDb()
    const newAuthor = {
      username: 'alstep07',
      name: 'Oleksandr Stepanenko',
      password: 'nodejs'
    }

    await api
      .post('/api/authors')
      .send(newAuthor)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const authorsAtEnd = await helper.authorsInDb()
    expect(authorsAtEnd).toHaveLength(authorsAtStart.length + 1)

    const usernames = authorsAtEnd.map(a => a.username)
    expect(usernames).toContain(newAuthor.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const authorsAtStart = await helper.authorsInDb()

    const newAuthor = {
      username: 'root',
      name: 'Oleksandr Stepanenko',
      password: 'nodejs'
    }

    const result = await api
      .post('/api/authors')
      .send(newAuthor)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const authorsAtEnd = await helper.authorsInDb()
    expect(authorsAtEnd).toHaveLength(authorsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
