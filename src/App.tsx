import React, { useState } from 'react';
import { LearnView } from './views/LearnView';
import { LoginView } from './views/LoginView';
import { AdminView } from './views/AdminView';
import { VocabView } from './views/VocabView';
import { AllVideosView } from './views/AllVideosView';
import { LevelsView } from './views/LevelsView';
import { HomeView } from './views/HomeView';
import { Language, i18n } from './i18n';
import { Bell, Settings, Globe, LogOut, BookOpen } from 'lucide-react';
import { cn } from './lib/utils';

import { VocabLevel } from './types';

type View = 'login' | 'home' | 'learn' | 'admin' | 'vocab' | 'allVideos' | 'levels';
type Role = 'student' | 'admin' | null;

export default function App() {
  const [view, setView] = useState<View>('login');
  const [role, setRole] = useState<Role>(null);
  const [lang, setLang] = useState<Language>('en');
  const [selectedLevel, setSelectedLevel] = useState<VocabLevel | 'all'>('all');

  const handleLogin = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    setView('home');
  };

  const handleLogout = () => {
    setRole(null);
    setView('login');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body antialiased">
      {/* Navigation Bar */}
      {view !== 'login' && (
        <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="flex justify-between items-center w-full px-8 h-20 max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-12">
              <span className="text-2xl font-extrabold tracking-tighter text-primary font-headline cursor-pointer" onClick={() => setView('home')}>
                LingoFlow
              </span>
              <div className="hidden md:flex gap-8 items-center font-headline font-bold tracking-tight">
                <span 
                  onClick={() => setView('home')} 
                  className={cn("cursor-pointer transition-colors", view === 'home' ? "text-primary border-b-2 border-primary pb-1" : "text-outline hover:text-primary")}
                >
                  {t.home}
                </span>
                <span 
                  onClick={() => setView('vocab')} 
                  className={cn("cursor-pointer transition-colors", view === 'vocab' ? "text-primary border-b-2 border-primary pb-1" : "text-outline hover:text-primary")}
                >
                  {t.vocabBook}
                </span>
                <span 
                  onClick={() => { setView('allVideos'); setSelectedLevel('all'); }} 
                  className={cn("cursor-pointer transition-colors", view === 'allVideos' ? "text-primary border-b-2 border-primary pb-1" : "text-outline hover:text-primary")}
                >
                  {t.allVideos}
                </span>
                <span 
                  onClick={() => setView('levels')} 
                  className={cn("cursor-pointer transition-colors", view === 'levels' ? "text-primary border-b-2 border-primary pb-1" : "text-outline hover:text-primary")}
                >
                  {t.levels}
                </span>
                {role === 'admin' && (
                  <span 
                    onClick={() => setView('admin')} 
                    className={cn("cursor-pointer transition-colors", view === 'admin' ? "text-primary border-b-2 border-primary pb-1" : "text-outline hover:text-primary")}
                  >
                    {t.adminPanel}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button onClick={toggleLang} className="flex items-center gap-1 p-2 rounded-full hover:bg-surface-container transition-colors text-outline" title="Toggle Language">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">{lang}</span>
                </button>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-outline">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-outline">
                  <Settings className="w-5 h-5" />
                </button>
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-error-container hover:text-error transition-colors text-outline" title={t.logout}>
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="relative ml-2">
                  <div className="w-10 h-10 rounded-full border-2 border-secondary p-0.5 bg-surface-container-highest flex items-center justify-center font-bold text-primary">
                    {role === 'admin' ? 'A' : 'S'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      {view === 'login' && <LoginView lang={lang} onLogin={handleLogin} />}
      {view === 'home' && <HomeView lang={lang} onPlayVideo={() => setView('learn')} />}
      {view === 'learn' && <LearnView lang={lang} />}
      {view === 'admin' && <AdminView lang={lang} />}
      {view === 'vocab' && <VocabView lang={lang} />}
      {view === 'allVideos' && <AllVideosView lang={lang} selectedLevel={selectedLevel} onPlayVideo={() => setView('learn')} />}
      {view === 'levels' && <LevelsView lang={lang} onSelectLevel={(level) => { setSelectedLevel(level); setView('allVideos'); }} />}
    </div>
  );
}
