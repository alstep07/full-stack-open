import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAllBlogs = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

export const addNewBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const addLike = async (updatedBlog) => {
  const url = baseUrl + '/' + updatedBlog.id;

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(url, updatedBlog, config);
  return response.data;
};

export const removeBlog = async (id) => {
  const url = baseUrl + '/' + id;

  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(url, config);
};
