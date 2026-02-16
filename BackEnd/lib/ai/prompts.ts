export function insightsPrompt(input: {
    kpis: { earningsToday: number; emptyRideRate: number; optimizedTrips: number; efficiencyIndex: number };
    topZone?: { name: string; demand: number } | null;
  }) {
    const { kpis, topZone } = input;
    return [
      { role: 'system', content: 'You are an assistant for SmartTaxi drivers. Be concise, actionable, and friendly.' },
      { role: 'user', content:
`Driver KPIs today:
- Earnings: ${kpis.earningsToday} MAD
- Empty ride rate: ${kpis.emptyRideRate}%
- Optimized trips: ${kpis.optimizedTrips}
- Efficiency index: ${kpis.efficiencyIndex}%

${topZone ? `Top demand zone now: ${topZone.name} (${topZone.demand}%)` : ''}

Give 3 short tips to increase earnings and reduce empty rides.`
      }
    ] as const;
  }
