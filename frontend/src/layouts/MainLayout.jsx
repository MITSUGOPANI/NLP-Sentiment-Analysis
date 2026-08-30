import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { useDarkMode } from '../hooks/useDarkMode';

export function MainLayout() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Layer */}
      <AnimatedBackground />

      {/* Sticky Header */}
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Rich Informational Footer */}
      <Footer />
    </div>
  );
}
