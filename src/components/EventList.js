import Event from './Event';
import Grid from '@mui/material/Unstable_Grid2';

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      <Grid container spacing={2}>
        {events
          ? events.map((event) => (
              <Grid>
                <Event key={event.id} event={event} />
              </Grid>
            ))
          : null}
      </Grid>
    </ul>
  );
};

export default EventList;
