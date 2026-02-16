// lib/cors.ts
import { NextResponse } from "next/server";

const ALLOW_ORIGIN = process.env.CORS_ORIGIN || "*";

export function withCors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Max-Age", "86400");
  return res;
}

export function corsOptionsResponse() {
  const res = new NextResponse(null, { status: 204 });
  return withCors(res);
}
