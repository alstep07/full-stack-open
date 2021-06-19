const initialState = '';

export const setFilter = (value) => {
  return {
    type: 'SET',
    data: value,
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET': 
      return action.data;
    default:
      return state;
  }
}

export default filterReducer;
