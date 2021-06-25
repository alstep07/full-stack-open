import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../customHooks';
import { noReset } from '../utils/helpers';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content</Form.Label>
          <Form.Control {...noReset(content)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control {...noReset(author)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>info</Form.Label>
          <Form.Control {...noReset(info)} />
        </Form.Group>
        <Button variant="primary" type="submit">create</Button>
        <Button variant="secondary" onClick={handleReset} type="reset">
          reset
        </Button>
      </Form>
    </div>
  );
};

export default CreateNew;
