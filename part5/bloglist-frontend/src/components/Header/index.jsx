import React from 'react';
import LoggedUser from '../LoggedUser';
import { style } from './style';

const Header = ({ user, handleLogout }) => {
  return (
    <header style={style.header}>
      <div style={style.wrapper}>
        <h1>Blogs</h1>
        <nav>
          {user && <LoggedUser user={user} handleLogout={handleLogout} />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
