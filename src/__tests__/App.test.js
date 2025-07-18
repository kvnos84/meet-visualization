import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom';

test('renders NumberOfEvents component', () => {
  const { container } = render(<App />);
  const numberInput = container.querySelector('#number-of-events');
  expect(numberInput).toBeInTheDocument();
});
