import React from 'react';
import { motion } from 'framer-motion';
import { Table, Sparkles, Check, Trophy } from 'lucide-react';
import { MODEL_COMPARISON_TABLE } from '../../constants/models';
import { GlassCard } from '../common/GlassCard';

export function ModelTable() {
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Best':
        return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20';
      case 'Good':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold';
      case 'Baseline':
        return 'bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 font-semibold';
      default:
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-medium';
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8 md:p-10 border border-white/60 dark:border-white/10 relative overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
            <Table className="w-3.5 h-3.5" />
            <span>Benchmark Matrix</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Models Compared
          </h3>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Evaluated on 3,200 test samples (80/20 split)
        </span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 glass-panel">
        <table className="w-full text-left text-sm border-collapse min-w-[550px]">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-white/10 bg-slate-100/60 dark:bg-slate-800/40 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              <th className="py-4 px-5">Model</th>
              <th className="py-4 px-5">Vectorizer</th>
              <th className="py-4 px-5">Accuracy</th>
              <th className="py-4 px-5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-white/5">
            {MODEL_COMPARISON_TABLE.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  row.isBest
                    ? 'bg-indigo-500/10 dark:bg-indigo-600/15 font-semibold relative'
                    : 'hover:bg-slate-100/40 dark:hover:bg-white/5'
                }`}
              >
                {/* Model Column */}
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2.5">
                    {row.isBest && (
                      <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                        ⭐
                      </div>
                    )}
                    <span className={row.isBest ? 'text-indigo-600 dark:text-indigo-300 font-bold text-base' : 'text-slate-900 dark:text-white'}>
                      {row.model}
                    </span>
                  </div>
                </td>

                {/* Vectorizer Column */}
                <td className="py-4 px-5">
                  <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-mono bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {row.vectorizer}
                  </span>
                </td>

                {/* Accuracy Column */}
                <td className="py-4 px-5 font-mono">
                  <span className={`text-sm ${row.isBest ? 'text-indigo-600 dark:text-indigo-400 font-extrabold text-base' : 'text-slate-800 dark:text-slate-200'}`}>
                    {row.accuracy}
                  </span>
                </td>

                {/* Status Badge Column */}
                <td className="py-4 px-5 text-right">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getBadgeStyle(row.status)}`}>
                    {row.badge}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Linear SVM achieves top benchmark performance through calibrated multi-class margins.</span>
        </p>
      </div>
    </GlassCard>
  );
}
