import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        text
        <input
          type="text"
          value={text}
          name="text"
          onChange={({ target }) => setText(target.value)}
        />
      </div>
      <div>
        link
        <input
          type="text"
          value={link}
          name="link"
          onChange={({ target }) => setLink(target.value)}
        />
      </div>
      <button type="submit">Add new blog</button>
    </form>
  );
};

export default BlogForm;
