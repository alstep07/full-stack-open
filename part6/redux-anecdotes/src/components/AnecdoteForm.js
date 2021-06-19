import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../redux/reducers/anecdoteReducer';
import { showMessage, hideMessage } from '../redux/reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const message = `New anecdote '${content}' created.`
    e.target.anecdote.value = '';
    dispatch(addAnecdote(content));
    dispatch(showMessage(message));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 3000)
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
