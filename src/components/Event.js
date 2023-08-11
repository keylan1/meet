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
        <Card key={event.id} id="event-card">
          <CardContent>
            <div className="event">
              <h2 className="event-title">{event.summary}</h2>
              <p className="time">{event.created}</p>
              <p className="location">{event.location}</p>
              {showDetails && (
                <div className="description">{event.description}</div>
              )}
              <CardActions>
                <Button
                  variant="contained"
                  onClick={toggleDetails}
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
