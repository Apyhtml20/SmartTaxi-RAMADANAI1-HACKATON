import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import { getHeatmap } from "@/services/api";

const MARRAKECH_CENTER = [31.6295, -7.9811];

// petit helper pour heat layer
function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!points?.length) return;

    const layer = L.heatLayer(points, {
      radius: 45,
      blur: 35,
      maxZoom: 16,
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
}

function demandColor(demand) {
  if (demand >= 80) return "#EF4444";
  if (demand >= 60) return "#F97316";
  if (demand >= 40) return "#FFC107";
  return "#22C55E";
}

export default function HeatmapVisualization({ onZonesLoaded }) {
  const [zones, setZones] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await getHeatmap();
      const z = Array.isArray(data?.zones) ? data.zones : [];
      setZones(z);
      onZonesLoaded?.(z);
    } catch (e) {
      setErr(e?.message || "Failed to load heatmap");
      setZones([]);
      onZonesLoaded?.([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // points: [lat, lng, intensity]
  const heatPoints = useMemo(() => {
    return zones
      .filter((z) => typeof z.lat === "number" && typeof z.lng === "number")
      .map((z) => [z.lat, z.lng, Math.max(0.1, (z.demand ?? 0) / 100)]);
  }, [zones]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <MapContainer
        center={MARRAKECH_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        {/* Fond dark (CartoDB) */}
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Heatmap layer */}
        {heatPoints.length > 0 && <HeatLayer points={heatPoints} />}

        {/* Markers + tooltip */}
        {zones
          .filter((z) => typeof z.lat === "number" && typeof z.lng === "number")
          .map((z) => (
            <CircleMarker
              key={z.id || z.name}
              center={[z.lat, z.lng]}
              radius={12}
              pathOptions={{
                color: "#ffffff33",
                weight: 2,
                fillColor: demandColor(z.demand ?? 0),
                fillOpacity: 0.55,
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div style={{ minWidth: 140 }}>
                  <b>{z.name}</b>
                  <div>Demand: {z.demand}%</div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>

      {/* Etat */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="text-white/80 text-sm">Loading heatmap...</div>
        </div>
      )}

      {err && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
            {err}{" "}
            <button
              onClick={load}
              className="ml-2 bg-[#FFC107] text-black px-3 py-1 rounded-md"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
