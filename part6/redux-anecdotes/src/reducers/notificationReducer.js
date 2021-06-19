const initialState = {
  message: null,
};

export const setNotification = (message, delay) => {
  if (window.notificationID) {
    clearTimeout(window.notificationID);
  }

  return dispatch => {
    dispatch({
      type: 'SHOW',
      data: { message },
    });
    window.notificationID = setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, delay);
  }
}

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
