import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h3>{anecdote.content}</h3>
      <p>has {anecdote.votes} votes</p>
      <a href={anecdote.info}>for more info see {anecdote.info}</a>
    </>
  );
};

export default Anecdote;