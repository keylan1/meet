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
import { InfoAlert, ErrorAlert } from './components/Alert';

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
    //populates list as soon as app component is mounted
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="alerts-container">
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        </div>
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
        />
        <EventList events={events} />
      </div>
    </ThemeProvider>
  );
}

export default App;
