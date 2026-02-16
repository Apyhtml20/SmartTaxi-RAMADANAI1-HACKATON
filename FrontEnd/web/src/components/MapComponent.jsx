import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CarTaxiFront, Navigation, Clock, User } from 'lucide-react';

const MapComponent = ({ showDriver = false }) => {
  const { driverLocation, pickupLocation, dropoffLocation, estimatedTime, distance, driverName, rating, carModel } = liveTracking;

  // Calculate SVG path for the route
  // Simple quadratic bezier curve for visual appeal
  const routePath = `M ${driverLocation.x} ${driverLocation.y} Q ${(driverLocation.x + pickupLocation.x)/2} ${(driverLocation.y + pickupLocation.y)/2 - 10} ${pickupLocation.x} ${pickupLocation.y}`;
  const tripPath = `M ${pickupLocation.x} ${pickupLocation.y} Q ${(pickupLocation.x + dropoffLocation.x)/2} ${(pickupLocation.y + dropoffLocation.y)/2 + 10} ${dropoffLocation.x} ${dropoffLocation.y}`;

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-[#1C1F24] to-[#0F172A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      {/* SVG Layer for Routes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Route: Driver to Pickup */}
        {showDriver && (
          <>
            <motion.path
              d={routePath.replace(/([0-9.]+) ([0-9.]+)/g, (match, x, y) => `${x}% ${y}%`)}
              fill="none"
              stroke="#FFC107"
              strokeWidth="3"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Animated dot moving along the path */}
            <circle r="3" fill="#FFC107">
              <animateMotion 
                dur="3s" 
                repeatCount="indefinite"
                path={routePath.replace(/([0-9.]+) ([0-9.]+)/g, (match, x, y) => `${x * 8} ${y * 4}`)} // Approximate scaling for SVG coordinate system relative to container is tricky in pure SVG without viewbox, using CSS positioning for markers instead
              />
            </circle>
          </>
        )}
        
        {/* Route: Pickup to Dropoff (Projected) */}
        <motion.path
          d={tripPath.replace(/([0-9.]+) ([0-9.]+)/g, (match, x, y) => `${x}% ${y}%`)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
          style={{ filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.5))' }}
        />
      </svg>

      {/* Markers */}
      
      {/* Pickup Marker */}
      <motion.div
        className="absolute transform -translate-x-1/2 -translate-y-full"
        style={{ left: `${pickupLocation.x}%`, top: `${pickupLocation.y}%` }}
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute -bottom-1 left-1/2 w-4 h-1 bg-black/50 blur-sm transform -translate-x-1/2"></div>
          <MapPin className="w-8 h-8 text-blue-500 drop-shadow-lg fill-blue-500/20" />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500 rounded-full -z-10 blur-md"
          />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/70 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap">
          Pickup
        </div>
      </motion.div>

      {/* Dropoff Marker */}
      <motion.div
        className="absolute transform -translate-x-1/2 -translate-y-full"
        style={{ left: `${dropoffLocation.x}%`, top: `${dropoffLocation.y}%` }}
        initial={{ scale: 0, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
      >
        <div className="relative">
          <div className="absolute -bottom-1 left-1/2 w-4 h-1 bg-black/50 blur-sm transform -translate-x-1/2"></div>
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg fill-red-500/20" />
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/70 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap">
          Dropoff
        </div>
      </motion.div>

      {/* Driver Marker */}
      {showDriver && (
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          initial={{ left: `${driverLocation.x}%`, top: `${driverLocation.y}%` }}
          animate={{ 
            left: [`${driverLocation.x}%`, `${(driverLocation.x + pickupLocation.x)/2}%`, `${pickupLocation.x}%`],
            top: [`${driverLocation.y}%`, `${(driverLocation.y + pickupLocation.y)/2 - 5}%`, `${pickupLocation.y}%`]
          }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.6)] border-2 border-white">
              <CarTaxiFront className="w-5 h-5 text-[#1C1F24]" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 border border-[#FFC107]/50 rounded-full border-dashed"
            />
          </div>
        </motion.div>
      )}

      {/* Info Overlay */}
      {showDriver && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute top-4 right-4 w-64 backdrop-blur-xl bg-[#1C1F24]/80 border border-white/10 rounded-xl p-4 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 bg-[#FFC107]/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">{driverName}</p>
              <div className="flex items-center gap-1">
                <span className="text-[#FFC107] text-xs">★</span>
                <span className="text-white/70 text-xs">{rating} Rating</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <CarTaxiFront className="w-3 h-3" />
                <span>Vehicle</span>
              </div>
              <span className="text-white font-medium text-xs">{carModel}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Navigation className="w-3 h-3" />
                <span>Distance</span>
              </div>
              <span className="text-white font-medium">{distance} km</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-3 h-3" />
                <span>Est. Time</span>
              </div>
              <span className="text-[#FFC107] font-bold">{estimatedTime} min</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MapComponent;