import React, { useState, useEffect, useRef } from 'react';
import {
  getAllBlogs,
  addNewBlog,
  removeBlog,
  addLike,
} from '../../services/blogs';
import BlogForm from '../BlogForm';
import BlogList from '../BlogList';
import Togglable from '../Togglable';
import { style } from './style';

const MainContent = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogs(blogs);
    };
    user && getBlogs();
  }, []);

  const blogFormRef = useRef();

  const handleAddBlog = async (text, link) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await addNewBlog({
        text,
        link,
      });
      newBlog.author = user;
      setBlogs([...blogs, newBlog]);
    } catch (exception) {
      console.error(exception.message);
    }
  };

  const handleRemoveBlog = async (id) => {
    if (window.confirm('Delete blog?')) {
      try {
        await removeBlog(id);
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
      } catch (exception) {
        console.error(exception.message);
      }
    }
  };

  const handleAddLike = async (id) => {
    try {
      const blog = blogs.find((blog) => blog.id === id);
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        author: blog.author.id,
      };
      const updatedBlog = await addLike(blogToUpdate);
      const otherBlogs = blogs.filter((blog) => blog.id !== id);
      updatedBlog.author = blog.author;
      setBlogs([...otherBlogs, updatedBlog]);
    } catch (exception) {
      console.error(exception.message);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <main style={style.container}>
      <Togglable ref={blogFormRef}>
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      <BlogList
        user={user}
        blogs={sortedBlogs}
        handleRemoveBlog={handleRemoveBlog}
        handleAddLike={handleAddLike}
      />
    </main>
  );
};

export default MainContent;
