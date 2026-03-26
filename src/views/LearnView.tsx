import React, { useState, useMemo } from 'react';
import { VideoPlayer } from '../components/VideoPlayer';
import { SubtitlePanel, SubtitleMode } from '../components/SubtitlePanel';
import { mockVideoData } from '../mockData';
import { Language, i18n } from '../i18n';
import { cn } from '../lib/utils';
import { PlayCircle, BookOpen, ArrowRight } from 'lucide-react';
import { VocabItem } from '../types';

interface LearnViewProps {
  lang: Language;
}

export function LearnView({ lang }: LearnViewProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState<number | null>(null);
  const [mode, setMode] = useState<SubtitleMode>('bilingual');
  const [isPreStudy, setIsPreStudy] = useState(true);
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

  // Extract vocab for current video
  const videoVocab = useMemo(() => {
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

  const handleSeek = (time: number) => {
    setSeekTime(time);
    // Reset seekTime after a short delay so it can be triggered again
    setTimeout(() => setSeekTime(null), 100);
  };

  if (isPreStudy) {
    return (
      <main className="pt-24 pb-12 px-8 max-w-screen-lg mx-auto min-h-screen flex flex-col">
        <div className="flex-1 bg-surface-container-lowest rounded-3xl shadow-lg border border-outline-variant/20 p-8 md:p-12 flex flex-col">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-3">
              {t.preStudyTitle}
            </h1>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              {t.preStudyDesc}
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar mb-8">
            {videoVocab.map((vocab, idx) => (
              <div key={idx} className="bg-surface-container-low p-4 rounded-xl flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-headline font-bold text-lg text-on-surface">{vocab.word}</span>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider', levelStyles[vocab.level])}>
                    {levelLabels[vocab.level]}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">{vocab.translation}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-auto pt-6 border-t border-outline-variant/20">
            <button 
              onClick={() => setIsPreStudy(false)}
              className="bg-primary hover:bg-primary/90 text-on-primary px-8 py-4 rounded-full font-bold font-headline text-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
            >
              {t.startWatching} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Video, Info, Recommended & Flashcards */}
        <div className="lg:col-span-8 space-y-6">
          <VideoPlayer 
            video={mockVideoData} 
            onTimeUpdate={setCurrentTime} 
            seekTime={seekTime}
            mode={mode}
            onModeChange={setMode}
          />

          {/* Video Info & Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface-container-low rounded-xl">
            <div>
              <h1 className="text-2xl font-extrabold font-headline text-on-surface tracking-tight">
                {mockVideoData.description}
              </h1>
              <p className="text-sm text-outline font-medium mt-1">
                Intermediate Level • 24.5k Views • Published 2 days ago
              </p>
            </div>

            {/* Subtitle Mode Switcher */}
            <div className="flex items-center bg-surface-container-highest p-1 rounded-lg self-start md:self-center">
              {(['bilingual', 'en', 'zh', 'off'] as SubtitleMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold font-headline rounded shadow-sm transition-colors",
                    mode === m 
                      ? "bg-white text-primary" 
                      : "text-outline hover:text-on-surface"
                  )}
                >
                  {m === 'bilingual' ? t.bilingual : m === 'en' ? t.enOnly : m === 'zh' ? t.cnOnly : t.off}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section: Recommended Videos & Learning Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-outline-variant/20">
            {/* Recommended Videos */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-headline font-extrabold text-xl tracking-tight">{t.nextRecommended}</h2>
                <button className="text-sm font-bold text-primary hover:underline">{t.viewAll}</button>
              </div>

              <div className="space-y-4">
                {/* Recommended Card 1 */}
                <div className="group flex gap-4 p-2 rounded-xl hover:bg-white transition-all cursor-pointer">
                  <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-outline group-hover:text-primary transition-colors" />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-[10px] font-bold text-white rounded">15:30</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-headline font-bold text-sm text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      Advanced Hooks and State Management
                    </h4>
                    <p className="text-xs text-outline font-medium mt-1">12.8k Views • 1 week ago</p>
                    <div className="mt-2 inline-flex">
                      <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Hard</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Card 2 */}
                <div className="group flex gap-4 p-2 rounded-xl hover:bg-white transition-all cursor-pointer">
                  <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-outline group-hover:text-primary transition-colors" />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-[10px] font-bold text-white rounded">08:45</div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-headline font-bold text-sm text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      Career Talk: Working at FAANG Companies
                    </h4>
                    <p className="text-xs text-outline font-medium mt-1">56k Views • 3 days ago</p>
                    <div className="mt-2 inline-flex">
                      <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Interview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak & Flashcards */}
            <div className="space-y-6">
              {/* Bento-style Learning Goal */}
              <div className="bg-primary p-6 rounded-2xl text-on-primary shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-headline font-extrabold text-xl">{t.weeklyStreak}</h3>
                  <p className="text-sm opacity-90 mt-2">
                    {t.streakMsg}
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span>{t.progress}</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Decorative background glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Vocabulary List Shortcut */}
              <div className="bg-surface-container p-6 rounded-2xl">
                <h3 className="font-headline font-extrabold text-lg flex items-center gap-2">
                  <BookOpen className="text-tertiary w-5 h-5" /> {t.flashcardReview}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['asynchronous', 'concurrency', 'efficiency', 'implement', 'mechanism'].map(word => (
                    <span key={word} className="px-3 py-1 bg-white border border-outline-variant/30 rounded-lg text-xs font-bold font-headline hover:bg-primary/10 hover:border-primary transition-all cursor-pointer">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Synchronized Subtitles Content Area */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <SubtitlePanel 
              subtitles={mockVideoData.subtitles}
              currentTime={currentTime}
              mode={mode}
              lang={lang}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
