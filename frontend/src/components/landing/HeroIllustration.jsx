import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Sparkles, Cpu, Layers, Smile, Heart, Flame } from 'lucide-react';

export function HeroIllustration() {
  const floatingTags = [
    { text: '😊 Joy', color: 'bg-amber-500/15 border-amber-400/30 text-amber-600 dark:text-amber-300', x: -120, y: -90, delay: 0 },
    { text: '❤️ Love', color: 'bg-pink-500/15 border-pink-400/30 text-pink-600 dark:text-pink-300', x: 120, y: -70, delay: 0.4 },
    { text: '😢 Sadness', color: 'bg-blue-500/15 border-blue-400/30 text-blue-600 dark:text-blue-300', x: -130, y: 70, delay: 0.8 },
    { text: '😨 Fear', color: 'bg-purple-500/15 border-purple-400/30 text-purple-600 dark:text-purple-400', x: 130, y: 60, delay: 1.2 },
    { text: '⚡ Linear SVM 89.7%', color: 'bg-indigo-500/20 border-indigo-400/40 text-indigo-700 dark:text-indigo-300 font-bold', x: 0, y: 135, delay: 0.6 }
  ];

  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Outer Gradient Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-indigo-500/25 dark:border-indigo-400/20"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 rounded-full border border-dotted border-purple-500/30 dark:border-purple-400/25"
      />

      {/* Central Glass Sphere / Glow Orb */}
      <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl animate-pulse-slow" />

      {/* Center AI Brain Core */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-44 h-44 rounded-3xl glass-card flex flex-col items-center justify-center p-6 border border-white/50 dark:border-white/15 shadow-2xl shadow-indigo-500/20"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-[2px] shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Brain className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
        </div>

        <div className="mt-3 text-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            TF-IDF &bull; SVM
          </span>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Natural Language Core</p>
        </div>
      </motion.div>

      {/* Floating Emotion Tags & Badges */}
      {floatingTags.map((tag, idx) => (
        <motion.div
          key={tag.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [tag.x, tag.x + (idx % 2 === 0 ? 6 : -6), tag.x],
            y: [tag.y, tag.y + (idx % 2 === 0 ? -8 : 8), tag.y],
          }}
          transition={{
            opacity: { duration: 0.5, delay: tag.delay },
            scale: { duration: 0.5, delay: tag.delay },
            x: { duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 4.5 + idx, repeat: Infinity, ease: 'easeInOut' },
          }}
          className={`absolute z-20 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg ${tag.color}`}
        >
          {tag.text}
        </motion.div>
      ))}

      {/* Neural Network Nodes & Particle Dots */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-16 w-3 h-3 rounded-full bg-cyan-400 blur-[1px]"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-12 right-14 w-3.5 h-3.5 rounded-full bg-purple-400 blur-[1px]"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-20 right-16 w-2.5 h-2.5 rounded-full bg-amber-400 blur-[1px]"
      />
    </div>
  );
}
