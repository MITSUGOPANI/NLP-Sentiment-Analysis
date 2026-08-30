import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ClipboardPaste, Trash2, Send, AlertCircle, Lightbulb, Check } from 'lucide-react';
import { predictEmotion } from '../../services/emotionApi';
import { SAMPLE_TEXTS, EMOTIONS } from '../../constants/emotions';
import { ResultCard } from './ResultCard';
import { GradientButton } from '../common/GradientButton';

const MAX_CHAR_LIMIT = 500;

export function PredictionCard() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter a sentence or paragraph to classify.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await predictEmotion(trimmed);
      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to generate prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setError(null);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText.slice(0, MAX_CHAR_LIMIT));
        setError(null);
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      }
    } catch (err) {
      setError('Clipboard access was blocked by the browser. Please type or paste manually.');
    }
  };

  const handleSampleClick = (sampleText) => {
    setText(sampleText);
    setError(null);
  };

  const handleReset = () => {
    setResult(null);
    setText('');
    setError(null);
  };

  const charsRemaining = MAX_CHAR_LIMIT - text.length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultCard key="result" result={result} onReset={handleReset} />
        ) : (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/60 dark:border-white/10 relative overflow-hidden"
          >
            {/* Ambient inner gradient highlight */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

            <div className="space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    Text Emotion Classifier
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Input your statement to extract sentiments using our trained Linear SVM model.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">TF-IDF Vectorized</span>
                </div>
              </div>

              {/* Text Input Section */}
              <form onSubmit={handlePredict} className="space-y-4">
                <div className="relative">
                  <label htmlFor="emotion-text-input" className="sr-only">
                    Text to analyze emotion
                  </label>
                  <textarea
                    id="emotion-text-input"
                    rows={4}
                    value={text}
                    maxLength={MAX_CHAR_LIMIT}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Type something like: I am feeling very happy today..."
                    className="w-full p-4 sm:p-5 rounded-2xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all duration-200"
                  />

                  {/* Character counter */}
                  <div className="absolute bottom-3 right-4 text-xs font-mono text-slate-400 dark:text-slate-500">
                    <span className={charsRemaining < 20 ? 'text-amber-500 font-bold' : ''}>
                      {text.length}
                    </span>
                    /{MAX_CHAR_LIMIT}
                  </div>
                </div>

                {/* Input Utility Controls (Paste, Clear) */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-pill hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors"
                      title="Paste from clipboard"
                    >
                      {pasteSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Pasted!</span>
                        </>
                      ) : (
                        <>
                          <ClipboardPaste className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Paste</span>
                        </>
                      )}
                    </button>

                    {text.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-pill hover:bg-red-500/10 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Clear input text"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Press Predict or Enter to test
                  </span>
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Large Gradient Predict Button */}
                <div className="pt-2">
                  <GradientButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    loadingText="Analyzing Emotion..."
                    disabled={!text.trim() || isLoading}
                    icon={Sparkles}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/30 text-base sm:text-lg"
                  >
                    <span>Predict Emotion</span>
                  </GradientButton>
                </div>
              </form>

              {/* Sample Phrases Inspiration */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Try Sample Phrases</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SAMPLE_TEXTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSampleClick(sample.text)}
                      className="text-left px-3 py-1.5 rounded-xl text-xs glass-pill hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span className="mr-1.5">{EMOTIONS[sample.emotion]?.emoji}</span>
                      <span className="italic">"{sample.text.slice(0, 42)}..."</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
