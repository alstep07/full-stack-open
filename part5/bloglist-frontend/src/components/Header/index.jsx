import React from 'react';
import LoggedUser from '../LoggedUser';
import { style } from './style';

const Header = ({ user, handleLogout }) => {
  return (
    <header style={style.header}>
      <h1>Blogs</h1>
      <nav>
        {user && <LoggedUser user={user} handleLogout={handleLogout} />}
      </nav>
    </header>
  );
};

export default Header;
