import React, { useEffect, useRef } from 'react';
import { Subtitle, VocabItem } from '../types';
import { VocabHighlight } from './VocabHighlight';
import { cn } from '../lib/utils';
import { PlayCircle, Volume2, AlignLeft } from 'lucide-react';
import { i18n, Language } from '../i18n';

export type SubtitleMode = 'bilingual' | 'en' | 'zh' | 'off';

interface SubtitlePanelProps {
  subtitles: Subtitle[];
  currentTime: number;
  mode: SubtitleMode;
  lang: Language;
  onSeek: (time: number) => void;
}

export function SubtitlePanel({ subtitles, currentTime, mode, lang, onSeek }: SubtitlePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const t = i18n[lang];

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      const container = containerRef.current;
      const active = activeRef.current;
      
      // Calculate the scroll position to center the active item within the container
      const scrollPos = active.offsetTop - (container.clientHeight / 2) + (active.clientHeight / 2);
      
      container.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderTextWithVocab = (text: string, vocabList: VocabItem[]) => {
    if (!vocabList || vocabList.length === 0) return text;

    let result: React.ReactNode[] = [text];

    vocabList.forEach(vocab => {
      const newResult: React.ReactNode[] = [];
      result.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${vocab.word})`, 'gi');
          const split = part.split(regex);
          split.forEach((s, i) => {
            if (s.toLowerCase() === vocab.word.toLowerCase()) {
              newResult.push(<VocabHighlight key={`${vocab.word}-${i}`} vocab={vocab}>{s}</VocabHighlight>);
            } else if (s) {
              newResult.push(s);
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return result;
  };

  if (mode === 'off') {
    return (
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm h-full flex flex-col items-center justify-center text-outline">
        <AlignLeft className="w-12 h-12 mb-4 opacity-50" />
        <p>Subtitles are turned off.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col h-[calc(100vh-8rem)] min-h-[600px]">
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest z-10">
        <h3 className="font-headline font-extrabold text-lg flex items-center gap-2">
          <AlignLeft className="text-primary w-5 h-5" /> {t.interactiveTranscript}
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{t.juniorHigh}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-200"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{t.cet46}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-200"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{t.abroad}</span>
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {subtitles.map((sub) => {
          const isActive = currentTime >= sub.startTime && currentTime < sub.endTime;
          
          return (
            <div
              key={sub.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSeek(sub.startTime)}
              className={cn(
                "p-4 rounded-lg transition-all cursor-pointer group flex gap-4",
                isActive 
                  ? "bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary" 
                  : "hover:bg-surface-container-low border-l-4 border-transparent"
              )}
            >
              <span className={cn(
                "text-xs font-bold font-headline w-12 pt-1",
                isActive ? "text-primary" : "text-outline"
              )}>
                {formatTime(sub.startTime)}
              </span>
              
              <div className="flex-1">
                {(mode === 'bilingual' || mode === 'en') && (
                  <div className={cn(
                    "text-base leading-relaxed",
                    isActive ? "font-bold text-on-surface" : "font-medium text-on-surface"
                  )}>
                    {renderTextWithVocab(sub.en, sub.vocab)}
                  </div>
                )}
                
                {(mode === 'bilingual' || mode === 'zh') && (
                  <p className={cn(
                    "text-sm mt-1",
                    isActive ? "text-primary font-medium" : "text-outline font-normal"
                  )}>
                    {sub.zh}
                  </p>
                )}
              </div>
              
              <div className="w-6 flex items-start justify-end pt-1">
                {isActive ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
