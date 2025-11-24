import { openAPISpec } from '$lib/openapi-spec.js';

export async function GET({ setHeaders }) {
  setHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=3600'
  });

  return new Response(JSON.stringify(openAPISpec), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
