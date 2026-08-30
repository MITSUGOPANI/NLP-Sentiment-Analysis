import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function DarkModeToggle({ isDark, toggleDarkMode, className = '' }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleDarkMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300
        glass-pill hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className={isDark ? 'hidden' : 'block'}
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={isDark ? 'block' : 'hidden'}
      >
        <Moon className="w-5 h-5 text-indigo-400" />
      </motion.div>
    </motion.button>
  );
}
