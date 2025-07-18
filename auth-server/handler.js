'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");

// Define the scope of access required
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

// Load credentials and config from config.json
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CALENDAR_ID,
  redirect_uris
} = require('./config.json');

// Create OAuth2 client with credentials
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0] // Use the first redirect URI
);

// ✅ Function 1: Generate the Google OAuth URL
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline", // gets refresh token
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ authUrl }),
  };
};

// ✅ Function 2: Exchange authorization code for access token
module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {
  try {
    const accessToken = decodeURIComponent(event.pathParameters.access_token);

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendarApi = google.calendar({ version: 'v3', auth });

    const response = await calendarApi.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response.data.items),
    };
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};