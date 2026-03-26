import React, { useState } from 'react';
import { VocabItem } from '../types';
import { cn } from '../lib/utils';

interface VocabHighlightProps {
  vocab: VocabItem;
  children: React.ReactNode;
}

export function VocabHighlight({ vocab, children }: VocabHighlightProps) {
  const [isHovered, setIsHovered] = useState(false);

  const levelStyles = {
    junior: 'bg-blue-100 text-blue-800',
    high: 'bg-green-100 text-green-800',
    cet46: 'bg-yellow-100 text-yellow-800',
    abroad: 'bg-orange-100 text-orange-800',
  };

  const levelLabels = {
    junior: 'Junior High',
    high: 'High School',
    cet46: 'CET-4/6',
    abroad: 'Abroad',
  };

  return (
    <span 
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn('px-1 rounded font-medium transition-colors', levelStyles[vocab.level])}>
        {children}
      </span>
      
      {isHovered && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 block text-left">
          <span className="flex justify-between items-start mb-2">
            <span className="font-headline font-bold text-on-surface">{vocab.word}</span>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider', levelStyles[vocab.level])}>
              {levelLabels[vocab.level]}
            </span>
          </span>
          <span className="text-sm text-on-surface-variant mb-2 block">{vocab.translation}</span>
          <span className="text-xs text-outline italic border-l-2 border-primary/30 pl-2 block">
            "{vocab.example}"
          </span>
          {/* Decorative arrow */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest border-b border-r border-outline-variant/30 rotate-45 block"></span>
        </span>
      )}
    </span>
  );
}
