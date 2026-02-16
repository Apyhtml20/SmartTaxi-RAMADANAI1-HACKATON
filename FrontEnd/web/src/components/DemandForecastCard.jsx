// src/components/DemandForecastCard.jsx
import React, { useEffect, useState } from "react";
import GlassmorphismCard from "@/components/GlassmorphismCard.jsx";
import { getForecast } from "@/services/api";

export default function DemandForecastCard({ zoneName }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!zoneName) return;
    (async () => {
      try {
        setErr("");
        const res = await getForecast(zoneName);
        // attendu: { items: [{ hour:"02:00", demand:90 }, ...] } OU tableau direct
        const list = Array.isArray(res) ? res : res?.items || [];
        setItems(list);
      } catch (e) {
        setErr(e?.message || "Forecast error");
        setItems([]);
      }
    })();
  }, [zoneName]);

  return (
    <GlassmorphismCard>
      <h3 className="text-lg font-bold text-white mb-3">Demand Forecast (next hours)</h3>
      {!zoneName && <p className="text-white/60 text-sm">Select a zone to see forecast.</p>}

      {err && <p className="text-red-400 text-xs">{err}</p>}

      <div className="space-y-2">
        {items.slice(0, 6).map((it, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-white/70">{it.hour ?? it.time ?? `H+${i + 1}`}</span>
            <span className="text-white font-semibold">{Number(it.demand ?? 0)}%</span>
          </div>
        ))}
      </div>
    </GlassmorphismCard>
  );
}
