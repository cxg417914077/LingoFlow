import React, { useMemo } from 'react';
import { mockVideoData } from '../mockData';
import { Language, i18n } from '../i18n';
import { BookOpen, Search, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { VocabItem } from '../types';

interface VocabViewProps {
  lang: Language;
}

export function VocabView({ lang }: VocabViewProps) {
  const t = i18n[lang];

  const levelStyles = {
    junior: 'bg-blue-100 text-blue-800',
    high: 'bg-green-100 text-green-800',
    cet4: 'bg-yellow-100 text-yellow-800',
    cet6: 'bg-amber-100 text-amber-800',
    abroad: 'bg-orange-100 text-orange-800',
  };

  const levelLabels = {
    junior: t.juniorHigh,
    high: t.highSchool,
    cet4: t.cet4,
    cet6: t.cet6,
    abroad: t.abroad,
  };

  // Extract and deduplicate all vocabulary from mock data
  const allVocab = useMemo(() => {
    const vocabMap = new Map<string, VocabItem>();
    mockVideoData.subtitles.forEach(sub => {
      if (sub.vocab) {
        sub.vocab.forEach(v => {
          if (!vocabMap.has(v.word.toLowerCase())) {
            vocabMap.set(v.word.toLowerCase(), v);
          }
        });
      }
    });
    return Array.from(vocabMap.values());
  }, []);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clearer pronunciation
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            {t.vocabBook}
          </h1>
          <p className="text-outline mt-2">{t.vocabDesc}</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Search words..." : "搜索单词..."}
            className="pl-10 pr-4 py-2 rounded-full border border-outline-variant/50 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allVocab.map((vocab, index) => (
          <div key={index} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl font-bold font-headline text-on-surface">{vocab.word}</h3>
              <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider', levelStyles[vocab.level])}>
                {levelLabels[vocab.level]}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {vocab.phonetic && <span className="text-sm text-outline font-mono">{vocab.phonetic}</span>}
              <button 
                onClick={() => playAudio(vocab.word)}
                className="p-1.5 rounded-full text-outline hover:text-primary hover:bg-primary/10 transition-colors"
                title={lang === 'en' ? "Play pronunciation" : "播放发音"}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-on-surface-variant font-medium mb-3">{vocab.translation}</p>
            <div className="bg-surface-container-low p-3 rounded-xl border-l-2 border-primary/30">
              <p className="text-sm text-outline italic">"{vocab.example}"</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
