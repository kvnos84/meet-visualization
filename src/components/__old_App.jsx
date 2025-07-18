import React, { useState, useEffect } from 'react';
import './App.css';
import NumberOfEvents from './NumberOfEvents';
import EventList from './EventList';
import CitySearch from './CitySearch';
import mockData from '../mock-data';
import { InfoAlert, ErrorAlert, WarningAlert } from '../Alert';

function App() {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('all');

  // ✅ Alert text states
  const [infoAlertText, setInfoAlertText] = useState('');
  const [errorAlertText, setErrorAlertText] = useState('');
  const [warningAlertText, setWarningAlertText] = useState(''); // ✅ NEW

  useEffect(() => {
    const fetchEvents = async () => {
      let data = mockData;
      if (currentCity !== 'all') {
        data = data.filter(event => event.location === currentCity);
      }
      setEvents(data.slice(0, numberOfEvents));
    };

    // ✅ Check online status and show warning alert if offline
    if (navigator.onLine) {
      setWarningAlertText('');
    } else {
      setWarningAlertText('You are offline: displaying cached events.');
    }

    fetchEvents();
  }, [currentCity, numberOfEvents]);

  const allCities = [...new Set(mockData.map(event => event.location))];

  return (
    <div>
      {/* ✅ Alert container */}
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
    </div>
  );
}

export default App;