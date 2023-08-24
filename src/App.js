import * as React from 'react';
import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { createTheme } from '@mui/material/styles';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { purple } from '@mui/material/colors';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { Skeleton } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: '#af52bf',
      dark: '#6d1b7b',
    },
    secondary: {
      main: '#ffc400',
      light: '#ffcf33',
      dark: '#b28900',
    },
  },
});

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE)); //creates a new array from index 0 and limits the amount in currentNOE (32)
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    let warningText;
    if (navigator.onLine) {
      warningText = '';
    } else {
      warningText = 'Currently in offline mode';
      setWarningAlert(warningText);
    }
    //populates list as soon as app component is mounted
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        </div>
        <div style={{ backgroundColor: '#f9f5fa' }} className="hero-section">
          <h1>Event (Meet) App</h1>
          {allLocations.length === 0 ? (
            <Skeleton
              animation="wave"
              height={56}
              width="100%"
              data-testid="skeleton"
            />
          ) : (
            <CitySearch
              allLocations={allLocations}
              setCurrentCity={setCurrentCity}
              setInfoAlert={setInfoAlert}
              data-testid="content-loaded city-search"
            />
          )}
          {/*
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
      />*/}
          {events.length === 0 ? (
            <Skeleton
              animation="wave"
              height={56}
              width="100%"
              data-testid="skeleton"
            />
          ) : (
            <NumberOfEvents
              setCurrentNOE={setCurrentNOE}
              setErrorAlert={setErrorAlert}
              className="content-loaded number-of-events"
            />
          )}
          {/*
        <NumberOfEvents
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
      />*/}
        </div>
        <div>
          {events.length === 0 ? (
            <Skeleton
              animation="pulse"
              height={200}
              width="80%"
              data-testid="skeleton"
            />
          ) : (
            <EventList
              events={events}
              setWarningAlert={setWarningAlert}
              data-testid="content-loaded event-list"
            />
          )}
        </div>
        {/*
      <EventList events={events} setWarningAlert={setWarningAlert} />*/}
        <h2>Statistics</h2>
        <div
          className="charts-container"
          style={{ backgroundColor: '#fcf9f0', paddingBottom: '30px' }}>
          {events.length === 0 ? (
            <Skeleton
              animation="wave"
              height={300}
              width="100%"
              data-testid="skeleton"
            />
          ) : (
            <>
              <CityEventsChart allLocations={allLocations} events={events} />
              <EventGenresChart events={events} />
            </>
          )}
          {/*
          <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} /> */}
        </div>

        <footer>
          Image by{' '}
          <a href="https://www.freepik.com/free-photo/cute-little-dog-impersonating-business-person_14724905.htm#query=fun&position=23&from_view=search&track=sph">
            Freepik
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
