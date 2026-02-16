import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Clock, Leaf, Users, TrendingDown, Phone, Share2, XCircle } from 'lucide-react';
import GlassmorphismCard from '@/components/GlassmorphismCard.jsx';
import MapComponent from '@/components/MapComponent.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useToast } from '@/components/ui/use-toast.js';

const MadIcon = ({ className }) => (
  <span className={`font-bold ${className}`}>MAD</span>
);

const UserDashboard = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState(liveTracking.pickupLocation.name);
  const [dropoff, setDropoff] = useState(liveTracking.dropoffLocation.name);
  const [isTracking, setIsTracking] = useState(false);

  const handleRequestRide = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and dropoff locations.",
        variant: "destructive"
      });
      return;
    }

    setIsTracking(true);
    toast({
      title: "Ride Requested!",
      description: "Finding the best driver for you...",
    });
  };

  const handleShareRide = () => {
    toast({
      title: "Carpool Activated!",
      description: "You'll save 20% and reduce emissions. Great choice!",
    });
  };

  return (
    <>
      <Helmet>
        <title>User Dashboard - SmartTaxi</title>
        <meta name="description" content="Request rides, track drivers, and save money with smart carpool options." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#1C1F24] via-[#2A2D35] to-[#1C1F24] pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">User Dashboard</h1>
            <p className="text-white/70">Request rides and track your environmental impact</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            <div className="lg:col-span-2 space-y-6">

              <GlassmorphismCard hover={false}>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#FFC107]" />
                  <h2 className="text-2xl font-bold text-white">
                    {isTracking ? 'Ride in Progress' : 'Request a Ride'}
                  </h2>
                </div>

                {!isTracking ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                        placeholder="Pickup location"
                      />

                      <input
                        type="text"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                        placeholder="Dropoff location"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">

                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <Clock className="w-6 h-6 text-[#FFC107] mx-auto mb-2" />
                        <p className="text-white font-bold">3-5 min</p>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <MadIcon className="text-green-400 mx-auto mb-2" />
                        <p className="text-white font-bold">120-150 MAD</p>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg text-center">
                        <Leaf className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-white font-bold">2.1 kg</p>
                      </div>

                    </div>

                    <Button
                      onClick={handleRequestRide}
                      className="w-full bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-bold py-3"
                    >
                      Request Ride
                    </Button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <MapComponent showDriver={true} />

                    <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline">Contact Driver</Button>
                      <Button variant="outline">Share Trip</Button>
                      <Button variant="outline" onClick={() => setIsTracking(false)}>
                        Cancel Ride
                      </Button>
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>

            {/* SMART CARPOOL */}
            <div className="space-y-6">

              <GlassmorphismCard>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Smart Carpool</h3>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg mb-4">

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Original Fare</span>
                    <span className="text-white line-through">150 MAD</span>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Carpool Fare</span>
                    <span className="text-green-400 font-bold">120 MAD</span>
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-white/70">CO₂ Saved</span>
                    <span className="text-blue-400 font-bold">1.5 kg</span>
                  </div>

                  <Button
                    onClick={handleShareRide}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Enable Carpool
                  </Button>
                </div>

              </GlassmorphismCard>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;