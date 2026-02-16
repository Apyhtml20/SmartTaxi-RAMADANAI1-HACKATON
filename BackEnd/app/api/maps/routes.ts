import { NextResponse } from "next/server";
import { corsOptionsResponse, withCors } from "@/lib/cors";

export async function OPTIONS() {
  return corsOptionsResponse();
}

// POST { origin:{lat,lng}, destination:{lat,lng} }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const origin = body?.origin;
    const destination = body?.destination;

    if (!origin?.lat || !origin?.lng || !destination?.lat || !destination?.lng) {
      const res = NextResponse.json({ error: "origin/destination required" }, { status: 400 });
      return withCors(res);
    }

    const key = process.env.GOOGLE_MAPS_KEY;
    if (!key) {
      const res = NextResponse.json({ error: "GOOGLE_MAPS_KEY missing" }, { status: 500 });
      return withCors(res);
    }

    const url =
      "https://maps.googleapis.com/maps/api/directions/json" +
      `?origin=${origin.lat},${origin.lng}` +
      `&destination=${destination.lat},${destination.lng}` +
      `&departure_time=now` + // ✅ duration_in_traffic
      `&key=${key}`;

    const r = await fetch(url);
    const data = await r.json();

    if (data.status !== "OK") {
      const res = NextResponse.json({ error: "Directions failed", details: data }, { status: 400 });
      return withCors(res);
    }

    const leg = data.routes?.[0]?.legs?.[0];
    const result = {
      route: data.routes?.[0],
      summary: {
        distanceText: leg?.distance?.text,
        durationText: leg?.duration?.text,
        durationInTrafficText: leg?.duration_in_traffic?.text,
        startAddress: leg?.start_address,
        endAddress: leg?.end_address,
      },
    };

    const res = NextResponse.json(result, { status: 200 });
    return withCors(res);
  } catch (e: any) {
    const res = NextResponse.json({ error: e?.message || "Bad request" }, { status: 400 });
    return withCors(res);
  }
}
