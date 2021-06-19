import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({addAnecdote, setNotification}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const message = `New anecdote '${content}' created.`
    e.target.anecdote.value = '';
    addAnecdote(content);
    setNotification(message, 3000);
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

export default connect(null, {addAnecdote, setNotification})(AnecdoteForm);
