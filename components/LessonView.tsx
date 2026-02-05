
import React, { useState, useEffect } from 'react';
import { HSKLevel, MaterialType, LessonContent } from '../types';
import { getLessonContent } from '../services/geminiService';

interface LessonViewProps {
  level: HSKLevel;
  type: MaterialType;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ level, type, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LessonContent | null>(null);
  const tutorImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumi&top=hijab&mouth=smile&skinColor=ffdbac&clothesColor=e53e3e&backgroundColor=fee2e2&eyes=default&eyebrows=defaultNatural";

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await getLessonContent(level, type);
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch lesson content", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [level, type]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-800">{type} HSK {level}</h2>
          <p className="text-xs text-slate-400">Materi oleh Suun Yi Yang</p>
        </div>
      </header>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 animate-pulse">Menyiapkan materi...</p>
          </div>
        ) : content && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-800 leading-tight">{content.title}</h1>
              <div className="flex gap-3 text-sm">
                <span className="text-red-500 font-medium italic">{content.pinyin}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{content.translation}</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {content.content}
              </p>
            </div>

            <section className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <h4 className="font-bold text-red-700 text-sm mb-3 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb"></i>
                Tips dari Tutor Suun
              </h4>
              <ul className="space-y-3">
                {content.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2 text-xs text-red-900 leading-relaxed">
                    <span className="font-bold">{idx + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-red-200 shadow-sm mb-3 flex items-center justify-center overflow-hidden">
                    <img 
                        src={tutorImage} 
                        alt="Tutor Suun Yi Yang" 
                        className="w-14 h-14 object-contain"
                    />
                </div>
                <p className="text-xs font-bold text-slate-800">Suun Yi Yang</p>
                <p className="text-[10px] text-slate-400 text-center mt-1 italic">
                    "Semangat belajarnya! Jika ada pertanyaan, jangan ragu untuk mengulang materi ini."
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;
