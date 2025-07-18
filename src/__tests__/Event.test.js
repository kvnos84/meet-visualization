import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('Event Component', () => {
  const event = mockData[0];
  const formattedTime = new Date(event.start.dateTime).toLocaleString();

  test('renders event title', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test('renders event location', () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    render(<Event event={event} />);
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });

  test('renders "Show Details" button', () => {
    render(<Event event={event} />);
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });

  test('details are hidden by default', () => {
    render(<Event event={event} />);
    expect(screen.queryByText(event.description)).not.toBeInTheDocument();
  });

  test('shows details after clicking "Show Details"', () => {
    render(<Event event={event} />);
    fireEvent.click(screen.getByText('Show Details'));
    expect(screen.getByText(event.description)).toBeInTheDocument();
  });

  test('hides details after clicking "Hide Details"', () => {
    render(<Event event={event} />);
    fireEvent.click(screen.getByText('Show Details'));
    fireEvent.click(screen.getByText('Hide Details'));
    expect(screen.queryByText(event.description)).not.toBeInTheDocument();
  });

  test('toggle button text changes appropriately', () => {
    render(<Event event={event} />);

    const showButton = screen.getByText('Show Details');
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);
    expect(screen.queryByText('Show Details')).not.toBeInTheDocument();
    expect(screen.getByText('Hide Details')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Hide Details'));
    expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });
});
