import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import GlassmorphismCard from '@/components/GlassmorphismCard.jsx';

const StatCard = ({ title, value, suffix = '', prefix = '', icon: Icon, trend, color = '#FFC107' }) => {
  return (
    <GlassmorphismCard>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/70 text-sm font-medium mb-2">{title}</p>
          <div className="text-3xl font-bold text-white mb-1">
            <AnimatedCounter value={value} suffix={suffix} prefix={prefix} />
          </div>
          {trend && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from yesterday
            </motion.p>
          )}
        </div>
        {Icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </motion.div>
        )}
      </div>
    </GlassmorphismCard>
  );
};

export default StatCard;