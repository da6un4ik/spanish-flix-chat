import { motion } from 'framer-motion';
import { X, Award, Calendar, BookOpen, Star, Crown } from 'lucide-react';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    learnedCount: number;
    totalCount: number;
    streak: number;
  };
  isPremium?: boolean;
}

export const Profile = ({ isOpen, onClose, stats, isPremium = false }: ProfileProps) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[70] bg-[#0A0A0A] text-white flex flex-col"
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-center border-b border-white/5 bg-[#0A0A0A]">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Mi Perfil</h2>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full border border-white/10 active:scale-90">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* Аватар и статус подписки */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-600 to-red-400 p-1">
              <div className="w-full h-full rounded-full bg-[#161616] flex items-center justify-center border-4 border-[#0A0A0A]">
                <Award className="w-10 h-10 text-red-600" />
              </div>
            </div>
            {isPremium && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-500 p-1.5 rounded-full border-2 border-[#0A0A0A]">
                <Crown className="w-4 h-4 text-black" />
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mb-1">Estudiante de Español</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            {isPremium ? 'Plan Premium' : 'Plan Gratuito'}
          </p>
        </div>

        {/* Сетка статистики */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center">
            <BookOpen className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-2xl font-black">{stats.learnedCount}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Aprendido</span>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center text-center">
            <Calendar className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-2xl font-black">{stats.streak}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Días Seguidos</span>
          </div>
        </div>

        {/* Текущий план */}
        <div className="bg-gradient-to-br from-red-600/20 to-transparent p-6 rounded-2xl border border-red-600/30 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-red-600 fill-red-600" />
            <h4 className="font-black uppercase tracking-widest text-xs">Tu suscripción actual</h4>
          </div>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {isPremium 
              ? '¡Tienes acceso ilimitado a todos los modismos y clips de películas!' 
              : 'Suscríbete para desbloquear videos exclusivos y más ejercicios interactivos.'}
          </p>
          {!isPremium && (
            <button className="w-full bg-white text-black py-4 rounded-xl font-black text-sm uppercase active:scale-95 transition-transform">
              Mejorar a Premium
            </button>
          )}
        </div>

        {/* Прогресс-бар */}
        <div className="mb-10 text-left">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Progreso Total</span>
            <span className="text-xs font-bold text-red-600">
              {Math.round((stats.learnedCount / stats.totalCount) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(stats.learnedCount / stats.totalCount) * 100}%` }}
              className="h-full bg-red-600"
            />
          </div>
        </div>
      </div>

      {/* Footer в стиле Netflix */}
      <div className="p-8 text-center border-t border-white/5">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
          Idiomas App © 2026
        </p>
      </div>
    </motion.div>
  );
};
