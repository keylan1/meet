import mockData from './mock-data';

// function takes event array and extracts the locations into a new array (Set removes duplicates)
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

// removeQuery() to remove unnecessary query parameter from the url
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://axpyvzt1t5.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};
/* Alternative with try...catch for getToken
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);

    const response = await fetch( 'YOUR_GET_ACCESS_TOKEN_ENDPOINT' + '/' + encodeCode);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
}*/

//function to fetch list of events
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      `https://axpyvzt1t5.execute-api.eu-central-1.amazonaws.com/dev/api/get-events` +
      '/' +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      localStorage.setItem('lastEvents', JSON.stringify(result.events)); //lastEvents is the name under which the stringified results are stored in localStorage
      return result.events;
    } else return null;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const response = await fetch(
        `https://axpyvzt1t5.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url`
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};