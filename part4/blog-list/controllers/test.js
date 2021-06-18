const router = require('express').Router();
const Blog = require('../models/blog');
const Author = require('../models/author');

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await Author.deleteMany({});

  response.status(204).end();
});

module.exports = router;
