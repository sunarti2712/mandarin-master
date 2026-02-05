
import React, { useState, useEffect } from 'react';
import { HSKLevel, QuizQuestion, ScoreRecord } from '../types';
import { generateQuizQuestions } from '../services/geminiService';

interface QuizViewProps {
  level: HSKLevel;
  mode: 'Latihan' | 'Simulasi';
  onFinish: (score: ScoreRecord) => void;
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ level, mode, onFinish, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const tutorImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sumi&top=hijab&mouth=smile&skinColor=ffdbac&clothesColor=e53e3e&backgroundColor=fee2e2&eyes=default&eyebrows=defaultNatural";

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await generateQuizQuestions(level, mode === 'Simulasi' ? 10 : 5);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to generate quiz", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [level, mode]);

  const triggerHaptic = (isCorrect: boolean) => {
    if ('vibrate' in navigator) {
      if (isCorrect) {
        navigator.vibrate(50); // Light short buzz for correct
      } else {
        navigator.vibrate([100, 50, 100]); // Pattern for wrong
      }
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer;
    triggerHaptic(isCorrect);
    setShowResult(true);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    const finalScore: ScoreRecord = {
      id: Math.random().toString(36).substr(2, 9),
      level,
      type: mode,
      score: score,
      total: questions.length,
      timestamp: Date.now()
    };
    onFinish(finalScore);
    onBack();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-lg font-bold text-slate-800">Menyusun Soal {mode}...</h2>
        <p className="text-sm text-slate-400 text-center mt-2">Sabar ya, Tutor Suun sedang menyiapkan soal terbaik untukmu.</p>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-center">
        <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-8 relative">
          <span className="text-5xl font-black text-red-600">{percentage}%</span>
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Hasil {mode} Selesai!</h2>
        <p className="text-slate-500 mb-8">
            Kamu menjawab <span className="font-bold text-slate-800">{score}</span> dari <span className="font-bold text-slate-800">{questions.length}</span> soal dengan benar.
        </p>

        <div className="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-red-200 shadow-sm flex items-center justify-center overflow-hidden">
                <img src={tutorImage} alt="Tutor Suun Yi Yang" className="w-10 h-10 object-contain" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-red-600 uppercase">Pesan dari Tutor Suun</p>
                <p className="text-xs text-slate-600 italic">
                    {percentage >= 80 ? "Luar biasa! Pertahankan prestasimu." : percentage >= 60 ? "Kerja bagus, sedikit lagi kamu akan mahir." : "Tetap semangat! Coba pelajari lagi materinya."}
                </p>
            </div>
        </div>

        <div className="w-full space-y-3">
            <button 
                onClick={handleFinish}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
            >
                Simpan & Kembali
            </button>
            <p className="text-[10px] text-slate-400">Hasil ini otomatis dikirim ke email Anda.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="safe-pt px-6 pb-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-slate-400 px-2"><i className="fa-solid fa-xmark"></i></button>
            <h2 className="text-sm font-bold text-slate-800">{mode} Level {level}</h2>
        </div>
        <div className="bg-slate-100 px-3 py-1 rounded-full">
            <span className="text-[10px] font-bold text-slate-500">{currentIndex + 1} / {questions.length}</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-200">
        <div 
            className="h-full bg-red-500 transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 p-6 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-slate-400 text-xs mb-2 italic">{currentQuestion.pinyin || 'Tuliskan hanzi yang sesuai'}</p>
            <h1 className="text-4xl font-bold text-slate-800 mb-4 tracking-wider">{currentQuestion.question}</h1>
            <p className="text-sm text-slate-500">{currentQuestion.translation}</p>
        </div>

        <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
                <button
                    key={idx}
                    onClick={() => !showResult && setSelectedAnswer(idx)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group
                        ${selectedAnswer === idx 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-white bg-white hover:border-slate-200'
                        } 
                        ${showResult && idx === currentQuestion.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                        ${showResult && selectedAnswer === idx && idx !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-50' : ''}
                    `}
                >
                    <span className={`text-sm font-medium ${selectedAnswer === idx ? 'text-red-700' : 'text-slate-600'}`}>{opt}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${selectedAnswer === idx ? 'border-red-500 bg-red-500 text-white' : 'border-slate-200'}
                        ${showResult && idx === currentQuestion.correctAnswer ? 'border-green-500 bg-green-500 text-white' : ''}
                    `}>
                        {selectedAnswer === idx && <i className="fa-solid fa-check text-[10px]"></i>}
                    </div>
                </button>
            ))}
        </div>

        {showResult && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 animate-fade-in">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Penjelasan</p>
                <p className="text-xs text-slate-600 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
        )}
      </main>

      <footer className="p-6 pb-10 bg-white border-t border-slate-100">
        {!showResult ? (
            <button
                disabled={selectedAnswer === null}
                onClick={checkAnswer}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg
                    ${selectedAnswer === null 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                        : 'bg-red-600 text-white hover:bg-red-700 shadow-red-100'
                    }
                `}
            >
                Cek Jawaban
            </button>
        ) : (
            <button
                onClick={handleNext}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg transition-transform active:scale-95"
            >
                {currentIndex < questions.length - 1 ? 'Lanjut' : 'Lihat Hasil'}
            </button>
        )}
      </footer>
    </div>
  );
};

export default QuizView;
