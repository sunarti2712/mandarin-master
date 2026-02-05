
import React from 'react';
import { User, HSKLevel, MaterialType } from '../types';

interface DashboardProps {
  user: User;
  onSelectLesson: (level: HSKLevel, type: MaterialType) => void;
  onSelectQuiz: (level: HSKLevel, mode: 'Latihan' | 'Simulasi') => void;
  onNavigateProfile: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectLesson, onSelectQuiz, onNavigateProfile }) => {
  const levels: HSKLevel[] = [1, 2, 3, 4];
  const categories = Object.values(MaterialType);
  
  const tutorImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumi&top=hijab&mouth=smile&skinColor=ffdbac&clothesColor=e53e3e&backgroundColor=fee2e2&eyes=default&eyebrows=defaultNatural";

  return (
    <div className="safe-pt px-6 space-y-8 pb-32">
      <header className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">Selamat datang,</p>
          <h2 className="text-xl font-bold text-slate-800">{user.name} 👋</h2>
        </div>
        <button onClick={onNavigateProfile} className="w-12 h-12 rounded-full border-2 border-red-500 overflow-hidden shadow-sm active:scale-90 transition-transform">
          <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`} alt="Avatar" />
        </button>
      </header>

      {/* Tutor Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-red-200">
        <div className="relative z-10 w-2/3">
          <h3 className="text-lg font-bold mb-1">Tutor Suun Yi Yang</h3>
          <p className="text-red-50 text-xs leading-relaxed mb-3">
            "Ayo kuasai Mandarin bersama! Pilih level HSK kamu di bawah."
          </p>
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold backdrop-blur-sm">
            Professional Tutor • HSK Specialist
          </div>
        </div>
        <div className="absolute -right-2 -bottom-2 w-36 h-36 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
            <img 
              src={tutorImage} 
              alt="Suun Yi Yang - Kartun Berjilbab Oriental" 
              className="w-32 h-32 object-contain"
            />
        </div>
      </div>

      {/* HSK Level Selection */}
      <section>
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-red-500"></i>
          Pilih Level HSK
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {levels.map(level => (
            <div key={level} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-600 rounded-lg">Level {level}</span>
                <i className="fa-solid fa-chart-line text-slate-300"></i>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Materi & Latihan</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => onSelectLesson(level, MaterialType.READING)}
                    className="py-2 px-1 bg-slate-50 active:bg-red-50 text-slate-600 active:text-red-600 rounded-xl text-[10px] font-bold transition-colors"
                  >
                    Materi
                  </button>
                  <button 
                    onClick={() => onSelectQuiz(level, 'Latihan')}
                    className="py-2 px-1 bg-slate-50 active:bg-orange-50 text-slate-600 active:text-orange-600 rounded-xl text-[10px] font-bold transition-colors"
                  >
                    Latihan
                  </button>
                </div>
                <button 
                  onClick={() => onSelectQuiz(level, 'Simulasi')}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md shadow-red-100"
                >
                  Simulasi Ujian
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Categories */}
      <section>
        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-book-open-reader text-red-500"></i>
          Kategori Pembelajaran
        </h4>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => onSelectLesson(1, cat)}
              className="flex-shrink-0 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 w-28 active:border-red-200 transition-colors"
            >
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <i className={`fa-solid ${
                  cat === MaterialType.LISTENING ? 'fa-headphones' : 
                  cat === MaterialType.READING ? 'fa-book-open' : 
                  cat === MaterialType.WRITING ? 'fa-pen-nib' : 'fa-comments'
                } text-red-500`}></i>
              </div>
              <span className="text-[10px] font-bold text-slate-700">{cat}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
