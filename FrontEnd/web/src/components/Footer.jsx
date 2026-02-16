import React from 'react';
import { motion } from 'framer-motion';
import { CarTaxiFront as Taxi, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1C1F24] border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center">
                <Taxi className="w-6 h-6 text-[#1C1F24]" />
              </div>
              <span className="text-xl font-bold text-white">SmartTaxi</span>
            </div>
            <p className="text-white/60 text-sm">
              Revolutionizing urban mobility with AI-powered intelligence for taxis and passengers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-white font-semibold mb-4 block">Company</span>
            <ul className="space-y-2">
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">About Us</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Careers</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Press</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Blog</span></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white font-semibold mb-4 block">Support</span>
            <ul className="space-y-2">
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Help Center</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Safety</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Terms of Service</span></li>
              <li><span className="text-white/60 hover:text-[#FFC107] cursor-pointer transition-colors text-sm">Privacy Policy</span></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-white font-semibold mb-4 block">Contact</span>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#FFC107]" />
                <span>contact@smarttaxi.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[#FFC107]" />
                <span>+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#FFC107]" />
                <span>Marrakech, Morocco</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-white/10 mt-8 pt-8 text-center"
        >
          <p className="text-white/60 text-sm">
            © 2026 SmartTaxi. All rights reserved. Powered by AI.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;