import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './index';

describe('BlogForm', () => {
  let component;

  const handleAddBlog = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm handleAddBlog={handleAddBlog} />);
  });

  test('On submit callback received input data', () => {
    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: 'testing form' },
    });

    fireEvent.submit(form);

    expect(handleAddBlog.mock.calls).toHaveLength(1);
    expect(handleAddBlog.mock.calls[0][0]).toBe('testing form');
  });
});
