import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CarTaxiFront as Taxi, LogOut, Home, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#1C1F24]/90 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center"
            >
              <Taxi className="w-6 h-6 text-[#1C1F24]" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-[#FFC107] transition-colors">
                SmartTaxi
              </h1>
              <p className="text-xs text-white/60">Intelligence for Urban Mobility</p>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/">
                  <Button variant="ghost" className="text-white hover:text-[#FFC107] hover:bg-white/10">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link to={user?.role === 'driver' ? '/driver-dashboard' : '/user-dashboard'}>
                  <Button variant="ghost" className="text-white hover:text-[#FFC107] hover:bg-white/10">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:text-red-400 hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-[#FFC107] text-[#1C1F24] hover:bg-[#FFD54F] font-semibold">
                  Enter Platform
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;