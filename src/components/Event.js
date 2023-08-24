import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { CardActions, CardContent, Container } from '@mui/material';

const Event = ({ event, theme }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Container>
      <li key={event.id}>
        <Card
          key={event.id}
          id="event-card"
          className={showDetails ? 'expanded' : ''}
          raised="true">
          <CardContent>
            <div className="event">
              <h3 className="event-title">{event.summary}</h3>
              <p className="time">
                {new Date(event.created).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
              <p className="location">{event.location}</p>
              {showDetails && (
                <div className="description">{event.description}</div>
              )}
              <CardActions className="button-container">
                <Button
                  variant="contained"
                  onClick={toggleDetails}
                  className="details-btn"
                  sx={{ bgcolor: 'secondary.main' }}>
                  {showDetails ? 'Hide details' : 'Show details'}
                </Button>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      </li>
    </Container>
  );
};

export default Event;
