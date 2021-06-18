import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { style } from './style';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return visible ? (
    props.children
  ) : (
    <button id='add-blog' style={style.button} onClick={() => setVisible(true)}>Add blog &#43;</button>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
