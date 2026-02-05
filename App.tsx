
import React, { useState, useEffect } from 'react';
import { User, ScoreRecord, HSKLevel, MaterialType } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import QuizView from './components/QuizView';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'lesson' | 'quiz' | 'profile'>('login');
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(1);
  const [selectedType, setSelectedType] = useState<MaterialType>(MaterialType.READING);
  const [quizMode, setQuizMode] = useState<'Latihan' | 'Simulasi'>('Latihan');

  // Load user session from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('hsk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('hsk_user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('hsk_user');
    setUser(null);
    setCurrentView('login');
  };

  const saveScore = (score: ScoreRecord) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      scores: [score, ...user.scores]
    };
    setUser(updatedUser);
    localStorage.setItem('hsk_user', JSON.stringify(updatedUser));
    
    // Mock email sending
    console.log(`Sending score to ${user.email}...`);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-xl border-x border-slate-200">
      {currentView === 'login' && <Login onLogin={handleLogin} />}
      
      {user && currentView === 'dashboard' && (
        <Dashboard 
          user={user} 
          onSelectLesson={(level, type) => {
            setSelectedLevel(level);
            setSelectedType(type);
            setCurrentView('lesson');
          }}
          onSelectQuiz={(level, mode) => {
            setSelectedLevel(level);
            setQuizMode(mode);
            setCurrentView('quiz');
          }}
          onNavigateProfile={() => setCurrentView('profile')}
        />
      )}

      {user && currentView === 'lesson' && (
        <LessonView 
          level={selectedLevel} 
          type={selectedType} 
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

      {user && currentView === 'quiz' && (
        <QuizView 
          level={selectedLevel} 
          mode={quizMode} 
          onFinish={saveScore}
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

      {user && currentView === 'profile' && (
        <Profile 
          user={user} 
          onLogout={handleLogout}
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

      {/* Persistent Bottom Navigation */}
      {user && currentView !== 'login' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 flex justify-around py-3 px-6 z-50 shadow-lg">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-red-600' : 'text-slate-400'}`}
          >
            <i className="fa-solid fa-house text-xl"></i>
            <span className="text-xs font-medium">Beranda</span>
          </button>
          <button 
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-red-600' : 'text-slate-400'}`}
          >
            <i className="fa-solid fa-user text-xl"></i>
            <span className="text-xs font-medium">Profil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
