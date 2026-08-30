import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function GradientButton({
  children,
  to,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'glass' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  isLoading = false,
  loadingText = 'Processing...',
  icon: Icon,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-medium rounded-xl',
    md: 'px-6 py-3 text-sm font-semibold rounded-xl md:rounded-2xl',
    lg: 'px-8 py-4 text-base font-semibold rounded-2xl',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-white/20',
    secondary:
      'glass-pill hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md',
    glass:
      'glass-card hover:bg-white/90 dark:hover:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20',
  };

  const baseClasses = `relative inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 select-none overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled || isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const buttonContent = (
    <>
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />}
          <span>{children}</span>
        </>
      )}
    </>
  );

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Link to={to} className={baseClasses} {...props}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={baseClasses}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
}
