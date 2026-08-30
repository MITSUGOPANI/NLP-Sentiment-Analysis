import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';
import { ACCURACY_CHART_DATA } from '../../constants/models';
import { GlassCard } from '../common/GlassCard';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-3.5 rounded-xl border border-white/60 dark:border-white/10 shadow-xl text-xs space-y-1">
        <p className="font-bold text-slate-900 dark:text-white">{data.name}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm">
          Accuracy: {data.accuracy}%
        </p>
        <p className="text-slate-500 dark:text-slate-400">
          Feature: {data.vectorizer}
        </p>
        {data.isBest && (
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-slate-950">
            ⭐ Champion Model
          </span>
        )}
      </div>
    );
  }
  return null;
}

export function AccuracyChart() {
  return (
    <GlassCard className="p-6 sm:p-8 md:p-10 border border-white/60 dark:border-white/10 relative overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Visual Analytics</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Accuracy Visualization
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20">
          <TrendingUp className="w-4 h-4" />
          <span>Top Score: 89.72% (Linear SVM)</span>
        </div>
      </div>

      {/* Recharts Bar Chart Container */}
      <div className="w-full h-80 sm:h-96 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ACCURACY_CHART_DATA}
            margin={{ top: 20, right: 20, left: -10, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(148, 163, 184, 0.2)"
            />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              interval={0}
              angle={-20}
              textAnchor="end"
              tickLine={false}
              axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
            />
            <YAxis
              domain={[50, 100]}
              stroke="#94a3b8"
              fontSize={11}
              tickFormatter={(val) => `${val}%`}
              tickLine={false}
              axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="accuracy"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            >
              <LabelList
                dataKey="accuracy"
                position="top"
                formatter={(val) => `${val}%`}
                fill="#6366f1"
                fontSize={11}
                fontWeight="bold"
                offset={8}
              />
              {ACCURACY_CHART_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isBest ? '#6366f1' : entry.fill}
                  style={
                    entry.isBest
                      ? {
                          filter: 'drop-shadow(0 4px 12px rgba(99, 102, 241, 0.6))',
                        }
                      : {}
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <p>
          Benchmarked using Scikit-Learn across 16,000 text samples with stratified 80/20 train/test evaluation.
        </p>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Metric: Multiclass Accuracy
        </span>
      </div>
    </GlassCard>
  );
}
