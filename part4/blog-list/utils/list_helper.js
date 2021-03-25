const e = require('cors')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (total, blog) => {
    return total + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const findFavouriteBlog = (blogs) => {
  let maxLikes = Math.max(...blogs.map((blog) => blog.likes))

  return blogs.length === 0 ? 'no blogs found' : blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach((blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = 1
    } else {
      authors[blog.author]++
    }
  })

  const maxBlogs = { author: '', blogs: 0 }

  for (author in authors) {
    if (authors[author] > maxBlogs.blogs) {
      maxBlogs.author = author
      maxBlogs.blogs = authors[author]
    }
  }

  return blogs.length === 0 ? 'no blogs found' : maxBlogs
}

const mostLikes = (blogs) => {
  const authors = {}
  blogs.forEach((blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = blog.likes
    } else {
      authors[blog.author]+= blog.likes
    }
  })

  const maxLikes = { author: '', likes: 0 }

  for (author in authors) {
    if (authors[author] > maxLikes.likes) {
      maxLikes.author = author
      maxLikes.likes = authors[author]
    }
  }

  return blogs.length === 0 ? 'no blogs found' : maxLikes
}

module.exports = { dummy, totalLikes, findFavouriteBlog, mostBlogs, mostLikes }
