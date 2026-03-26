import React, { useState } from 'react';
import { Language, i18n } from '../i18n';

interface LoginViewProps {
  lang: Language;
  onLogin: (role: 'student' | 'admin') => void;
}

export function LoginView({ lang, onLogin }: LoginViewProps) {
  const t = i18n[lang];
  const [email, setEmail] = useState('student@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === 'admin@example.com' || email.toLowerCase() === 'admin') {
      onLogin('admin');
    } else {
      onLogin('student');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24 bg-surface-container-low/50" id="login-form">
      <div className="max-w-md w-full px-8">
        <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm border border-outline-variant/10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-headline text-on-background mb-2">{t.welcome}</h2>
            <p className="text-on-surface-variant">{t.continue}</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2 px-1">{t.email}</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface rounded-lg border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                placeholder="name@example.com" 
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2 px-1">
                <label className="text-sm font-bold text-on-surface">{t.password}</label>
                <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-surface rounded-lg border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary/50 transition-all outline-none" 
                placeholder="••••••••" 
                defaultValue="password"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg transition-transform active:scale-95 shadow-lg shadow-primary/20"
            >
              {t.login}
            </button>
            <p className="text-xs text-center text-outline mt-4">
              {lang === 'en' ? 'Tip: Use admin@example.com to login as admin' : '提示：使用 admin@example.com 登录管理员账号'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
