import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import LandingPage from '@/pages/LandingPage.jsx';
import LoginSignupPage from '@/pages/LoginSignupPage.jsx';
import DriverDashboard from '@/pages/DriverDashboard.jsx';
import UserDashboard from '@/pages/UserDashboard.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginSignupPage />} />
                <Route
                  path="/driver-dashboard"
                  element={
                    <ProtectedRoute requiredRole="driver">
                      <DriverDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-dashboard"
                  element={
                    <ProtectedRoute requiredRole="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;