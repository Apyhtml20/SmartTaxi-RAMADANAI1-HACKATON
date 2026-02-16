import { forecastZone } from "@/lib/ai/forecast.service"
import { NextResponse } from "next/server";

const zones = [
  { id: "gueliz", name: "Gueliz", demand: 92, lat: 31.6369, lng: -8.0126 },
  { id: "medina", name: "Medina", demand: 85, lat: 31.6296, lng: -7.9896 },
  { id: "hivernage", name: "Hivernage", demand: 75, lat: 31.6248, lng: -8.0086 },
  { id: "palmeraie", name: "Palmeraie", demand: 45, lat: 31.6659, lng: -7.9753 },
  { id: "kasbah", name: "Kasbah", demand: 68, lat: 31.6209, lng: -7.9882 },
  { id: "nouvelleville", name: "Nouvelle Ville", demand: 55, lat: 31.6405, lng: -8.0012 },
];

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET() {
  return NextResponse.json({ zones }, { headers: corsHeaders() });
}
