import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Activity, Info, CheckCircle2, Radio } from 'lucide-react';
import { PredictionCard } from '../components/prediction/PredictionCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { GlassCard } from '../components/common/GlassCard';
import { EMOTIONS } from '../constants/emotions';
import { checkBackendHealth } from '../services/emotionApi';

export function PredictionPage() {
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(true);

  useEffect(() => {
    async function checkHealth() {
      const isOnline = await checkBackendHealth();
      setIsBackendOnline(isOnline);
      setCheckingHealth(false);
    }
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const emotionList = Object.values(EMOTIONS);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 md:space-y-16">
      {/* Top Heading */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider glass-pill border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Machine Learning Console</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Real-Time <span className="gradient-text">Emotion Prediction</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Type or paste any text to classify its underlying human emotion using our trained Linear Support Vector Machine and TF-IDF pipeline.
        </p>

        {/* Real-time Backend Status Pill */}
        <div className="pt-2 flex items-center justify-center">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono border transition-all ${
            isBackendOnline
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`} />
            <span>
              {checkingHealth
                ? 'Connecting to ML Engine...'
                : isBackendOnline
                ? 'Backend Live: Flask API Connected (127.0.0.1:5000)'
                : 'ML Model Ready (Local Model Simulation Active)'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Large Centered Prediction Card */}
      <PredictionCard />

      {/* 6 Emotion Classes Reference Section */}
      <section className="pt-8">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Supported Emotion Archetypes
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            The multi-class classifier is trained to differentiate between these 6 distinct affective states.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {emotionList.map((emo, idx) => (
            <GlassCard
              key={emo.id}
              delay={idx * 0.05}
              className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${emo.bgLight} ${emo.bgDark} ${emo.borderLight} ${emo.borderDark}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="text-3xl sm:text-4xl p-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/50 dark:border-white/10 shadow-sm flex-shrink-0">
                  {emo.emoji}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                      {emo.name}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${emo.bgLight} ${emo.textLight} ${emo.textDark} border ${emo.borderLight}`}>
                      {emo.colorName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {emo.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
