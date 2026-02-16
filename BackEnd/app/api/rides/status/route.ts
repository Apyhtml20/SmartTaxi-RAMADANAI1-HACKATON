import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from '@/lib/auth';
import { updateRideStatus } from '@/lib/services/ride.service';
import { withCors, corsPreflight } from '@/lib/cors';

const schema = z.object({
  rideRequestId: z.number().int(),
  status: z.enum(['PICKED_UP','COMPLETED','CANCELLED']),
});

export function OPTIONS() { return corsPreflight(); }

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  if (!auth) return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  if (auth.role !== 'DRIVER') return withCors(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));

  try {
    const body = schema.parse(await req.json());
    const ride = await updateRideStatus(body.rideRequestId, body.status);
    return withCors(NextResponse.json({ ride }));
  } catch {
    return withCors(NextResponse.json({ error: 'Bad request' }, { status: 400 }));
  }
}
