import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Car, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import GlassmorphismCard from '@/components/GlassmorphismCard.jsx';

const LoginSignupPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password, selectedRole);
      } else {
        await signup(email, password, selectedRole);
      }
      
      const redirectPath = selectedRole === 'driver' ? '/driver-dashboard' : '/user-dashboard';
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - SmartTaxi</title>
        <meta name="description" content="Access your SmartTaxi account to optimize your urban mobility experience." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-[#1C1F24] via-[#2A2D35] to-[#1C1F24] flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {isLogin ? 'Welcome Back' : 'Join SmartTaxi'}
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/70"
            >
              {isLogin ? 'Sign in to continue' : 'Create your account'}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <GlassmorphismCard hover={false}>
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Select Your Role</h2>
                  
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect('driver')}
                      className="w-full p-6 bg-gradient-to-r from-[#FFC107]/20 to-[#FFD54F]/20 border-2 border-[#FFC107]/50 rounded-xl hover:border-[#FFC107] transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#FFC107] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Car className="w-7 h-7 text-[#1C1F24]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white mb-1">I'm a Driver</h3>
                          <p className="text-white/70 text-sm">Optimize routes and earnings</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect('user')}
                      className="w-full p-6 bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-2 border-blue-500/50 rounded-xl hover:border-blue-500 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <User className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-white mb-1">I'm a Passenger</h3>
                          <p className="text-white/70 text-sm">Find rides and save money</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <GlassmorphismCard hover={false}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      {isLogin ? 'Sign In' : 'Sign Up'} as {selectedRole === 'driver' ? 'Driver' : 'Passenger'}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRole(null)}
                      className="text-white/70 hover:text-white hover:bg-white/10"
                    >
                      Change
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FFC107] transition-colors"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#FFC107] transition-colors"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                      }}
                      className="text-white/70 hover:text-[#FFC107] transition-colors text-sm"
                    >
                      {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default LoginSignupPage;