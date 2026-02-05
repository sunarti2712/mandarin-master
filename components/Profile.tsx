
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-white z-10 border-b border-slate-50">
        <button onClick={onBack} className="text-slate-600">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2 className="text-lg font-bold text-slate-800">Profil Saya</h2>
        <button onClick={onLogout} className="text-red-500 text-sm font-bold">Keluar</button>
      </header>

      <div className="p-6 space-y-8">
        {/* User Info */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={`https://picsum.photos/seed/${user.id}/200/200`} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-slate-100 shadow-sm"
            />
            <div className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full border-4 border-white">
              <i className="fa-solid fa-award"></i>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
          <p className="text-slate-400 text-sm">{user.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
            <span className="text-2xl font-black text-slate-800">{user.scores.length}</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Tes Selesai</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
            <span className="text-2xl font-black text-red-500">
              {user.scores.length > 0 
                ? Math.round(user.scores.reduce((acc, curr) => acc + (curr.score/curr.total), 0) / user.scores.length * 100)
                : 0}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rata-rata</span>
          </div>
        </div>

        {/* Scores History */}
        <section>
          <h4 className="font-bold text-slate-800 mb-4">Riwayat Belajar</h4>
          {user.scores.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <i className="fa-solid fa-clipboard-list text-3xl text-slate-300 mb-4"></i>
              <p className="text-slate-400 text-xs">Belum ada riwayat tes.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {user.scores.map((s) => (
                <div key={s.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.type === 'Simulasi' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      <i className={`fa-solid ${s.type === 'Simulasi' ? 'fa-vial' : 'fa-graduation-cap'}`}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{s.type} HSK {s.level}</p>
                      <p className="text-[10px] text-slate-400">{new Date(s.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{s.score} / {s.total}</p>
                    <p className={`text-[10px] font-bold ${s.score / s.total >= 0.6 ? 'text-green-500' : 'text-red-400'}`}>
                        {s.score / s.total >= 0.6 ? 'LULUS' : 'REMIDI'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
