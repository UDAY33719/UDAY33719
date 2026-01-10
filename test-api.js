import fetch from 'node-fetch';

async function testAPI() {
  try {
    console.log('Testing units API...');
    const response = await fetch('http://localhost:5000/api/inventory/units', {
      headers: {
        'Authorization': 'Bearer mock-jwt-token-for-development'
      }
    });
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
