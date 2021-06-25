import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../customHooks';
import { noReset } from '../utils/helpers';

const CreateNew = (props) => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...noReset(content)} />
        </div>
        <div>
          author
          <input {...noReset(author)} />
        </div>
        <div>
          url for more info
          <input {...noReset(info)} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="reset">
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
