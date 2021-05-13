const bcrypt = require('bcrypt')
const authorsRouter = require('express').Router()
const Author = require('../models/author')

authorsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.password && body.password.length >= 6)) {
    return response.status(400).json({error: "password length should be at least 6 characters"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const author = new Author({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedAuthor = await author.save()

  response.json(savedAuthor)
})

authorsRouter.get('/', async (request, response) => {
  const authors = await Author.find({}).populate('blogs', { title: 1, url: 1 })
  response.json(authors)
})

module.exports = authorsRouter
