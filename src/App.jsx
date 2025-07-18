import React, { useState, useEffect } from 'react';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { InfoAlert, ErrorAlert, WarningAlert } from './Alert';
import mockData from './mock-data';

function App() {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');
  const [cityEventData, setCityEventData] = useState([]);
  const [genreData, setGenreData] = useState([]);

  const [infoAlertText, setInfoAlertText] = useState('');
  const [errorAlertText, setErrorAlertText] = useState('');
  const [warningAlertText, setWarningAlertText] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      let data = mockData;
      if (currentCity !== 'all') {
        data = data.filter(event => event.location === currentCity);
      }
      setEvents(data.slice(0, numberOfEvents));
    };

    if (navigator.onLine) {
      setWarningAlertText('');
    } else {
      setWarningAlertText('You are offline: displaying cached events.');
    }

    fetchEvents();
  }, [currentCity, numberOfEvents]);

  useEffect(() => {
    setCityEventData(getCityEventData(events));
    setGenreData(getGenreData(events));
  }, [events]);

  const getCityEventData = (events) => {
    const counts = {};
    events.forEach(event => {
      const city = event.location;
      counts[city] = (counts[city] || 0) + 1;
    });
    return Object.entries(counts).map(([city, count]) => ({
      city,
      numberOfEvents: count
    }));
  };

  const getGenreData = (events) => {
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const data = genres.map((genre) => {
    const filteredEvents = events.filter(
      (event) => event.summary && event.summary.includes(genre)
    );
    return { name: genre, value: filteredEvents.length };
  });

  return data.filter((entry) => entry.value > 0); // ✅ inside the function
};

  const allCities = [...new Set(mockData.map(event => event.location))];

  return (
    <div className="App">
      <h1>Meet App</h1>

      <div className="alerts-container">
        <InfoAlert text={infoAlertText} />
        {errorAlertText && <ErrorAlert text={errorAlertText} />}
        {warningAlertText && <WarningAlert text={warningAlertText} />}
      </div>

      <CitySearch
        onCitySelect={setCurrentCity}
        allCities={allCities}
        setInfoAlert={setInfoAlertText}
      />

      <NumberOfEvents
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlertText={setErrorAlertText}
      />

      <EventList events={events} />

      <div className="charts-container">
        <CityEventsChart data={cityEventData} />
        <EventGenresChart data={getGenreData(events)} />
      </div>
    </div>
  );
}

export default App;