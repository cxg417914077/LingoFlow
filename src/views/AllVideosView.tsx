import React from 'react';
import { Language, i18n } from '../i18n';
import { PlayCircle, Search } from 'lucide-react';

import { VocabLevel } from '../types';

interface AllVideosViewProps {
  lang: Language;
  selectedLevel: VocabLevel | 'all';
  onPlayVideo: () => void;
}

export function AllVideosView({ lang, selectedLevel, onPlayVideo }: AllVideosViewProps) {
  const t = i18n[lang];

  const levelLabels: Record<VocabLevel, string> = {
    junior: t.juniorHigh,
    high: t.highSchool,
    cet4: t.cet4,
    cet6: t.cet6,
    abroad: t.abroad,
  };

  const title = selectedLevel === 'all' 
    ? t.allVideos 
    : `${levelLabels[selectedLevel]} ${lang === 'en' ? 'Videos' : '视频'}`;

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
            {title}
          </h1>
          <p className="text-outline mt-2">
            {lang === 'en' ? 'Explore our complete library of immersive English videos.' : '探索我们完整的沉浸式英语视频库。'}
          </p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input 
            type="text" 
            placeholder={lang === 'en' ? "Search videos..." : "搜索视频..."}
            className="pl-10 pr-4 py-2 rounded-full border border-outline-variant/50 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} onClick={onPlayVideo} className="group flex flex-col gap-3 cursor-pointer">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-highest flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-outline group-hover:text-primary transition-colors" />
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-xs font-bold text-white rounded">
                {Math.floor(Math.random() * 10 + 5)}:00
              </div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                {lang === 'en' ? `Sample English Learning Video ${item}` : `英语学习示例视频 ${item}`}
              </h4>
              <p className="text-sm text-outline font-medium mt-1">
                {Math.floor(Math.random() * 50 + 10)}k Views • {item} days ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
