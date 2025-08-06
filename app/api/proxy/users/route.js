// app/api/proxy/[...path]/route.js
import { NextResponse } from 'next/server';

const BACKEND = process.env.BACKEND_INTERNAL || 'http://itdev.cmtc.ac.th:3000';
// Optional: a secret to avoid abuse — set PROXY_SECRET in Vercel and add header 'x-proxy-secret' from frontend if desired
const PROXY_SECRET = process.env.PROXY_SECRET || '';

/**
 * Forward incoming request to BACKEND + path + query
 * Keep most request headers (except host) and body.
 */
async function forwardRequest(req, { params }) {
  const url = new URL(req.url);
  const pathSegments = params.path || []; // [...path]
  const path = pathSegments.join('/');
  const backendUrl = new URL(`${BACKEND}/${path}`);
  // append incoming query params
  for (const [k, v] of url.searchParams.entries()) backendUrl.searchParams.append(k, v);

  // optional secret check to restrict access
  if (PROXY_SECRET) {
    const secretHeader = req.headers.get('x-proxy-secret') || '';
    if (secretHeader !== PROXY_SECRET) {
      return new NextResponse('Unauthorized (invalid proxy secret)', { status: 401 });
    }
  }

  // Prepare headers to forward (omit host)
  const forwardHeaders = {};
  for (const [key, value] of req.headers.entries()) {
    if (key.toLowerCase() === 'host') continue;
    // Optionally remove or rewrite cookies/authorization if necessary:
    // if (key.toLowerCase() === 'cookie') continue;
    forwardHeaders[key] = value;
  }

  // Build fetch options
  const fetchOptions = {
    method: req.method,
    headers: forwardHeaders,
    // body: forward body if present. For GET/HEAD, no body.
    body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : req.body,
    // no credentials here; server-side fetch will not include user's browser cookies unless forwarded explicitly
    // redirect: 'manual'
  };

  // Make the request to backend
  const backendRes = await fetch(backendUrl.toString(), fetchOptions);

  // Build response headers (copy content-type and other allowed headers)
  const responseHeaders = {};
  backendRes.headers.forEach((v, k) => {
    // Avoid exposing hop-by-hop headers
    const hopByHop = [
      'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
      'te', 'trailers', 'transfer-encoding', 'upgrade'
    ];
    if (hopByHop.includes(k.toLowerCase())) return;
    responseHeaders[k] = v;
  });

  const body = await backendRes.arrayBuffer(); // read raw
  return new NextResponse(Buffer.from(body), {
    status: backendRes.status,
    headers: responseHeaders
  });
}

// Handler functions
export async function GET(req, { params }) { return forwardRequest(req, { params }); }
export async function POST(req, { params }) { return forwardRequest(req, { params }); }
export async function PUT(req, { params }) { return forwardRequest(req, { params }); }
export async function PATCH(req, { params }) { return forwardRequest(req, { params }); }
export async function DELETE(req, { params }) { return forwardRequest(req, { params }); }

// OPTIONS for CORS preflight if browser directly called this route
export async function OPTIONS(req, { params }) {
  // Return common CORS headers so browser preflight succeeds when needed
  const headers = {
    'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': req.headers.get('access-control-request-headers') || 'Content-Type, Authorization, x-proxy-secret',
  };
  return new NextResponse(null, { status: 204, headers });
}
