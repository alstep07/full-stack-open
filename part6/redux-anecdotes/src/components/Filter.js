import React from 'react';
import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = ({setFilter}) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={({ target }) => setFilter(target.value)} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
