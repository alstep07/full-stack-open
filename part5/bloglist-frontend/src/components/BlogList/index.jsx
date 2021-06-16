import React from 'react';
import Blog from '../Blog';
import { style } from './style';

const BlogList = ({ blogs, handleAddLike, handleRemoveBlog, user }) => {
  return (
    <ul style={style}>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          handleRemoveBlog={handleRemoveBlog}
          handleAddLike={handleAddLike}
        />
      ))}
    </ul>
  );
};

export default BlogList;
