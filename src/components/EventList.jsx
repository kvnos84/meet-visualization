// src/components/EventList.jsx
import React from 'react';
import Event from './Event';

const EventList = ({ events }) => {
  return (
    <ul className="event-list">
      {events.map((event, index) => (
        <li key={index}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
