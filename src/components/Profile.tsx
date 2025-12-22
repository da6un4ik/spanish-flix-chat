import { motion } from 'framer-motion';
import { X, Trophy, Star, Crown, Download, FileText, Calendar, Flame, ChevronRight } from 'lucide-react';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    learnedCount: number;
    totalCount: number;
    streak: number;
  };
  isPremium: boolean;
}

export const Profile = ({ isOpen, onClose, stats, isPremium }: ProfileProps) => {
  // Логика уровней
  const level = stats.learnedCount < 5 ? 'Новичок' : stats.learnedCount < 15 ? 'Афисионадо' : 'Мастер идиом';
  
  // Имитация данных календаря (28 дней)
  const activity = Array.from({ length: 28 }, (_, i) => Math.random() > 0.6);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#141414] overflow-y-auto pb-12"
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#141414]/90 backdrop-blur-md z-10">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-sm font-black uppercase tracking-[0.3em]">Мой Профиль</h2>
        <div className="w-10" />
      </div>

      <div className="max-w-xl mx-auto px-6">
        {/* User Card */}
        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-lg bg-red-600 flex items-center justify-center text-4xl font-black shadow-2xl transition-transform group-hover:scale-105">
              U
            </div>
            {isPremium && (
              <div className="absolute -top-3 -right-3 bg-yellow-500 p-1.5 rounded-full shadow-lg ring-4 ring-[#141414]">
                <Crown className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
          <div className="text-center mt-5">
            <h3 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
              User_2025
              {isPremium && <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-sm font-black">PRO</span>}
            </h3>
            <p className="text-red-600 font-bold text-xs uppercase tracking-widest mt-1">{level}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Star className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">Идиом</span>
            </div>
            <p className="text-3xl font-black">{stats.learnedCount}<span className="text-gray-600 text-lg">/{stats.totalCount}</span></p>
          </div>
          <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-wider">Стрик</span>
            </div>
            <p className="text-3xl font-black">{stats.streak}<span className="text-gray-600 text-lg text-sm ml-1 font-bold">дн.</span></p>
          </div>
        </div>

        {/* Activity Map */}
        <div className="bg-[#1f1f1f] p-5 rounded-2xl border border-white/5 mb-8">
          <h4 className="text-[10px] text-gray-500 uppercase font-black mb-4 tracking-widest flex items-center gap-2">
            <Calendar className="w-3 h-3" /> Активность за месяц
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {activity.map((active, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-[2px] ${active ? 'bg-red-600' : 'bg-white/5'}`} 
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-10">
          <h4 className="text-[10px] text-gray-500 uppercase font-black mb-5 tracking-widest">Достижения</h4>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { id: 1, label: 'Новичок', icon: <Trophy />, active: stats.learnedCount >= 1 },
              { id: 2, label: '7 Дней', icon: <Flame />, active: stats.streak >= 7 },
              { id: 3, label: 'Мастер', icon: <Star />, active: stats.learnedCount >= 10 },
            ].map(badge => (
              <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-3 ${badge.active ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${badge.active ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-white/10 text-white'}`}>
                  {badge.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Offer */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-6 rounded-3xl mb-8 relative overflow-hidden group">
          <Crown className="absolute -right-4 -bottom-4 w-32 h-32 text-black/10 rotate-12 transition-transform group-hover:scale-110" />
          <h4 className="text-black font-black text-xl mb-1 flex items-center gap-2">
            Spanish Flix Premium
          </h4>
          <p className="text-black/70 text-sm mb-5 font-medium leading-tight">
            Офлайн-режим, экспорт в PDF и <br/>умная статистика забывания.
          </p>
          <button className="w-full bg-black text-white font-black py-4 rounded-xl text-sm tracking-widest hover:bg-black/80 transition shadow-xl">
            {isPremium ? 'ПОДПИСКА АКТИВНА' : 'ПОЛУЧИТЬ ДОСТУП'}
          </button>
        </div>

        {/* Tools Section */}
        <div className="space-y-2">
           <p className="text-[10px] text-gray-500 uppercase font-black mb-3 ml-1 tracking-widest">Инструменты</p>
           {[
             { icon: <Download />, label: 'Скачать базу (Offline)', premium: true },
             { icon: <FileText />, label: 'Экспорт в PDF карточки', premium: true }
           ].map((item, i) => (
             <button key={i} className={`w-full flex items-center justify-between p-5 rounded-2xl bg-[#1f1f1f] border border-white/5 transition active:scale-[0.98] ${!isPremium && 'opacity-50'}`}>
               <div className="flex items-center gap-4">
                 <span className="text-gray-400">{item.icon}</span>
                 <span className="text-sm font-bold">{item.label}</span>
               </div>
               {!isPremium ? <Crown className="w-4 h-4 text-yellow-500" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
             </button>
           ))}
        </div>
      </div>
    </motion.div>
  );
};
