
export type HSKLevel = 1 | 2 | 3 | 4;

export enum MaterialType {
  LISTENING = 'Mendengar',
  READING = 'Membaca',
  WRITING = 'Menulis',
  CONVERSATION = 'Percakapan'
}

export interface User {
  id: string;
  name: string;
  email: string;
  scores: ScoreRecord[];
}

export interface ScoreRecord {
  id: string;
  level: HSKLevel;
  type: 'Latihan' | 'Simulasi';
  score: number;
  total: number;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  pinyin?: string;
  translation?: string;
}

export interface LessonContent {
  title: string;
  pinyin: string;
  translation: string;
  content: string;
  tips: string[];
}
