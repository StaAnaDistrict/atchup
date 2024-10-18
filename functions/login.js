exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  
    const { email, password } = JSON.parse(event.body);
  
    // For now, let's use a hardcoded user for testing
    const testUser = {
      email: 'test@example.com',
      password: 'password123'
    };
  
    if (email === testUser.email && password === testUser.password) {
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
  };
