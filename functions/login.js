const https = require('https');

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

  return new Promise((resolve, reject) => {
    const req = https.request(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('Received response from Google Apps Script:', data);
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.result === 'success') {
            console.log('Login successful');
            resolve({
              statusCode:
              200,
body: JSON.stringify({ result: 'success' })
});
} else {
console.log('Login failed');
resolve({
statusCode: 401,
body: JSON.stringify({ result: 'failure' })
});
}
} catch (error) {
console.error('Error parsing response:', error);
reject({
statusCode: 500,
body: JSON.stringify({ result: 'error', message: 'Error parsing response' })
});
}
});
});
req.on('error', (error) => {
console.error('Error:', error);
reject({
statusCode: 500,
body: JSON.stringify({ result: 'error', message: error.message })
});
});
req.write(JSON.stringify({ email, password }));
req.end();
});
};
