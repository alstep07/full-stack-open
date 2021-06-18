const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Author = require('../models/author')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const author = await Author.findOne({ username: body.username })
  const passwordCorrect =
    author === null ? false : await bcrypt.compare(body.password, author.passwordHash)

  if (!(author && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const authorForToken = {
    username: author.username,
    id: author._id
  }

  const token = jwt.sign(
    authorForToken,
    process.env.SECRET
  )

  response.status(200).send({ token, username: author.username, name: author.name })
})

module.exports = loginRouter
