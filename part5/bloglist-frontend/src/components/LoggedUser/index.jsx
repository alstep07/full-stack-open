import React from 'react';
import { style } from './style';

const LoggedUser = ({ user, handleLogout }) => {
  return (
    <div style={style.container}>
      <span style={style.user}>{user.name}</span>
      <button style={style.logoutButton} onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LoggedUser;