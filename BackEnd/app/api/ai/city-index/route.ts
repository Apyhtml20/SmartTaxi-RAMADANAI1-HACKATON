import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    score: 70,
    city: "Marrakech",
    zones: [
      { name: "Gueliz", demand: 92 },
      { name: "Medina", demand: 85 },
      { name: "Hivernage", demand: 75 },
      { name: "Kasbah", demand: 68 },
    ],
  });
}
