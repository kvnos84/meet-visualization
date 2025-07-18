import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App';

const feature = loadFeature('src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    given('the user hasn’t specified a number of events', () => {});

    when('the user opens the app', () => {
      render(<App />);
    });

    then('the user should see 32 events by default', async () => {
      const events = await screen.findAllByRole('listitem');
      expect(events.length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    given('the user wants to see a specific number of events', () => {
      render(<App />);
    });

    when('the user sets the number to 10', () => {
      const input = screen.getByLabelText(/number of events/i);
      fireEvent.change(input, { target: { value: 10 } });
    });

    then('the user should see 10 events displayed', async () => {
      const events = await screen.findAllByRole('listitem');
      expect(events.length).toBe(10);
    });
  });
});
