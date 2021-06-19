import {
  getAll,
  createNewAnecdote,
  updateAnecdote,
} from '../services/anecdotes';

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const votedAnecdote = await updateAnecdote(anecdote.id, updatedAnecdote);
    dispatch({
      type: 'ADD_VOTE',
      data: votedAnecdote,
    });
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await createNewAnecdote(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'ADD_VOTE':
      const votedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
      );
    case 'ADD_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
