import React from 'react';
import { motion } from 'framer-motion';

const GlassmorphismCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;