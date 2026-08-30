import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, CheckCircle, Share2, TrendingUp } from 'lucide-react';
import { EMOTIONS } from '../../constants/emotions';
import { GradientButton } from '../common/GradientButton';

export function ResultCard({ result, onReset }) {
  if (!result) return null;

  const { emotion, confidence, probabilities = {}, cleanedText, source } = result;
  const emoConfig = EMOTIONS[emotion.toLowerCase()] || EMOTIONS.joy;

  // Trigger celebratory confetti if high confidence positive emotion
  useEffect(() => {
    if (confidence > 80 && (emotion === 'joy' || emotion === 'love' || emotion === 'surprise')) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: [emoConfig.accentHex, '#6366f1', '#a855f7'],
          disableForReducedMotion: true
        });
      } catch (e) {
        // Safe fail
      }
    }
  }, [emotion, confidence]);

  const emotionList = Object.keys(EMOTIONS);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border transition-all duration-500 overflow-hidden shadow-2xl ${emoConfig.bgLight} ${emoConfig.bgDark} ${emoConfig.borderLight} ${emoConfig.borderDark}`}
      style={{
        boxShadow: `0 20px 50px -15px ${emoConfig.glowColor}`,
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: emoConfig.accentHex }}
      />

      <div className="relative z-10 space-y-6">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider glass-pill border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: emoConfig.accentHex }}></span>
            <span>Predicted Classification</span>
          </div>

          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {source === 'backend' ? '⚡ Live ML Engine' : '🔮 Model Inference'}
          </span>
        </div>

        {/* Emotion Core Result */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-2">
          {/* Big Emoji Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl shadow-xl border ${emoConfig.bgLight} ${emoConfig.borderLight}`}
          >
            {emoConfig.emoji}
          </motion.div>

          {/* Emotion Name & Confidence */}
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white capitalize">
                {emoConfig.name}
              </h3>
              <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-lg inline-block self-center sm:self-auto ${emoConfig.bgLight} ${emoConfig.textLight} ${emoConfig.textDark} border ${emoConfig.borderLight}`}>
                Color Theme: {emoConfig.colorName}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
              {emoConfig.description}
            </p>

            {/* Confidence Number */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {confidence}%
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Confidence Score</span>
            </div>
          </div>
        </div>

        {/* Animated Confidence Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Model Certainty</span>
            <span>{confidence}%</span>
          </div>
          <div className="w-full h-3 bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className={`h-full rounded-full ${emoConfig.progressBg} shadow-sm`}
              style={{
                boxShadow: `0 0 12px ${emoConfig.accentHex}`
              }}
            />
          </div>
        </div>

        {/* 6-Emotion Spectrum Probability Breakdown */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Full Multi-Class Probability Spectrum</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {emotionList.map((emoKey) => {
              const itemConfig = EMOTIONS[emoKey];
              const probVal = probabilities[emoKey] ?? (emoKey === emotion ? confidence : 2.5);
              const isSelected = emoKey === emotion.toLowerCase();

              return (
                <div
                  key={emoKey}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isSelected
                      ? `${itemConfig.bgLight} ${itemConfig.bgDark} ${itemConfig.borderLight} ${itemConfig.borderDark} ring-1 ring-indigo-500/40 font-semibold shadow-sm`
                      : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/50 dark:border-white/5 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1">
                      <span>{itemConfig.emoji}</span>
                      <span className="capitalize">{itemConfig.name}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{probVal}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${probVal}%` }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={`h-full rounded-full ${itemConfig.progressBg}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reset Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {cleanedText && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">Cleaned:</span> "{cleanedText}"
            </p>
          )}

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto ml-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another Text</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
