export type VocabLevel = 'junior' | 'high' | 'cet4' | 'cet6' | 'abroad';

export interface VocabItem {
  word: string;
  level: VocabLevel;
  translation: string;
  example: string;
  phonetic?: string;
}

export interface Subtitle {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  en: string;
  zh: string;
  vocab: VocabItem[];
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  url: string; // URL to the video file
  subtitles: Subtitle[];
}

export interface User {
  id: string;
  username: string;
  role: 'student' | 'admin';
}
