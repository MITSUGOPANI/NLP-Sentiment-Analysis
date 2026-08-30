import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Background base mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100/80 to-slate-50 dark:from-[#090d16] dark:via-[#0c1220] dark:to-[#090d16] transition-colors duration-500" />

      {/* Ambient Orb 1: Indigo Top-Left */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-24 w-96 h-96 md:w-[550px] md:h-[550px] bg-indigo-500/15 dark:bg-indigo-600/12 rounded-full blur-[120px]"
      />

      {/* Ambient Orb 2: Purple Right */}
      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-24 w-96 h-96 md:w-[600px] md:h-[600px] bg-purple-500/15 dark:bg-purple-600/12 rounded-full blur-[130px]"
      />

      {/* Ambient Orb 3: Cyan Bottom-Center */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 left-1/4 w-80 h-80 md:w-[500px] md:h-[500px] bg-cyan-500/15 dark:bg-cyan-600/10 rounded-full blur-[110px]"
      />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#6366f1 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
