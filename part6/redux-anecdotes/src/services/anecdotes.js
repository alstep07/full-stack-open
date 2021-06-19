import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const updateAnecdote = async (id, updatedAnecdote) => {
  const url = `${baseUrl}/${id}`;

  const response = await axios.put(url, updatedAnecdote);
  return await response.data;
}

export const createNewAnecdote = async (content) => {
  const anecdote = {
    content,
    id: getId(),
    votes: 0
  };

  const response = await axios.post(baseUrl, anecdote);
  return response.data;
}