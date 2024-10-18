const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password } = JSON.parse(event.body);

  // URL of your Google Apps Script web app
  const scriptUrl = 'https://script.google.com/macros/s/AKfycby4S4V-MEMDFDM46FUdb1E61GJAdFfLf2GNUsYZGz0ZPjlxwhkExRgPhxG8AOaRCsJf/exec';

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (data.result === 'success') {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: 'success' })
      };
    } else {
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
