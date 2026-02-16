import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from '@/lib/auth';
import { addLocation } from '@/lib/services/driver.service';
import { withCors, corsPreflight } from '@/lib/cors';

const schema = z.object({ lat: z.number(), lng: z.number(), speed: z.number().optional().nullable() });

export function OPTIONS() { return corsPreflight(); }

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  if (!auth) return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  if (auth.role !== 'DRIVER') return withCors(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));

  try {
    const body = schema.parse(await req.json());
    const result = await addLocation(auth.userId, body.lat, body.lng, body.speed ?? null);
    return withCors(NextResponse.json(result));
  } catch (e:any) {
    const status = e?.message === 'DRIVER_NOT_FOUND' ? 404 : 400;
    return withCors(NextResponse.json({ error: 'Driver not found' }, { status }));
  }
}
