import React, { useState } from 'react';
import { style } from './style';

const BlogForm = ({ handleAddBlog }) => {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddBlog(text, link);
    setText('');
    setLink('');
  };

  return (
    <form style={style.form} onSubmit={handleSubmit}>
      <label>
        <input
          style={style.input}
          type="text"
          value={text}
          name="text"
          placeholder="blog text"
          onChange={({ target }) => setText(target.value)}
        />
      </label>
      <label>
        <input
          style={style.input}
          type="text"
          value={link}
          name="link"
          placeholder="url"
          onChange={({ target }) => setLink(target.value)}
        />
      </label>
      <div style={style.buttons}>
        <button style={style.submit} type="submit">
          Post
        </button>
        <button style={style.cancel}>Cancel</button>
      </div>
    </form>
  );
};

export default BlogForm;
