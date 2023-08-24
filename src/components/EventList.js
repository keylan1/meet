import Event from './Event';
import Grid from '@mui/material/Unstable_Grid2';

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      <h1>Event List</h1>
      <Grid container spacing={4} className="mui-grid">
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
