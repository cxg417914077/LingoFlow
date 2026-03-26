import React from 'react';
import { Language, i18n } from '../i18n';
import { PlayCircle, BookOpen, Video, Clock, TrendingUp } from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  onPlayVideo: () => void;
}

export function HomeView({ lang, onPlayVideo }: HomeViewProps) {
  const t = i18n[lang];

  return (
    <main className="pt-24 pb-12 px-8 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
          {t.dashboard}
        </h1>
        <p className="text-outline mt-2">
          {lang === 'en' ? 'Track your progress and continue your learning journey.' : '追踪您的学习进度，继续您的学习之旅。'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-outline font-bold uppercase tracking-wider">{t.videosWatched}</p>
            <p className="text-2xl font-extrabold font-headline">24</p>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-outline font-bold uppercase tracking-wider">{t.wordsLearned}</p>
            <p className="text-2xl font-extrabold font-headline">856</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-outline font-bold uppercase tracking-wider">{t.studyTime}</p>
            <p className="text-2xl font-extrabold font-headline">42.5</p>
          </div>
        </div>

        <div className="bg-primary p-6 rounded-2xl shadow-md text-on-primary flex items-center gap-4 relative overflow-hidden">
          <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm opacity-90 font-bold uppercase tracking-wider">{t.weeklyStreak}</p>
            <p className="text-2xl font-extrabold font-headline">5 {lang === 'en' ? 'Days' : '天'}</p>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold font-headline tracking-tight">{t.continueLearning}</h2>
        </div>
        
        <div 
          onClick={onPlayVideo}
          className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 cursor-pointer hover:shadow-md transition-all flex flex-col md:flex-row"
        >
          <div className="md:w-1/3 relative aspect-video md:aspect-auto bg-surface-container-highest flex items-center justify-center overflow-hidden">
            <PlayCircle className="w-16 h-16 text-outline group-hover:text-primary transition-colors z-10 relative" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-xs font-bold text-white rounded z-10">12:45</div>
          </div>
          <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <div className="inline-flex mb-3">
              <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                {lang === 'en' ? 'Intermediate' : '中级'}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold font-headline mb-2 group-hover:text-primary transition-colors">
              {lang === 'en' ? 'Understanding React Hooks Deep Dive' : '深入理解 React Hooks'}
            </h3>
            <p className="text-outline mb-6 line-clamp-2">
              {lang === 'en' 
                ? 'Master the fundamentals of React Hooks including useState, useEffect, and custom hooks in this comprehensive guide.' 
                : '通过本综合指南，掌握 React Hooks 的基础知识，包括 useState、useEffect 和自定义 hooks。'}
            </p>
            <div className="flex items-center gap-4 text-sm font-bold text-outline">
              <div className="flex items-center gap-1">
                <div className="w-full h-2 bg-surface-container-highest rounded-full w-32 overflow-hidden">
                  <div className="w-1/3 h-full bg-primary rounded-full"></div>
                </div>
                <span className="ml-2">33%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
