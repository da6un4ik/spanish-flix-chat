import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { VideoSection } from '@/components/VideoSection';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, RefreshCw, Sparkles, User, PlayCircle, Home, Heart } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({ stats: { streak: 0, lastDate: null } });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Инициализация Telegram и загрузка данных
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0A0A0A'); }

    const savedProgress = localStorage.getItem('modismo-progress-v4');
    const savedFavs = localStorage.getItem('modismo-favs');
    
    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    // Логика Strike (Дней подряд)
    const today = new Date().toDateString();
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const lastDate = parsed.stats?.lastDate;
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const newStreak = lastDate === yesterday.toDateString() ? (parsed.stats.streak + 1) : 1;
        setProgressMap(prev => ({ ...prev, stats: { streak: newStreak, lastDate: today } }));
      }
    }
  }, []);

  // Автосохранение
  useEffect(() => {
    localStorage.setItem('modismo-progress-v4', JSON.stringify(progressMap));
    localStorage.setItem('modismo-favs', JSON.stringify(favorites));
  }, [progressMap, favorites]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const handleNextIdiom = () => {
    const unlearned = idioms.filter(i => !progressMap[i.id]?.isLearned);
    const next = unlearned[Math.floor(Math.random() * unlearned.length)] || idioms[0];
    setPracticeIdiom(next);
    setIsPracticing(false);
  };

  const learnedTotal = Object.keys(progressMap).filter(key => progressMap[key].isLearned).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white select-none pb-24">
      {/* HEADER */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">MODISMO<span className="text-red-600">.</span></h1>
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mt-1">Aprende Español</span>
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10 active:scale-90">
           <User className="w-6 h-6 text-red-600" />
        </button>
      </header>

      <main className="px-6">
        <ProgressBar learned={learnedTotal} total={idioms.length} />
        <div className="mt-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar modismos..." />
        </div>

        {/* Сетка Netflix */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {idioms.map((idiom) => (
            <motion.div key={idiom.id} whileTap={{ scale: 0.95 }} onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }} className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-[#161616]">
              <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="" />
              <button onClick={(e) => toggleFavorite(idiom.id, e)} className="absolute top-3 right-3 z-30 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <Heart size={14} className={favorites.includes(idiom.id) ? "text-red-600 fill-red-600" : "text-white"} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] font-black uppercase leading-tight italic">{idiom.expression}</p>
                {progressMap[idiom.id]?.isLearned && <div className="mt-1 w-full h-1 bg-red-600 rounded-full" />}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto">
            <div className="relative h-[45vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 rounded-full"><ArrowLeft /></button>
            </div>
            <div className="px-8 pb-32 -mt-16 relative text-left">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-4xl font-black uppercase italic leading-none">{practiceIdiom.expression}</h2>
                <button onClick={() => setIsPracticing(true)} className="p-4 bg-red-600 rounded-full shadow-lg shadow-red-900/40"><PlayCircle size={24}/></button>
              </div>
              <p className="text-red-600 font-bold text-lg mb-6 italic">{practiceIdiom.meaning}</p>
              <div className="bg-white/5 p-5 rounded-2xl border-l-4 border-red-600 mb-8">
                <p className="text-[10px] text-gray-500 uppercase font-black mb-1 tracking-widest">Ejemplo:</p>
                <p className="text-gray-200 italic leading-relaxed">"{practiceIdiom.example}"</p>
              </div>
              <button onClick={() => setIsPracticing(true)} className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl tracking-tighter shadow-xl shadow-red-900/20 active:scale-95 transition-all">PRACTICAR</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center z-[60]">
        <button onClick={() => { setIsDetailView(false); setIsProfileOpen(false); }} className="flex flex-col items-center gap-1 text-red-600 uppercase font-black text-[10px] tracking-widest"><Home /> Inicio</button>
      </nav>

      {/* MODALS */}
      <AnimatePresence>
        {isProfileOpen && (
          <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: progressMap.stats.streak }} favorites={favorites} onSelectIdiom={(id) => { setPracticeIdiom(idioms.find(i => i.id === id)!); setIsDetailView(true); setIsProfileOpen(false); }} />
        )}
        {isPracticing && practiceIdiom && (
          <IdiomPractice idiom={practiceIdiom} onClose={() => setIsPracticing(false)} onFullyLearned={() => { setProgressMap(prev => ({ ...prev, [practiceIdiom.id]: { isLearned: true } })); handleNextIdiom(); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
