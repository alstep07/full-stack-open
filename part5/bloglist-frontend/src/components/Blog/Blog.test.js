import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './index';

describe('Blog', () => {
  let component;

  const blog = {
    text: 'some text',
    link: 'test.com',
    likes: 10,
    author: {
      name: 'Oleksandr',
    },
  };

  const user = {
    name: 'Oleksandr',
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleAddLike={mockHandler}
        handleRemoveBlog={mockHandler}
      />
    );
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent('some text');
  });

  test('At start url does not displayed', () => {
    const url = component.container.querySelector('a');

    expect(url).toBe(null);
  });

  test('After click on details url is displayed', () => {
    const button = component.getByText('details');

    fireEvent.click(button);

    expect(component.container).toHaveTextContent('test.com');
  });

  test('like button cklicked twice', () => {
    const button = component.getByText('❤');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

