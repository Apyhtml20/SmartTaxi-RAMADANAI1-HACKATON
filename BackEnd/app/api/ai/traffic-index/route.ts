export async function GET() {
  // ---- Heuristique simple: trafic ↑ le matin + soir, ↓ la nuit ----
  const now = new Date();
  const h = now.getHours();

  // base score selon heure
  let base = 35;
  if (h >= 7 && h <= 10) base = 75;        // matin
  else if (h >= 12 && h <= 14) base = 60;  // midi
  else if (h >= 17 && h <= 20) base = 85;  // soir
  else if (h >= 21 || h <= 5) base = 25;   // nuit

  // petite variation pseudo-aléatoire stable
  const jitter = (h * 7) % 10; // 0..9
  let score = Math.min(100, Math.max(0, base + jitter));

  const level =
    score >= 80 ? "Fort" :
    score >= 55 ? "Moyen" :
    "Faible";

  const note =
    level === "Fort"
      ? "Trafic chargé: privilégie les boulevards et évite les axes centraux."
      : level === "Moyen"
      ? "Trafic normal: temps de trajet modéré."
      : "Trafic fluide: bon moment pour se déplacer.";

  return Response.json(
    { score, level, note, hour: h },
    {
      headers: {
        "Content-Type": "application/json",
        // CORS (si ton frontend est sur :3000)
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function OPTIONS() {
  // préflight CORS
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
