import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, BarChart3, CheckCircle, Zap } from 'lucide-react';
import { GradientButton } from '../common/GradientButton';
import { HeroIllustration } from './HeroIllustration';

export function Hero() {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-indigo-500/30 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold">Production ML Model</span>
              <span className="text-slate-400">&bull;</span>
              <span>89.72% Accuracy</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              AI Emotion Detection <br className="hidden sm:inline" />
              <span className="gradient-text">using Natural Language</span> Processing
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Detect human emotions from text using Machine Learning and TF-IDF. Real-time classification across six core emotional dimensions with confidence scoring.
            </p>

            {/* Highlights List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>6 Emotion Classes</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                <span>Sublinear TF-IDF</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>Linear SVM Champion</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <GradientButton
                to="/predict"
                size="lg"
                variant="primary"
                icon={Zap}
                className="w-full sm:w-auto shadow-xl shadow-indigo-500/25"
              >
                <span>Try Model</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </GradientButton>

              <GradientButton
                to="/model-info"
                size="lg"
                variant="secondary"
                icon={BarChart3}
                className="w-full sm:w-auto"
              >
                <span>View Model Info</span>
              </GradientButton>
            </div>
          </motion.div>

          {/* Right Column: Interactive Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <HeroIllustration />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
