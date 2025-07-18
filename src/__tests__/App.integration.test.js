import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../components/App'; // update path if needed

test('renders correct number of events when user changes number input', async () => {
  render(<App />);

  // Wait until events are loaded (assume .event items are present)
  const initialEvents = await screen.findAllByRole('heading', { level: 2 }); // adjust selector
  expect(initialEvents.length).toBeGreaterThan(0);

  const numberInput = screen.getByRole('textbox', { name: /number of events/i });
  expect(numberInput).toHaveValue(32); // default

  // Change number to 10
  await userEvent.clear(numberInput);
  await userEvent.type(numberInput, '10');

  // Wait for the list to update
  await waitFor(async () => {
    const updatedEvents = await screen.findAllByRole('heading', { level: 2 });
    expect(updatedEvents).toHaveLength(10);
  });
});