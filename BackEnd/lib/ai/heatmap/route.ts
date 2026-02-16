import { NextResponse } from "next/server";
import { corsOptionsResponse, withCors } from "@/lib/cors";
import { zones } from "@/lib/ai/zones";

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET() {
  const res = NextResponse.json({ zones });
  return withCors(res);
}
