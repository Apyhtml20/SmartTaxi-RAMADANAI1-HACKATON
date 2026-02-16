// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { corsOptionsResponse, withCors } from "@/lib/cors";

// ✅ Preflight CORS
export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim();
    const password = String(body.password || "");

    if (!email || !password) {
      const res = NextResponse.json({ error: "Email and password are required" }, { status: 400 });
      return withCors(res);
    }

    // ✅ TODO: ici tu gardes ton vrai code (Prisma + bcrypt + token)
    // Pour que ça compile sans casser, je renvoie une réponse simple:
    const res = NextResponse.json({
      token: "dev-token",
      user: { id: 1, fullName: "Test User", email, role: "DRIVER" },
    });

    return withCors(res);
  } catch (err: any) {
    const res = NextResponse.json(
      { error: err?.message || "Bad request" },
      { status: 400 }
    );
    return withCors(res);
  }
}
