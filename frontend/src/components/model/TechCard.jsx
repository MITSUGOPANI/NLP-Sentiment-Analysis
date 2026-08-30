import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaReact } from 'react-icons/fa';
import { SiScikitlearn, SiTailwindcss, SiFramer } from 'react-icons/si';
import { BookOpen, Binary, HardDrive, Sparkles } from 'lucide-react';
import { TECHNOLOGIES } from '../../constants/technologies';
import { GlassCard } from '../common/GlassCard';

const TECH_ICONS = {
  FaPython,
  SiScikitlearn,
  LuBookOpen: BookOpen,
  LuBinary: Binary,
  FaReact,
  SiTailwindcss,
  LuHardDrive: HardDrive,
  SiFramer
};

export function TechCard({ tech, index }) {
  const Icon = TECH_ICONS[tech.icon] || Sparkles;

  return (
    <GlassCard
      delay={index * 0.07}
      glowColor={tech.bgGlow}
      className="group p-6 rounded-2xl md:rounded-3xl border border-white/60 dark:border-white/10 hover:border-indigo-500/40 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{ backgroundColor: `${tech.color}15`, border: `1px solid ${tech.color}30` }}
          >
            <Icon className="w-6 h-6" style={{ color: tech.color }} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            {tech.category}
          </span>
        </div>

        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {tech.name}
        </h4>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {tech.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span>Production Stack</span>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
      </div>
    </GlassCard>
  );
}

export function TechStackGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {TECHNOLOGIES.map((tech, idx) => (
        <TechCard key={tech.name} tech={tech} index={idx} />
      ))}
    </div>
  );
}
