// src/__tests__/CitySearch.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySearch from '../components/CitySearch';

describe('CitySearch component', () => {
  test('calls setInfoAlert with message when invalid city is typed', () => {
    const suggestions = ['Berlin', 'London', 'New York'];
    const setInfoAlert = jest.fn();

    render(
      <CitySearch
        allLocations={suggestions}
        setInfoAlert={setInfoAlert}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'NotACity' } });

    // User entered a city not in suggestions, so alert should be triggered
    expect(setInfoAlert).toHaveBeenCalledWith('City not found.');
  });

  test('clears InfoAlert when valid city is typed', () => {
    const suggestions = ['Berlin', 'London', 'New York'];
    const setInfoAlert = jest.fn();

    render(
      <CitySearch
        allLocations={suggestions}
        setInfoAlert={setInfoAlert}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Berlin' } });

    // User entered a valid city, alert should be cleared
    expect(setInfoAlert).toHaveBeenCalledWith('');
  });
});
