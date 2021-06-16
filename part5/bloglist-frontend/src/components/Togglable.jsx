import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return visible ? (
    <div>
      {props.children}
      <button onClick={() => setVisible(false)}>Cancel</button>
    </div>
  ) : (
    <button onClick={() => setVisible(true)}>Add blog</button>
  );
}); 

export default Togglable;
