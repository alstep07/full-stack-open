import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const sortedAnecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch();

  return (
    sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList