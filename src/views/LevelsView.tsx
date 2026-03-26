import React from 'react';
import { Language, i18n } from '../i18n';
import { Layers } from 'lucide-react';

import { VocabLevel } from '../types';

interface LevelsViewProps {
  lang: Language;
  onSelectLevel: (level: VocabLevel) => void;
}

export function LevelsView({ lang, onSelectLevel }: LevelsViewProps) {
  const t = i18n[lang];

  const levels = [
    { 
      id: 'junior', 
      name: t.juniorHigh, 
      desc: lang === 'en' ? 'Basic vocabulary and daily conversations.' : '基础词汇与日常对话。', 
      color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200/80' 
    },
    { 
      id: 'high', 
      name: t.highSchool, 
      desc: lang === 'en' ? 'Intermediate grammar and reading comprehension.' : '中级语法与阅读理解。', 
      color: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200/80' 
    },
    { 
      id: 'cet4', 
      name: t.cet4, 
      desc: lang === 'en' ? 'Essential vocabulary for College English Test Band 4.' : '大学英语四级必备词汇。', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200/80' 
    },
    { 
      id: 'cet6', 
      name: t.cet6, 
      desc: lang === 'en' ? 'Advanced vocabulary for College English Test Band 6.' : '大学英语六级进阶词汇。', 
      color: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200/80' 
    },
    { 
      id: 'abroad', 
      name: t.abroad, 
      desc: lang === 'en' ? 'Practical English for studying and living abroad.' : '留学生活实用英语。', 
      color: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200/80' 
    },
  ];

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface flex items-center gap-3">
          <Layers className="w-8 h-8 text-primary" />
          {t.levels}
        </h1>
        <p className="text-outline mt-2">
          {lang === 'en' ? 'Choose a difficulty level that matches your current English proficiency.' : '选择适合您当前英语水平的难度等级。'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levels.map((level) => (
          <div key={level.id} onClick={() => onSelectLevel(level.id as VocabLevel)} className={`p-8 rounded-3xl border-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${level.color}`}>
            <h2 className="text-2xl font-extrabold font-headline mb-2">{level.name}</h2>
            <p className="font-medium opacity-80">{level.desc}</p>
            <button className="mt-6 px-6 py-2 bg-white/50 hover:bg-white/80 rounded-full font-bold text-sm transition-colors shadow-sm">
              {lang === 'en' ? 'Explore Videos' : '探索视频'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
