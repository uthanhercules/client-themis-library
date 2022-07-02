import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './features';

test('renders title on screen', () => {
  render(<Component />);
  const linkElement = screen.getByRole('heading');
  expect(linkElement).toBeTruthy();
});
