import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Table, BarChart3, Code, CheckCircle2 } from 'lucide-react';
import { DatasetCard } from '../components/model/DatasetCard';
import { PipelineTimeline } from '../components/model/PipelineTimeline';
import { ModelTable } from '../components/model/ModelTable';
import { AccuracyChart } from '../components/model/AccuracyChart';
import { TechStackGrid } from '../components/model/TechCard';
import { SectionHeading } from '../components/common/SectionHeading';

export function ModelInfoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16 md:space-y-24">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider glass-pill border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Architecture & Benchmarks</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Model Specifications & <span className="gradient-text">Evaluation</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Comprehensive breakdown of dataset preprocessing, TF-IDF vectorization parameters, benchmark comparison matrix, and accuracy visualizations.
        </p>
      </div>

      {/* 1. Dataset Card Section */}
      <section>
        <DatasetCard />
      </section>

      {/* 2. Preprocessing Pipeline Timeline */}
      <section>
        <PipelineTimeline />
      </section>

      {/* 3. Model Comparison Table */}
      <section>
        <ModelTable />
      </section>

      {/* 4. Accuracy Visualization Bar Chart */}
      <section>
        <AccuracyChart />
      </section>

      {/* 5. Technology Stack Cards */}
      <section className="space-y-8">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
            <Code className="w-3.5 h-3.5" />
            <span>Tools & Ecosystem</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Technology Stack
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Open-source machine learning libraries and modern reactive UI engineering components powering the application.
          </p>
        </div>

        <TechStackGrid />
      </section>
    </div>
  );
}
