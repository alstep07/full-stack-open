import React, { useState, useEffect } from 'react';
import { getAllBlogs, addNewBlog, setToken } from './services/blogs';
import { login } from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoggedUser from './components/LoggedUser';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

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
      const newBlog = await addNewBlog({
        text,
        link,
      });

      setBlogs([...blogs, newBlog]);
    } catch (exception) {
      console.error(exception.message);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <h2>blogs</h2>
      {user ? (
        <>
          <LoggedUser user={user} logout={logout} />
          <BlogForm handleAddBlog={handleAddBlog} />
          <BlogList blogs={blogs} />
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
