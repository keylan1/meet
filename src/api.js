import mockData from './mock-data';

// function takes event array and extracts the locations into a new array (Set removes duplicates)
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//function to fetch list of events
export const getEvents = async () => {
  return mockData;
};
