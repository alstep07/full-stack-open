import React from 'react'
const Blog = ({blog}) => (
  <li>
    <h3>{blog.text}</h3>
    <p>- <em>{blog.author.name}</em></p>
  </li>  
)

export default Blog