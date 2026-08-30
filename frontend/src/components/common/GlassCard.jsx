import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glowColor,
  animate = true,
  delay = 0,
  onClick,
  ...props
}) {
  const content = (
    <div
      className={`glass-card rounded-2xl md:rounded-3xl p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-glass-hover hover:-translate-y-1 hover:border-indigo-500/30 dark:hover:border-indigo-400/20' : ''
      } ${className}`}
      style={glowColor ? { boxShadow: `0 10px 30px -10px ${glowColor}` } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {content}
    </motion.div>
  );
}
