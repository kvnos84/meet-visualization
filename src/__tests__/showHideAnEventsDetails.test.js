// __tests__/showHideAnEventsDetails.test.js

import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import '@testing-library/jest-dom'; // <-- ✅ ADD THIS LINE
import { render, screen, fireEvent } from '@testing-library/react';
import EventList from '../components/EventList';
import mockData from '../mock-data';

const feature = loadFeature('src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let container;

  test('Event details are collapsed by default', ({ given, then }) => {
    given('the user sees a list of events', () => {
      const rendered = render(<EventList events={mockData} />);
      container = rendered.container;
    });

    then('each event element should not show its details by default', () => {
      const detailElements = container.querySelectorAll('.event-details');
      expect(detailElements.length).toBe(0); // No details should be shown by default
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user sees a list of events', () => {
      const rendered = render(<EventList events={mockData} />);
      container = rendered.container;
    });

    when('the user clicks on “Show Details”', () => {
      const showDetailsButtons = screen.getAllByText('Show Details');
      fireEvent.click(showDetailsButtons[0]);
    });

    then('the event element should expand to show details', () => {
      const detailElement = container.querySelector('.event-details');
      expect(detailElement).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the event details are visible', () => {
      const rendered = render(<EventList events={mockData} />);
      container = rendered.container;

      const showDetailsButtons = screen.getAllByText('Show Details');
      fireEvent.click(showDetailsButtons[0]);
    });

    when('the user clicks on “Hide Details”', () => {
      const hideDetailsButton = screen.getByText('Hide Details');
      fireEvent.click(hideDetailsButton);
    });

    then('the event details should be hidden', () => {
      const detailElement = container.querySelector('.event-details');
      expect(detailElement).not.toBeInTheDocument();
    });
  });
});
