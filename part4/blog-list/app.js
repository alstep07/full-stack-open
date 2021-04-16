const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const {MONGODB_URI} = require('./utils/config')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('connected to MongoDB')
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
