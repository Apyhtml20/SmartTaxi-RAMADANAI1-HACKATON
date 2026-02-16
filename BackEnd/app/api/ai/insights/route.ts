import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withCors, corsPreflight } from '@/lib/cors';
import { insightsPrompt } from '@/lib/ai/prompts';
import { buildPuterChatPayload } from '@/lib/ai/puter';

const schema = z.object({
  kpis: z.object({
    earningsToday: z.number(),
    emptyRideRate: z.number(),
    optimizedTrips: z.number(),
    efficiencyIndex: z.number(),
  }),
  topZone: z.object({ name: z.string(), demand: z.number() }).optional().nullable(),
  model: z.string().optional(),
});

export function OPTIONS() { return corsPreflight(); }

// Returns a Puter chat payload (messages + options) for the frontend to call puter.ai.chat().
export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());
    const messages = insightsPrompt({ kpis: body.kpis, topZone: body.topZone ?? null });
    const payload = buildPuterChatPayload(messages as any, { model: body.model });
    return withCors(NextResponse.json({ puter: payload }));
  } catch {
    return withCors(NextResponse.json({ error: 'Bad request' }, { status: 400 }));
  }
}
