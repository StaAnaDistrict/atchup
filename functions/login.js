const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  console.log('Function invoked');
  
  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed');
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password } = JSON.parse(event.body);
  console.log('Received credentials:', { email, password });

  // URL of your Google Apps Script web app
  const scriptUrl = 'https://script.google.com/macros/s/AKfycby4S4V-MEMDFDM46FUdb1E61GJAdFfLf2GNUsYZGz0ZPjlxwhkExRgPhxG8AOaRCsJf/exec';

  try {
    console.log('Sending request to Google Apps Script');
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    console.log('Received response from Google Apps Script:', data);

    if (data.result === 'success') {
      console.log('Login successful');
      return {
        statusCode: 200,
        body: JSON.stringify({ result: 'success' })
      };
    } else {
      console.log('Login failed');
      return {
        statusCode: 401,
        body: JSON.stringify({ result: 'failure' })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ result: 'error', message: error.message })
    };
  }
};
