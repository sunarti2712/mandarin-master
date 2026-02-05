
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        scores: []
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12 bg-white">
      <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
        <span className="text-4xl text-red-600 font-bold">漢</span>
      </div>
      
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Mandarin Master</h1>
      <p className="text-slate-500 text-center mb-10">Belajar HSK 1-4 bersama Tutor Suun Yi Yang</p>
      
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="Masukkan nama Anda"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="nama@email.com"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95"
        >
          Mulai Belajar
        </button>
      </form>
      
      <p className="mt-8 text-xs text-slate-400 text-center leading-relaxed">
        Dengan masuk, Anda setuju untuk menyimpan data nilai latihan ke profil Anda.
      </p>
    </div>
  );
};

export default Login;
