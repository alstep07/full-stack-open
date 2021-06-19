import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../redux/reducers/anecdoteReducer';
import { showMessage, hideMessage } from '../redux/reducers/notificationReducer';

const AnecdoteList = () => {
  const sortedAnecdotes = useSelector(({anecdotes}) => anecdotes.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  const handleClick = ({id, content}) => {
    const message = `You voted '${content}.'`;
    dispatch(addVote(id));
    dispatch(showMessage(message))
    setTimeout(() => {
      dispatch(hideMessage());
    }, 3000)
  }

  return (
    sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleClick(anecdote)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList