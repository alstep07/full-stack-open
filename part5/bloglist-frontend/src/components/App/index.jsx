import React, { useState, useEffect, useRef } from 'react';
import {
  getAllBlogs,
  addNewBlog,
  removeBlog,
  addLike,
  setToken,
} from '../../services/blogs';
import { login } from '../../services/login';
import { style } from './style';
import LoginForm from '../LoginForm';
import BlogForm from '../BlogForm';
import BlogList from '../BlogList';
import Togglable from '../Togglable';
import Header from '../Header';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogs(blogs);
    };
    if (user) {
      getBlogs();
    }
  }, [user]);

  const handleLogin = async (username, password) => {
    try {
      const user = await login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token);
    } catch (exception) {
      console.error(exception.message);
    }
  };

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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedUser');
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
    <div style={style}>
      <Header user={user} handleLogout={handleLogout} />
      {user ? (
        <>
          <Togglable ref={blogFormRef}>
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          <BlogList
            user={user}
            blogs={sortedBlogs}
            handleRemoveBlog={handleRemoveBlog}
            handleAddLike={handleAddLike}
          />
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
