import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  const lastUser = [...messages].reverse().find((m) => m?.role === "user")?.content || "";

  // Réponse simple (tu remplaces par ton vrai chatbot backend)
  const reply =
    "✅ J’ai compris: " +
    lastUser +
    "\n\nJe peux: recommander zone, estimer la demande par heure, et proposer un trajet.";

  return NextResponse.json({ reply });
}
