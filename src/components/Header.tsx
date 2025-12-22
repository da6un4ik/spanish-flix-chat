import { motion } from 'framer-motion'; // Добавь это!
import { Flame } from 'lucide-react';

export const Header = ({ streak }: { streak: number }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-40 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-red-600 text-2xl font-black tracking-tighter italic">SPANISH FLIX</span>
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
          <span className="font-bold">{streak}</span>
        </motion.div>
        
        <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-[10px] font-bold">
          USER
        </div>
      </div>
    </header>
  );
};
