import React, { useState } from 'react';

const CitySearch = ({ onCitySelect, allLocations, setInfoAlert }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = allLocations.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);

    if (filtered.length === 0) {
      setInfoAlert && setInfoAlert('City not found.');
    } else {
      setInfoAlert && setInfoAlert('');
    }
  };

  const handleItemClicked = (city) => {
    setQuery(city);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div className="city-search">
      <div className="search-container">
        <input
          type="text"
          role="textbox"
          data-testid="city-input"
          placeholder="Search for a city"
          value={query}
          onChange={handleInputChanged}
        />
        <button onClick={() => onCitySelect(query)}>Search</button>
      </div>
      <ul className="suggestions">
        {suggestions.map((city, index) => (
          <li key={index} onClick={() => handleItemClicked(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;