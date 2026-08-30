import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowUp, CheckCircle2, FileCode, Cpu, Layers } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-slate-200/80 dark:border-white/10 glass-panel bg-white/40 dark:bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Model Details & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px] shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[15px] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">EmotionAI NLP</span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Project:</strong> AI Emotion Detection using Natural Language Processing. Real-time classification of 6 primary human emotion states with TF-IDF vectorization.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <p><span className="font-semibold text-slate-900 dark:text-slate-200">Best Model:</span> Linear Support Vector Machine (Linear SVM)</p>
              <p><span className="font-semibold text-slate-900 dark:text-slate-200">Vectorizer:</span> TF-IDF (n-gram 1-2, sublinear)</p>
              <p><span className="font-semibold text-slate-900 dark:text-slate-200">Dataset:</span> Emotion Dataset (train.txt - 16,000 samples)</p>
            </div>
          </div>

          {/* Column 2: Text Preprocessing Pipeline */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span>Text Preprocessing</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Lowercase conversion</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Remove punctuation symbols</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Remove numerical digits (regex)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Remove emojis & non-ASCII characters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Remove English stopwords (NLTK 198 words)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>TF-IDF feature extraction & sublinear scaling</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Models Evaluated & Serialized Files */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Evaluated Models</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="font-semibold text-indigo-600 dark:text-indigo-400">⭐ Linear SVM (Champion Model)</li>
              <li>&bull; Logistic Regression (max_iter=1000)</li>
              <li>&bull; SGD Classifier (Log-loss)</li>
              <li>&bull; Random Forest Classifier (200 Trees)</li>
              <li>&bull; Multinomial Naive Bayes</li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mt-5 mb-2 flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-cyan-500" />
              <span>Saved Checkpoints</span>
            </h4>
            <div className="space-y-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              <div className="bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-white/5">
                best_nlp_model.pkl
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-white/5">
                tfidf_vectorizer.pkl
              </div>
            </div>
          </div>

          {/* Column 4: Built With & Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Built With
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['React + Vite', 'Tailwind CSS', 'Framer Motion', 'Scikit-learn', 'NLTK', 'Recharts', 'Joblib', 'Flask REST API'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">Connect & Repository</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="p-2.5 rounded-xl glass-pill hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-xl glass-pill hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToTop}
                  aria-label="Back to top"
                  className="ml-auto p-2.5 rounded-xl glass-pill text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-500/10 transition-colors"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AI Emotion Detection using NLP. Production-ready ML frontend architecture.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Home</Link>
            <Link to="/predict" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Predict</Link>
            <Link to="/model-info" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Model Specs</Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
