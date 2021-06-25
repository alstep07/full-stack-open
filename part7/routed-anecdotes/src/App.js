import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { initialAnecdotes } from './data/anecdotes';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import CreateNew from './components/CreateNew';
import About from './components/About';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);
  const [notification, setNotification] = useState(null);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    const message = `new anecdode ${anecdote.content} was created`;
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 10000)
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Notification message={notification} />}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
