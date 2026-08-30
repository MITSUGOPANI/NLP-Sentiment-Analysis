import React from 'react';
import { EMOTIONS } from '../../constants/emotions';

export function EmotionBadge({ emotion = 'joy', showEmoji = true, size = 'md' }) {
  const emoConfig = EMOTIONS[emotion.toLowerCase()] || EMOTIONS.joy;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 rounded-lg font-medium gap-1',
    md: 'text-sm px-3.5 py-1 rounded-xl font-semibold gap-1.5',
    lg: 'text-base px-4 py-1.5 rounded-2xl font-bold gap-2',
  };

  return (
    <span
      className={`inline-flex items-center border transition-all duration-300 ${sizeClasses[size]} ${emoConfig.bgLight} ${emoConfig.bgDark} ${emoConfig.borderLight} ${emoConfig.borderDark} ${emoConfig.textLight} ${emoConfig.textDark}`}
    >
      {showEmoji && <span className="text-base leading-none">{emoConfig.emoji}</span>}
      <span className="capitalize">{emoConfig.name}</span>
    </span>
  );
}
