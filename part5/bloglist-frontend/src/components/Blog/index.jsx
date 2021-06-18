import React, { useState } from 'react';
import { style } from './style';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleAddLike, handleRemoveBlog, user }) => {
  const [details, setDetails] = useState(false);

  return (
    <li className='blog' style={style.container}>
      <div style={style.blog}>
        <h3 style={style.title}>{blog.text}</h3>
        <p style={style.author}>- { blog.author.name}</p>
        {details && (
          <div style={style.details}>
            <a style={style.link} href={blog.link} target="blank">
              {blog.link}
            </a>
          </div>
        )}
      </div>
      <div style={style.buttons}>
        <button
          style={style.detailsButton}
          onClick={() => setDetails(!details)}
        >
          details
        </button>
        <button className='like' style={style.likeButton} onClick={() => handleAddLike(blog.id)}>
          {blog.likes} <span style={style.likeHeart}>&#10084;</span>
        </button>
        {user.name === blog.author.name && (
          <button
            className='remove'
            style={style.removeButton}
            onClick={() => handleRemoveBlog(blog.id)}
          >
            remove
          </button>
        )}
      </div>
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
};

export default Blog;
