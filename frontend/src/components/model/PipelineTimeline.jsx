import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Type, Scissors, Hash, Smile, Filter, Cpu, ArrowRight, ArrowDown } from 'lucide-react';
import { PREPROCESSING_PIPELINE } from '../../constants/models';
import { GlassCard } from '../common/GlassCard';

const STEP_ICONS = {
  LuFileText: FileText,
  LuCaseLower: Type,
  LuType: Type,
  LuScissors: Scissors,
  LuHash: Hash,
  LuSmile: Smile,
  LuFilter: Filter,
  LuCpu: Cpu
};

export function PipelineTimeline() {
  return (
    <GlassCard className="p-6 sm:p-8 md:p-10 border border-white/60 dark:border-white/10 relative overflow-hidden">
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>NLP Sequence</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Preprocessing Pipeline
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Sequential NLP text transformation pipeline executed before feature ingestion by the ML model.
        </p>
      </div>

      {/* Desktop Horizontal Timeline (Hidden on small screens) */}
      <div className="hidden xl:block relative pt-4 pb-8">
        {/* Connecting Gradient Line */}
        <div className="absolute top-12 left-8 right-8 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full z-0 opacity-60" />

        <div className="grid grid-cols-7 gap-3 relative z-10">
          {PREPROCESSING_PIPELINE.map((item, idx) => {
            const Icon = STEP_ICONS[item.icon] || FileText;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Node Step Circle */}
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center border-2 border-indigo-500/40 group-hover:border-indigo-500 group-hover:scale-110 shadow-lg shadow-indigo-500/10 transition-all duration-300 bg-white/90 dark:bg-slate-900/90 mb-4 relative">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-500 transition-colors" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-[10px] font-extrabold text-white flex items-center justify-center shadow-md">
                    {item.step}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Timeline (Visible on < xl screens) */}
      <div className="xl:hidden relative pl-6 sm:pl-8 space-y-6 pt-2">
        {/* Vertical gradient connecting line */}
        <div className="absolute top-4 bottom-4 left-3 sm:left-4 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 rounded-full opacity-60" />

        {PREPROCESSING_PIPELINE.map((item, idx) => {
          const Icon = STEP_ICONS[item.icon] || FileText;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="relative flex items-start gap-4 group"
            >
              {/* Vertical timeline node indicator */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-8 h-8 rounded-xl glass-card flex items-center justify-center border border-indigo-500/50 bg-white dark:bg-slate-900 shadow-md">
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">{item.step}</span>
              </div>

              {/* Step Detail Card */}
              <div className="flex-1 glass-panel p-4 rounded-2xl border border-white/50 dark:border-white/5 group-hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-2.5 mb-1">
                  <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
