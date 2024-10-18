const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password } = JSON.parse(event.body);

  const API_KEY = 'AIzaSyAC2cZQFW6J70ia1n5yLTGoxIVvu8FH17s';
  const SPREADSHEET_ID = '1mDQKmYmwCZrtsSg6FE1ascQO5toMKGiwj5xo7-bRXsk';
  const RANGE = 'UserRegistrations!A2:G'; // Updated to include the STATUS column

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
    );

    const data = await response.json();

    if (data.values) {
      for (let row of data.values) {
        if (row[2] === email && row[3] === password) { // Email is in column C (index 2), Password in column D (index 3)
          const status = row[6] || ''; // STATUS is in column G (index 6)
          
          if (status === 'APPROVED' || status === 'DISAPPROVED' || status === '') {
            return {
              statusCode: 200,
              body: JSON.stringify({ result: 'success', status: status })
            };
          } else {
            return {
              statusCode: 400,
              body: JSON.stringify({ result: 'failure', message: 'User not yet confirmed for access. Please wait for an email from the admin.' })
            };
          }
        }
      }
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ result: 'failure', message: 'Invalid email or password.' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ result: 'error', message: 'An error occurred' })
    };
  }
};
