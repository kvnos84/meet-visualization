import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('renders a number textbox', () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('has default value of 32', () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(32);
  });

  test('updates value when user types', async () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input).toHaveValue(10);
  });

  // ✅ NEW TESTS BELOW

  test('calls setErrorAlertText with error on non-numeric input', () => {
    const setErrorAlertText = jest.fn();
    const setNumberOfEvents = jest.fn();

    render(
      <NumberOfEvents
        setErrorAlertText={setErrorAlertText}
        setNumberOfEvents={setNumberOfEvents}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(setErrorAlertText).toHaveBeenCalledWith('Please enter a valid number of events.');
    expect(setNumberOfEvents).not.toHaveBeenCalled();
  });

  test('calls setErrorAlertText with error on value <= 0', () => {
    const setErrorAlertText = jest.fn();
    const setNumberOfEvents = jest.fn();

    render(
      <NumberOfEvents
        setErrorAlertText={setErrorAlertText}
        setNumberOfEvents={setNumberOfEvents}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '0' } });

    expect(setErrorAlertText).toHaveBeenCalledWith('Please enter a valid number of events.');
    expect(setNumberOfEvents).not.toHaveBeenCalled();
  });

  test('clears error and updates events on valid input', () => {
    const setErrorAlertText = jest.fn();
    const setNumberOfEvents = jest.fn();

    render(
      <NumberOfEvents
        setErrorAlertText={setErrorAlertText}
        setNumberOfEvents={setNumberOfEvents}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '5' } });

    expect(setNumberOfEvents).toHaveBeenCalledWith(5);
    expect(setErrorAlertText).toHaveBeenCalledWith('');
  });
});
