export default defineEventHandler((event) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:4000';
  
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': clientUrl,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  });

  // Handle OPTIONS request
  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204);
    return '';
  }
});