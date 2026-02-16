import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export type JwtPayload = { userId: number; role: 'PASSENGER' | 'DRIVER' | 'ADMIN' };

export function signToken(payload: JwtPayload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function getAuth(req: NextRequest): JwtPayload | null {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set');
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}
