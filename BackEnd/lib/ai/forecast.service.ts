// lib/ai/forecast.service.ts

type RideRecord = {
  zone: string
  date: Date
}

type ZoneForecast = {
  zone: string
  score: number
  nextHours: { hour: string; score: number }[]
}

// 🎯 Mock data historique (remplace plus tard par Prisma)
const mockHistory: RideRecord[] = []

const zones = ["Gueliz", "Medina", "Hivernage", "Kasbah", "Palmeraie"]

// 🔥 Simuler 7 jours d'historique
function generateMockHistory() {
  const now = new Date()

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      zones.forEach((zone) => {
        const count = Math.floor(Math.random() * 20)
        for (let i = 0; i < count; i++) {
          const date = new Date(now)
          date.setDate(now.getDate() - d)
          date.setHours(h)
          mockHistory.push({ zone, date })
        }
      })
    }
  }
}

generateMockHistory()
function computeSeasonalAverage(zone: string, hour: number) {
  const relevant = mockHistory.filter(
    r =>
      r.zone === zone &&
      r.date.getHours() === hour
  )

  const groupedByDay: Record<string, number> = {}

  relevant.forEach(r => {
    const key = r.date.toDateString()
    groupedByDay[key] = (groupedByDay[key] || 0) + 1
  })

  const values = Object.values(groupedByDay)
  if (!values.length) return 0

  const avg = values.reduce((a,b)=>a+b,0) / values.length
  return avg
}
function applyRecencyWeight(base: number, daysAgo: number) {
  const weight = 1 - (daysAgo * 0.1)
  return base * Math.max(weight, 0.5)
}
function adjustForContext(score: number, date: Date) {
  const hour = date.getHours()
  const day = date.getDay()

  let factor = 1

  // weekend boost
  if (day === 5 || day === 6) {
    factor += 0.15
  }

  // soirée boost
  if (hour >= 18 && hour <= 23) {
    factor += 0.25
  }

  return score * factor
}
export function forecastZone(zone: string): ZoneForecast {
  const now = new Date()
  const currentHour = now.getHours()

  const base = computeSeasonalAverage(zone, currentHour)

  let score = base
  score = adjustForContext(score, now)

  // normalisation 0..100
  const normalized = Math.min(Math.round(score * 5), 100)

  // forecast next 6h
  const nextHours = []

  for (let i = 1; i <= 6; i++) {
    const future = new Date()
    future.setHours(currentHour + i)

    let s = computeSeasonalAverage(zone, future.getHours())
    s = adjustForContext(s, future)

    nextHours.push({
      hour: `${future.getHours().toString().padStart(2,"0")}:00`,
      score: Math.min(Math.round(s * 5), 100)
    })
  }

  return {
    zone,
    score: normalized,
    nextHours
  }
}
