import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { rideRequestSchema } from '@/lib/validators/ride';
import { requestRide } from '@/lib/services/ride.service';
import { withCors, corsPreflight } from '@/lib/cors';

export function OPTIONS() { return corsPreflight(); }

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  if (!auth) return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  if (auth.role !== 'PASSENGER') return withCors(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));

  try {
    const body = rideRequestSchema.parse(await req.json());
    const result = await requestRide(auth.userId, {
      pickupLat: body.pickup.lat,
      pickupLng: body.pickup.lng,
      pickupName: body.pickup.name ?? null,
      dropLat: body.dropoff.lat,
      dropLng: body.dropoff.lng,
      dropName: body.dropoff.name ?? null,
      seats: body.seats,
      carpool: body.carpool,
    });
    return withCors(NextResponse.json(result));
  } catch {
    return withCors(NextResponse.json({ error: 'Bad request' }, { status: 400 }));
  }
}
