import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotesToRender = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const handleClick = (anecdote) => {
    const message = `You voted '${anecdote.content}.'`;
    dispatch(addVote(anecdote));
    dispatch(setNotification(message, 3000));
  };

  return anecdotesToRender.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
