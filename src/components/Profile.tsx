import { motion } from 'framer-motion';
import { X, Award, Calendar, BookOpen, Star, Crown, Share2, Heart, ChevronRight } from 'lucide-react';
import { idioms } from '@/data/idioms';

interface ProfileProps {
  isOpen: boolean; onClose: () => void;
  stats: { learnedCount: number; totalCount: number; streak: number; };
  favorites: string[]; onSelectIdiom: (id: string) => void;
}

export const Profile = ({ isOpen, onClose, stats, favorites, onSelectIdiom }: ProfileProps) => {
  const favoriteItems = idioms.filter(i => favorites.includes(i.id));

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[100] bg-[#0A0A0A] text-white flex flex-col">
      <div className="px-6 pt-12 pb-6 flex justify-between items-center border-b border-white/5 bg-[#0A0A0A]">
        <h2 className="text-2xl font-black uppercase tracking-tighter italic">Mi Perfil</h2>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full border border-white/10"><X /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 text-left">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 p-5 rounded-3xl border border-white/5 flex flex-col items-center">
            <BookOpen className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-3xl font-black italic">{stats.learnedCount}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Aprendido</span>
          </div>
          <div className="bg-white/5 p-5 rounded-3xl border border-white/5 flex flex-col items-center">
            <Calendar className="w-6 h-6 text-red-600 mb-2" />
            <span className="text-3xl font-black italic">{stats.streak}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Días Seguidos</span>
          </div>
        </div>

        <h4 className="flex items-center gap-2 font-black uppercase text-xs italic mb-4 text-red-600"><Heart size={14} fill="currentColor"/> Mis Favoritos</h4>
        <div className="space-y-3 mb-10">
          {favoriteItems.length > 0 ? favoriteItems.map(i => (
            <button key={i.id} onClick={() => onSelectIdiom(i.id)} className="w-full bg-white/5 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={i.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                <span className="font-bold text-sm uppercase italic">{i.expression}</span>
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          )) : <p className="text-gray-600 text-xs uppercase font-bold text-center py-6">No hay favoritos</p>}
        </div>

        <div className="bg-gradient-to-br from-red-600/20 to-transparent p-6 rounded-3xl border border-red-600/30">
          <h4 className="font-black uppercase text-xs mb-2 flex items-center gap-2"><Crown size={14}/> Premium Stars</h4>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">Desbloquea videos exclusivos de series y películas con Premium.</p>
          <button className="w-full bg-white text-black py-4 rounded-xl font-black text-xs uppercase">Mejorar Ahora</button>
        </div>
      </div>
    </motion.div>
  );
};
