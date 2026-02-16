// src/components/CityIndexCard.jsx
import React, { useEffect, useState } from "react";
import GlassmorphismCard from "@/components/GlassmorphismCard.jsx";
import { getCityIndex } from "@/services/api";

export default function CityIndexCard() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        const res = await getCityIndex();
        // attendu: { score:70, city:"Marrakech", topZones:[{name,demand},...] }
        setData(res);
      } catch (e) {
        setErr(e?.message || "City index error");
        setData(null);
      }
    })();
  }, []);

  return (
    <GlassmorphismCard>
      <h3 className="text-lg font-bold text-white mb-3">City Index</h3>
      {err && <p className="text-red-400 text-xs">{err}</p>}
      {!data ? (
        <p className="text-white/60 text-sm">Loading...</p>
      ) : (
        <>
          <div className="text-[#FFC107] text-4xl font-extrabold">
            {Number(data.score ?? 0)}/100
          </div>
          <div className="text-white/70 text-sm mb-3">{data.city ?? "Marrakech"}</div>

          <div className="space-y-2">
            {(data.topZones || []).slice(0, 4).map((z, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-white/70">{z.name ?? z.zone}</span>
                <span className="text-white font-semibold">{Number(z.demand ?? 0)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </GlassmorphismCard>
  );
}
