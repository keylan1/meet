import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useState } from 'react';
import { CardActions, CardContent, Container, Typography } from '@mui/material';

const Event = ({ event, theme }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formattedDate = new Date(event.created).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Container>
      <li key={event.id}>
        <Card
          key={event.id}
          id="event-card"
          className={showDetails ? 'expanded' : ''}
          raised="true"
          style={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title={event.summary}
            subheader={
              <div>
                <Typography variant="body2">{formattedDate}</Typography>
                <Typography variant="body2">{event.location}</Typography>
              </div>
            }
          />

          <CardContent style={{ marginTop: 'auto' }} className="card-content">
            <div className="event">
              {showDetails && (
                <div className="description">{event.description}</div>
              )}
              <CardActions className="button-container">
                <Button
                  //style={{ marginBottom: 'auto' }}
                  style={{ marginBottom: 0 }}
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
