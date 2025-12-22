import { motion } from 'framer-motion';
import { X, Trophy, Star, Crown, Flame, ChevronRight, Settings, ExternalLink } from 'lucide-react';

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
  // --- TELEGRAM DATA ---
  const tg = (window as any).Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  // Если данных нет (например, открыли в браузере), используем заглушки
  const firstName = user?.first_name || 'Amigo';
  const lastName = user?.last_name || '';
  const username = user?.username ? `@${user.username}` : 'Ученик';
  const photoUrl = user?.photo_url;

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#141414] overflow-y-auto pb-12"
    >
      {/* HEADER */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#141414]/90 backdrop-blur-md z-10">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
          <X className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Профиль ученика</h2>
        <div className="w-10" />
      </div>

      <div className="max-w-xl mx-auto px-6">
        {/* USER INFO SECTION */}
        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-5xl font-black shadow-2xl overflow-hidden border-4 border-white/5">
              {photoUrl ? (
                <img src={photoUrl} alt={firstName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white drop-shadow-md">{firstName[0]}</span>
              )}
            </div>
            {isPremium && (
              <div className="absolute -top-3 -right-3 bg-yellow-500 p-2 rounded-xl shadow-lg ring-4 ring-[#141414]">
                <Crown className="w-5 h-5 text-black" />
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <h3 className="text-3xl font-black tracking-tight text-white">
              {firstName} {lastName}
            </h3>
            <p className="text-red-500 font-bold text-xs uppercase tracking-[0.2em] mt-2 flex items-center justify-center gap-2">
              <Trophy className="w-3 h-3" />
              {stats.learnedCount < 5 ? 'Новичок' : 'Мастер идиом'} • {username}
            </p>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
              <Star className="w-5 h-5 text-blue-500 fill-current" />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Выучено</p>
            <p className="text-2xl font-black">{stats.learnedCount}<span className="text-gray-600 text-sm ml-1 font-bold">/{stats.totalCount}</span></p>
          </div>
          
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
              <Flame className="w-5 h-5 text-orange-500 fill-current" />
            </div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Ударный темп</p>
            <p className="text-2xl font-black">{stats.streak}<span className="text-gray-600 text-sm ml-1 font-bold">дн.</span></p>
          </div>
        </div>

        {/* PREMIUM CARD (TELEGRAM STARS READY) */}
        {!isPremium && (
          <div className="bg-gradient-to-br from-[#EAB308] to-[#92400E] p-1 rounded-3xl mb-8 shadow-xl shadow-yellow-900/20">
            <div className="bg-[#141414] rounded-[22px] p-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-yellow-500 p-1 rounded-md">
                    <Crown className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-yellow-500 font-black text-xs uppercase tracking-widest">Premium Доступ</span>
                </div>
                <h4 className="text-white font-black text-xl mb-2">Разблокируй всё!</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Получи доступ к 500+ идиомам, PDF-гайдам и обучению без рекламы за Telegram Stars.
                </p>
                <button 
                  onClick={() => {
                    // Здесь будет логика оплаты Stars
                    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
                    alert('Скоро: Оплата через Telegram Stars ⭐️');
                  }}
                  className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl text-sm tracking-[0.1em] hover:bg-yellow-400 transition-all active:scale-95"
                >
                  УЛУЧШИТЬ АККАУНТ
                </button>
              </div>
              <Crown className="absolute -right-6 -bottom-6 w-32 h-32 text-yellow-500/5 rotate-12" />
            </div>
          </div>
        )}

        {/* MENU OPTIONS */}
        <div className="space-y-2 mb-10">
          {[
            { icon: Settings, label: 'Настройки приложения', sub: 'Тема, уведомления' },
            { icon: ExternalLink, label: 'Наш Telegram канал', sub: 'Новые идиомы каждый день' },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#222] rounded-xl group-hover:bg-red-600/20 transition-colors">
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          ))}
        </div>
        
        <p className="text-center text-[10px] text-gray-700 font-bold uppercase tracking-[0.4em]">
          Spanish Flix v1.0.4
        </p>
      </div>
    </motion.div>
  );
};
