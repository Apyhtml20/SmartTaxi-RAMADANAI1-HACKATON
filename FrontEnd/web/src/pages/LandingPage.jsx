import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Car, Route, TrendingUp, Brain, MapPin, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import GlassmorphismCard from '@/components/GlassmorphismCard.jsx';

const LandingPage = () => {
  const problems = [
    {
      icon: Clock,
      title: 'Long Waiting Times',
      description: 'Passengers wait an average of 15-20 minutes for a taxi, leading to frustration and lost time.'
    },
    {
      icon: Car,
      title: 'Empty Taxis',
      description: 'Up to 40% of taxi rides are empty, wasting fuel and increasing operational costs.'
    },
    {
      icon: Route,
      title: 'Redundant Routes',
      description: 'Inefficient routing causes unnecessary emissions and reduces driver earnings.'
    }
  ];

  const solutions = [
    {
      icon: Brain,
      title: 'Demand Prediction',
      description: 'AI analyzes historical data and real-time patterns to predict demand hotspots with 85%+ accuracy.',
      color: '#FFC107'
    },
    {
      icon: MapPin,
      title: 'Intelligent Repositioning',
      description: 'Smart algorithms guide drivers to high-demand zones, reducing empty rides by up to 30%.',
      color: '#FF6B6B'
    },
    {
      icon: Users,
      title: 'Smart Carpool',
      description: 'Match passengers with similar routes to reduce costs, emissions, and traffic congestion.',
      color: '#4ECDC4'
    },
    {
      icon: TrendingUp,
      title: 'Efficiency Index',
      description: 'Real-time performance metrics help drivers optimize earnings while reducing environmental impact.',
      color: '#95E1D3'
    }
  ];

  return (
    <>
      <Helmet>
        <title>SmartTaxi - Intelligence for Urban Mobility</title>
        <meta name="description" content="Optimizing taxis, reducing emissions, improving efficiency with AI-powered urban mobility solutions." />
      </Helmet>

      <div className="min-h-screen bg-[#1C1F24]">
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1695309342594-9ea5e3dae2cd)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1F24]/95 via-[#1C1F24]/90 to-[#FFC107]/20" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 bg-[#FFC107]/20 border border-[#FFC107]/50 rounded-full text-[#FFC107] font-semibold text-sm backdrop-blur-sm">
                AI-Powered Urban Mobility
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              SmartTaxi – Intelligence for{' '}
              <span className="text-[#FFC107]">Urban Mobility</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            >
              Optimizing taxis, reducing emissions, improving efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-bold text-lg px-12 py-6 rounded-xl shadow-2xl hover:shadow-[#FFC107]/50 transition-all duration-300"
                >
                  Enter Platform
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-[#1C1F24] to-[#2A2D35]">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                The Problem
              </h2>
              <p className="text-xl text-white/70">
                Urban taxi systems face critical inefficiencies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <GlassmorphismCard>
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      >
                        <problem.icon className="w-8 h-8 text-red-400" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                      <p className="text-white/70">{problem.description}</p>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-[#2A2D35] to-[#1C1F24]">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                The AI Solution
              </h2>
              <p className="text-xl text-white/70">
                Intelligent algorithms that transform urban mobility
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <GlassmorphismCard>
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${solution.color}20` }}
                      >
                        <solution.icon className="w-7 h-7" style={{ color: solution.color }} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                        <p className="text-white/70">{solution.description}</p>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center mt-16"
            >
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-bold text-lg px-12 py-6 rounded-xl shadow-2xl hover:shadow-[#FFC107]/50 transition-all duration-300"
                >
                  Start Optimizing Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-[#1C1F24] to-[#0F1115]">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Leaf className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Reduce CO₂ Emissions by up to 30%
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Join the movement towards sustainable urban transportation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <GlassmorphismCard>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#FFC107] mb-2">30%</p>
                    <p className="text-white/70">Less Empty Rides</p>
                  </div>
                </GlassmorphismCard>
                <GlassmorphismCard>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#FFC107] mb-2">25%</p>
                    <p className="text-white/70">Higher Earnings</p>
                  </div>
                </GlassmorphismCard>
                <GlassmorphismCard>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#FFC107] mb-2">40%</p>
                    <p className="text-white/70">Faster Pickups</p>
                  </div>
                </GlassmorphismCard>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;