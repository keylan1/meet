import { useState } from 'react';
import { getEvents } from '../api';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li key={event.id}>
      <div className="event">
        <h2 className="event-title">{event.summary}</h2>
        <p className="time">{event.created}</p>
        <p className="location">{event.location}</p>
        {showDetails && <div className="description">{event.description}</div>}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </div>
    </li>
  );
};

export default Event;
