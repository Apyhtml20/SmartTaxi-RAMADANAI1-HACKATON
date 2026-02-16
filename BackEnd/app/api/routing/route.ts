import { NextResponse } from "next/server";
import { corsOptionsResponse, withCors } from "@/lib/cors";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(req: Request) {
  try {
    const { from, to } = await req.json();
    const lat1 = Number(from?.lat);
    const lng1 = Number(from?.lng);
    const lat2 = Number(to?.lat);
    const lng2 = Number(to?.lng);

    if (![lat1, lng1, lat2, lng2].every(Number.isFinite)) {
      const res = NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
      return withCors(res);
    }

    const distanceKm = haversine(lat1, lng1, lat2, lng2);
    // vitesse moyenne ville ~ 22 km/h
    const durationMin = Math.max(3, Math.round((distanceKm / 22) * 60));

    const res = NextResponse.json({
      distanceKm: Number(distanceKm.toFixed(2)),
      durationMin,
      polyline: null, // optionnel si tu ajoutes OSRM plus tard
    });
    return withCors(res);
  } catch (err: any) {
    const res = NextResponse.json({ error: err?.message || "Bad request" }, { status: 400 });
    return withCors(res);
  }
}
