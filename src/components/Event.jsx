// src/components/Event.jsx
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p className="event-location">{event.location}</p>
      <p><strong>Start:</strong> {new Date(event.start.dateTime).toLocaleString()}</p>

      <button onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
          {event.htmlLink && (
            <a href={event.htmlLink} target="_blank" rel="noreferrer">
              View on Google Calendar
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Event;
