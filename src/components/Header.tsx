import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  streak: number;
  onProfileClick: () => void; // Добавлено
}

export const Header = ({ streak, onProfileClick }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/90 to-transparent sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-red-600 text-2xl font-black tracking-tighter italic select-none">SPANISH FLIX</span>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
            streak > 0 ? 'border-orange-500/50 bg-orange-500/10 text-orange-500' : 'border-white/10 text-gray-500'
          }`}
        >
          <Flame className={`w-5 h-5 ${streak > 0 ? 'fill-current animate-pulse' : ''}`} />
          <span className="font-bold text-sm">{streak}</span>
        </motion.div>
        
        {/* Кнопка открытия профиля */}
        <button 
          onClick={onProfileClick}
          className="w-9 h-9 rounded-md bg-red-600 flex items-center justify-center text-[11px] font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-600/20"
        >
          U
        </button>
      </div>
    </header>
  );
};
