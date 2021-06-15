import React from 'react';

const LoggedUser = ({ user, logout }) => {
  return (
    <>
      <span>{user.name} logged in </span>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default LoggedUser;