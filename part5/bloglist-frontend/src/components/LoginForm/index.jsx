import React, { useState } from 'react';
import { style } from './style';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form style={style.form} onSubmit={handleSubmit}>
      <label>
        <input
          style={style.input}
          type="text"
          value={username}
          name="Username"
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        <input
          style={style.input}
          type="password"
          value={password}
          name="Password"
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button style={style.submit} type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
