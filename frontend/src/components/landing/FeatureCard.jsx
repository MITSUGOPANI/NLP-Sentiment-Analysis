import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Binary, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const FEATURES = [
  {
    title: 'Emotion Classification',
    description: 'Accurately categorizes emotional sentiment from unstructured text into Joy, Sadness, Anger, Fear, Love, and Surprise.',
    icon: Smile,
    gradient: 'from-indigo-500 to-purple-600',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    tag: 'Core Task'
  },
  {
    title: 'TF-IDF Vectorization',
    description: 'Extracts unigram & bigram features with sublinear term frequency scaling and English stopword filtering for high discriminative power.',
    icon: Binary,
    gradient: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    tag: 'Feature Extraction'
  },
  {
    title: '6 Emotion Classes',
    description: 'Fine-grained emotional spectrum supporting 6 distinct emotional archetypes with calibrated probabilistic confidence distribution.',
    icon: Layers,
    gradient: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    tag: 'Multi-Class Target'
  },
  {
    title: 'Machine Learning Models',
    description: 'Benchmarked across Linear SVM, Logistic Regression, SGD Classifier, Random Forest, and Multinomial Naive Bayes.',
    icon: Cpu,
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    tag: 'Model Benchmark'
  }
];

export function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <GlassCard
      delay={index * 0.1}
      glowColor={feature.glowColor}
      className="group relative flex flex-col justify-between h-full p-7 hover:border-indigo-500/40"
    >
      <div>
        {/* Top Tag & Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.gradient} p-[1px] shadow-md`}>
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[15px] flex items-center justify-center">
              <Icon className="w-6 h-6 text-slate-800 dark:text-white transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
            {feature.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Subtle bottom gradient accent bar */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Explore details</span>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </GlassCard>
  );
}
