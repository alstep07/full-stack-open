import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResource = async () => {
      const resource = await axios.get(baseUrl);
      setResources(resource.data);
    };
    fetchResource();
  }, []);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([response.data, ...resources]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
