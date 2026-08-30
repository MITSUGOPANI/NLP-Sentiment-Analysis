import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  HelpCircle,
  Sparkles,
  Workflow,
  Binary,
  Mic,
  Activity,
  Brain,
  Languages,
  HeartPulse,
  Layers,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { FUTURE_IMPROVEMENTS } from '../constants/technologies';

const FUTURE_ICONS = {
  LuMic: Mic,
  LuAudioWaveform: Activity,
  LuBrain: Brain,
  LuLanguages: Languages,
  LuHeartPulse: HeartPulse
};

export function AboutPage() {
  const concepts = [
    {
      title: 'Problem Statement',
      badge: 'Motivation',
      description:
        'Human emotional expression in digital communication is nuanced, implicit, and heavily contextual. Traditional sentiment analysis only provides simplistic positive/negative polarities, failing to capture discrete affective states like fear, sorrow, excitement, or tenderness essential for empathetic computing.',
      icon: HelpCircle,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      title: 'How NLP Works',
      badge: 'Linguistics',
      description:
        'Natural Language Processing bridges raw human language and statistical machine intelligence. The system normalizes raw text through tokenization, casing, and stopword pruning, turning unstructured character streams into structured multidimensional vector spaces for mathematical separation.',
      icon: Workflow,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Why TF-IDF Feature Extraction?',
      badge: 'Feature Engineering',
      description:
        'Unlike basic Bag-of-Words that counts raw frequency (often biasing towards trivial words), TF-IDF (Term Frequency-Inverse Document Frequency) down-weights universally frequent words and elevates unique emotion-bearing words with sublinear logarithmic scaling.',
      icon: Binary,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Linear Support Vector Machine',
      badge: 'Champion Algorithm',
      description:
        'In sparse high-dimensional TF-IDF feature spaces, Linear SVM achieves exceptional generalization by finding the optimal hyperplane with the maximum margin between emotion classes, preventing overfitting and executing inference in under 5 milliseconds.',
      icon: Brain,
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 md:space-y-24">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider glass-pill border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research & Concepts</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About the <span className="gradient-text">Project & Vision</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Understanding the foundational principles of statistical Natural Language Processing and future architectural expansions.
        </p>
      </div>

      {/* Core Concepts Grid */}
      <section className="space-y-6">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Core Foundations
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Key concepts driving the emotion classification architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concepts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.title}
                delay={idx * 0.1}
                className="p-7 rounded-3xl border border-white/60 dark:border-white/10 hover:border-indigo-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.gradient} p-[1px] shadow-md`}>
                      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[15px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-800 dark:text-white" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Future Improvements Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Future Improvements & Expansion
            </h3>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-medium max-w-md">
            ℹ️ <strong>Note:</strong> These items represent planned architectural milestones and future releases, not currently implemented in this version.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_IMPROVEMENTS.map((item, idx) => {
            const Icon = FUTURE_ICONS[item.icon] || Sparkles;
            return (
              <GlassCard
                key={item.id}
                delay={idx * 0.08}
                className="p-6 rounded-3xl border border-white/60 dark:border-white/10 hover:border-purple-500/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                  <span>Planned Architecture</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
