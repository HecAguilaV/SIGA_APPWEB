import { openApiSpec } from '$lib/openapi.js';

export async function GET() {
  return new Response(JSON.stringify(openApiSpec), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
