import { NextResponse } from 'next/server';

export async function GET(){
  return NextResponse.json({ ok:true, service:'smarttaxi-backend', time: new Date().toISOString() });
}
