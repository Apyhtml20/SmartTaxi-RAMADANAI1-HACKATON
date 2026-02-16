import { NextResponse } from "next/server"
import { forecastZone } from "@/lib/ai/forecast.service"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const zone = searchParams.get("zone")

  if (!zone) {
    return NextResponse.json({ error: "Zone required" }, { status: 400 })
  }

  const data = forecastZone(zone)

  return NextResponse.json(data)
}
