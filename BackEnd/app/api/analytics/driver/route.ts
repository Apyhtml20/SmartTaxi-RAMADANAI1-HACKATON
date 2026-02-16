import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { driverKpis } from '@/lib/services/analytics.service';
import { withCors, corsPreflight } from '@/lib/cors';

export function OPTIONS() { return corsPreflight(); }

export async function GET(req: NextRequest) {
  const auth = getAuth(req);
  if (!auth) return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
  if (auth.role !== 'DRIVER') return withCors(NextResponse.json({ error: 'Forbidden' }, { status: 403 }));

  try {
    const kpis = await driverKpis(auth.userId);
    return withCors(NextResponse.json({ kpis }));
  } catch {
    return withCors(NextResponse.json({ error: 'Driver not found' }, { status: 404 }));
  }
}
