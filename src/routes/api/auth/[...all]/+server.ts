// src/routes/api/auth/[...all]/+server.ts
import { auth } from "$lib";
import { STATUS_CODES } from "node:http";
import type { RequestHandler } from "./$types.js";

const handler: RequestHandler = async ({ request }) => {
  console.log("Auth request:", request.method, request.url);
  
  try {
    const response = await auth.handler(request);
    console.log("Auth handler success");
    return response;
  } catch (error) {
    console.error("Auth handler error:", error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;