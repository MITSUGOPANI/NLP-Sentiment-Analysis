import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, PieChart, Split, Layers, CheckCheck } from 'lucide-react';
import { DATASET_STATS } from '../../constants/models';
import { GlassCard } from '../common/GlassCard';

export function DatasetCard() {
  return (
    <GlassCard className="p-6 sm:p-8 md:p-10 border border-white/60 dark:border-white/10 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Corpus Specifications</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Dataset Used
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold">{DATASET_STATS.file}</span>
            <span className="text-slate-400">&bull;</span>
            <span>{DATASET_STATS.totalSamples.toLocaleString()} samples</span>
          </div>
        </div>

        {/* 4 Stat Mini Glass Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/50 dark:border-white/5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Rows</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">16,000</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Semicolon-separated</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/50 dark:border-white/5">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Emotions</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">6 Classes</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Full human range</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/50 dark:border-white/5">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
              <Split className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Split Ratio</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">80 / 20</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Train: 12,800 | Test: 3,200</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/50 dark:border-white/5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <CheckCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Stratified</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Balanced</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Seed 42 Reproducible</p>
          </div>
        </div>

        {/* Visual Dataset Sample Rows & Class Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Sample Rows Illustration */}
          <div className="lg:col-span-7 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              Raw Sample Extracts (train.txt)
            </h4>

            {[
              { text: "i feel strong and good overall", emotion: "joy", num: "5", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
              { text: "i can go from feeling so hopeless to so damned...", emotion: "sadness", num: "0", color: "text-blue-600 dark:text-blue-400 bg-blue-500/10" },
              { text: "im grabbing a minute to post i feel greedy wrong", emotion: "anger", num: "1", color: "text-red-600 dark:text-red-400 bg-red-500/10" },
              { text: "i am ever feeling nostalgic about the fireplace...", emotion: "love", num: "2", color: "text-pink-600 dark:text-pink-400 bg-pink-500/10" }
            ].map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center justify-between p-3 rounded-xl glass-panel text-xs font-mono border border-slate-200/60 dark:border-white/5 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 truncate mr-3">
                  <span className="text-slate-400 font-bold">[{idx}]</span>
                  <span className="text-slate-800 dark:text-slate-200 truncate">"{row.text}"</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded-md font-semibold ${row.color}`}>
                    {row.emotion}
                  </span>
                  <span className="text-slate-400">id: {row.num}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Class Breakdown Bars */}
          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-white/50 dark:border-white/5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Class Proportions</span>
              <span className="text-slate-400 font-normal">16,000 rows</span>
            </h4>

            <div className="space-y-2 pt-1">
              {DATASET_STATS.classBreakdown.map((item) => (
                <div key={item.emotion} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{item.emotion}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{item.count.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.percentage * 2.8}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </GlassCard>
  );
}
