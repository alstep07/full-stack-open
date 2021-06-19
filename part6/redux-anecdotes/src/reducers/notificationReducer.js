const initialState = {
  message: null,
};

export const showMessage = (message) => {
  return {
    type: 'SHOW',
    data: { message },
  };
};

export const hideMessage = () => {
  return {
    type: 'HIDE',
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data;
    case 'HIDE':
      return { message: null };
    default:
      return state;
  }
};

export default notificationReducer;
