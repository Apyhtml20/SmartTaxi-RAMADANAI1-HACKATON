import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { getRide } from '@/lib/services/ride.service';
import { withCors, corsPreflight } from '@/lib/cors';

export function OPTIONS() { return corsPreflight(); }

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = getAuth(req);
  if (!auth) return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));

  const id = Number(params.id);
  if (!Number.isFinite(id)) return withCors(NextResponse.json({ error: 'Bad id' }, { status: 400 }));

  const ride = await getRide(id);
  if (!ride) return withCors(NextResponse.json({ error: 'Not found' }, { status: 404 }));
  return withCors(NextResponse.json({ ride }));
}
