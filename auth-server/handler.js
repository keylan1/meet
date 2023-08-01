'use strict';

const { google } = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://keylan1.github.io/meet/'];
const oAuth2Client = new google.auth.OAuth2( //new auth method called and created
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0] //where the app sends you after yiu've been authorized
);

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    //oAuth2Client is a module usd to seamlessly get an access toekn, refresh it and retry the request
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Acces-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};
