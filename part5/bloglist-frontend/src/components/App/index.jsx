import React, { useState, useEffect } from 'react';
import { setToken } from '../../services/blogs';
import { login } from '../../services/login';
import { style } from './style';
import LoginForm from '../LoginForm';
import MainContent from '../MainContent';
import Header from '../Header';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('loggedUser');
  };

  return (
    <div style={style}>
      <Header user={user} handleLogout={handleLogout} />
      {user ? <MainContent user={user} /> : <LoginForm handleLogin={handleLogin} />}
    </div>
  );
};

export default App;
