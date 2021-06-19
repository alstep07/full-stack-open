import React from 'react';
import { setFilter } from '../redux/reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = ({target}) => {
    dispatch(setFilter(target.value))
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;