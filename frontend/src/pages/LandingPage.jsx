import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { Hero } from '../components/landing/Hero';
import { FeatureCard, FEATURES } from '../components/landing/FeatureCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { GradientButton } from '../components/common/GradientButton';
import { GlassCard } from '../components/common/GlassCard';
import { EMOTIONS } from '../constants/emotions';

export function LandingPage() {
  const emotionKeys = Object.keys(EMOTIONS);

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Supported Emotions Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="p-6 md:p-8 border border-white/60 dark:border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Emotional Spectrum
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                6 Primary Human Emotion Dimensions
              </h3>
            </div>

            {/* 6 Emoji Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {emotionKeys.map((emoKey) => {
                const emo = EMOTIONS[emoKey];
                return (
                  <div
                    key={emo.id}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs sm:text-sm font-semibold transition-transform hover:scale-105 ${emo.bgLight} ${emo.bgDark} ${emo.borderLight} ${emo.borderDark} ${emo.textLight} ${emo.textDark}`}
                  >
                    <span className="text-base sm:text-lg">{emo.emoji}</span>
                    <span className="capitalize">{emo.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 3. Four Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Architecture Highlights"
          title="Engineered for Precision & Speed"
          subtitle="A high-performance pipeline combining statistical linguistics with maximum-margin classification."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={feature.title} feature={feature} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. Interactive Call-To-Action Glass Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard className="relative p-8 md:p-14 rounded-3xl border border-indigo-500/30 overflow-hidden text-center bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-cyan-500/10">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Live Testing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Test Any Sentence with the <br />
              <span className="gradient-text">Trained Linear SVM Model</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Experience the fast, calibrated NLP classifier directly in your browser. Type your text or pick a sample to get instant emotional breakdowns.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton
                to="/predict"
                size="lg"
                variant="primary"
                icon={Zap}
                className="w-full sm:w-auto text-base"
              >
                <span>Launch Emotion Predictor</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </GradientButton>

              <GradientButton
                to="/model-info"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto text-base"
              >
                <span>Explore Technical Specs</span>
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
