import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { TrendingDown, Route, Zap, Brain, Users, Check, X, Navigation } from "lucide-react";

import StatCard from "@/components/StatCard.jsx";
import GlassmorphismCard from "@/components/GlassmorphismCard.jsx";
import HeatmapVisualization from "@/components/HeatmapVisualization.jsx";
import PuterChatWidget from "@/components/PuterChatWidget.jsx";


import { Button } from "@/components/ui/button.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { getMatch, getForecast, getCityIndex } from "@/services/api";

const MadIcon = ({ className }) => <span className={`font-bold ${className}`}>MAD</span>;

const DEFAULT_ORIGIN = { lat: 31.6295, lng: -7.9811 };

function openGoogleNavigation({ originLat, originLng, destLat, destLng }) {
  const url =
    `https://www.google.com/maps/dir/?api=1` +
    `&origin=${originLat},${originLng}` +
    `&destination=${destLat},${destLng}` +
    `&travelmode=driving`;
  window.open(url, "_blank");
}

function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("Geolocation not supported"));
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      reject,
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

export default function DriverDashboard() {
  const { toast } = useToast();

  const [zones, setZones] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [aiErr, setAiErr] = useState("");

  const [forecast, setForecast] = useState([]);
  const [cityIndex, setCityIndex] = useState(null);

  const driverPerformance = {
    earningsToday: 320,
    emptyRideRate: 18,
    optimizedTrips: 12,
    efficiencyIndex: 76,
  };

  const carpoolSuggestions = [];

  const topZone = useMemo(() => {
    if (!zones?.length) return null;
    return zones.reduce((prev, cur) => (prev.demand > cur.demand ? prev : cur));
  }, [zones]);

  const refreshRecommendation = async (origin = DEFAULT_ORIGIN) => {
    setAiErr("");
    try {
      const res = await getMatch({ pickupLat: origin.lat, pickupLng: origin.lng });
      setRecommendation(res?.recommendedZone ?? null);
    } catch (e) {
      setAiErr(e?.message || "Failed to load AI recommendation");
      setRecommendation(null);
    }
  };

  const loadPanels = async (zoneName) => {
    try {
      const [f, idx] = await Promise.all([
        getForecast(zoneName),
        getCityIndex(),
      ]);
      setForecast(Array.isArray(f?.hours) ? f.hours : []);
      setCityIndex(idx || null);
    } catch (e) {
      // pas bloquant
      console.warn("Panels error:", e);
    }
  };

  // quand on reçoit une reco, on charge forecast/index
  useEffect(() => {
    const zoneName = recommendation?.zone || topZone?.name;
    if (zoneName) loadPanels(zoneName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendation?.zone, topZone?.name]);

  const navigateToHighDemand = async () => {
    if (!topZone) return;

    if (typeof topZone.lat !== "number" || typeof topZone.lng !== "number") {
      toast({
        title: "No coordinates",
        description: "La zone n’a pas lat/lng. Ajoute lat/lng dans /api/ai/heatmap.",
      });
      return;
    }

    let origin = DEFAULT_ORIGIN;
    try {
      origin = await getBrowserLocation();
    } catch {}

    openGoogleNavigation({
      originLat: origin.lat,
      originLng: origin.lng,
      destLat: topZone.lat,
      destLng: topZone.lng,
    });
  };

  const navigateNow = async () => {
    let destLat = null;
    let destLng = null;

    // priorité: recommendation lat/lng
    if (recommendation && typeof recommendation.lat === "number" && typeof recommendation.lng === "number") {
      destLat = recommendation.lat;
      destLng = recommendation.lng;
    } else if (topZone && typeof topZone.lat === "number" && typeof topZone.lng === "number") {
      destLat = topZone.lat;
      destLng = topZone.lng;
    }

    if (typeof destLat !== "number" || typeof destLng !== "number") {
      toast({
        title: "Destination missing",
        description: "Ajoute lat/lng dans /api/ai/match ou /api/ai/heatmap.",
      });
      return;
    }

    let origin = DEFAULT_ORIGIN;
    try {
      origin = await getBrowserLocation();
    } catch {}

    openGoogleNavigation({
      originLat: origin.lat,
      originLng: origin.lng,
      destLat,
      destLng,
    });
  };

  const handleAcceptCarpool = () =>
    toast({ title: "Carpool Accepted!", description: "Passengers have been notified." });

  const handleDeclineCarpool = () =>
    toast({ title: "Carpool Declined", description: "Looking for other opportunities..." });

  return (
    <>
      <Helmet>
        <title>Driver Dashboard - SmartTaxi</title>
        <meta name="description" content="Optimize routes and earnings with AI." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#1C1F24] via-[#2A2D35] to-[#1C1F24] pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Driver Dashboard</h1>
            <p className="text-white/70">AI-powered insights to maximize your earnings</p>
          </motion.div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Earnings Today" value={driverPerformance.earningsToday} suffix=" MAD" icon={MadIcon} trend={12} color="#FFC107" />
            <StatCard title="Empty Ride Rate" value={driverPerformance.emptyRideRate} suffix="%" icon={TrendingDown} trend={-8} color="#4ECDC4" />
            <StatCard title="Optimized Trips" value={driverPerformance.optimizedTrips} icon={Route} trend={15} color="#FF6B6B" />
            <StatCard title="Efficiency Index" value={driverPerformance.efficiencyIndex} suffix="%" icon={Zap} trend={5} color="#95E1D3" />
          </div>

          {/* MAP + SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <GlassmorphismCard hover={false} className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Demand Heatmap</h2>
                      <p className="text-white/50 text-sm">Leaflet map + heat overlay (API)</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={async () => {
                      toast({ title: "Refreshing", description: "Updating AI..." });
                      await refreshRecommendation();
                    }}
                  >
                    Refresh Data
                  </Button>
                </div>

                <HeatmapVisualization
                  onZonesLoaded={async (z) => {
                    setZones(z);
                    await refreshRecommendation();
                  }}
                />

                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F]"
                    onClick={navigateToHighDemand}
                    disabled={!topZone}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate to High Demand Zone
                  </Button>
                </div>
              </GlassmorphismCard>
            </div>

            <div className="space-y-6">
              {/* RECOMMENDATION */}
              <GlassmorphismCard>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FFC107]/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-[#FFC107]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Recommendation</h3>
                </div>

                <div className="p-4 bg-[#FFC107]/10 border border-[#FFC107]/30 rounded-lg">
                  <p className="text-white font-semibold mb-2">
                    Move to Zone {recommendation?.zone || topZone?.name || "—"}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Demand Probability</span>
                    <span className="text-[#FFC107] font-bold">
                      {recommendation?.demand ?? topZone?.demand ?? "--"}%
                    </span>
                  </div>
                  {aiErr && <p className="text-red-400 text-xs mt-2">{aiErr}</p>}
                </div>

                <Button
                  className="w-full mt-4 bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-semibold"
                  onClick={navigateNow}
                >
                  Navigate Now
                </Button>
              </GlassmorphismCard>

              {/* FORECAST */}
              <GlassmorphismCard>
                <div className="text-white font-bold mb-3">Demand Forecast (next hours)</div>
                {forecast.length === 0 ? (
                  <div className="text-white/60 text-sm">No forecast data</div>
                ) : (
                  <div className="space-y-2">
                    {forecast.map((h, i) => (
                      <div key={i} className="flex justify-between text-white/80 text-sm">
                        <span>{h.hour}</span>
                        <span className="font-semibold">{h.demand}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassmorphismCard>

              {/* CITY INDEX */}
              <GlassmorphismCard>
                <div className="text-white font-bold mb-3">City Index</div>
                {!cityIndex ? (
                  <div className="text-white/60 text-sm">No city index</div>
                ) : (
                  <div>
                    <div className="text-[#FFC107] text-4xl font-bold">{cityIndex.score}/100</div>
                    <div className="text-white/70">{cityIndex.city}</div>

                    <div className="mt-3 space-y-1">
                      {(cityIndex.zones || []).slice(0, 5).map((z, i) => (
                        <div key={i} className="flex justify-between text-white/80 text-sm">
                          <span>{z.name}</span>
                          <span className="font-semibold">{z.demand}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>
          </div>

          {/* CARPOOL (optionnel) */}
          {carpoolSuggestions.length > 0 && (
            <GlassmorphismCard>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Smart Carpool</h2>
              </div>

              {carpoolSuggestions.map((carpool) => (
                <div key={carpool.id} className="p-6 bg-white/5 border border-white/10 rounded-xl mb-4">
                  <div className="flex gap-3">
                    <Button onClick={handleAcceptCarpool} className="bg-green-500 hover:bg-green-600 text-white">
                      <Check className="w-4 h-4 mr-2" /> Accept
                    </Button>
                    <Button onClick={handleDeclineCarpool} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                      <X className="w-4 h-4 mr-2" /> Decline
                    </Button>
                  </div>
                </div>
              ))}
            </GlassmorphismCard>
          )}
        </div>
      </div>

      {/* Chatbot floating */}
      <PuterChatWidget />

    </>
  );
}
