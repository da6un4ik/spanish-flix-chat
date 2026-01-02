import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, User, PlayCircle, Home, Heart, X } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({ stats: { streak: 0, lastDate: null } });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Инициализация и загрузка данных
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

  // Функция озвучки
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
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
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ (КАРТОЧКА) */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto">
            <div className="relative h-[45vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 rounded-full"><ArrowLeft /></button>
            </div>

            <div className="px-8 pb-32 -mt-16 relative text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-black uppercase italic leading-none">{practiceIdiom.expression}</h2>
                    <button onClick={() => speak(practiceIdiom.expression)} className="p-2 bg-white/10 rounded-full text-red-600 active:scale-125 transition-transform">
                        <Volume2 size={24} />
                    </button>
                </div>
                {/* Кнопка Видео */}
                <button onClick={() => practiceIdiom.videoUrl && setActiveVideoUrl(practiceIdiom.videoUrl)} className="p-4 bg-red-600 rounded-full shadow-lg shadow-red-900/40 active:scale-90 transition-transform">
                    <PlayCircle size={24} />
                </button>
              </div>

              <p className="text-red-600 font-bold text-lg mb-6 italic">{practiceIdiom.meaning}</p>
              
              <div onClick={() => speak(practiceIdiom.example)} className="bg-white/5 p-5 rounded-2xl border-l-4 border-red-600 mb-8 active:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-1 text-gray-500">
                    <p className="text-[10px] font-black uppercase tracking-widest">Ejemplo:</p>
                    <Volume2 size={14} />
                </div>
                <p className="text-gray-200 italic leading-relaxed">"{practiceIdiom.example}"</p>
              </div>

              <button onClick={() => setIsPracticing(true)} className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl tracking-tighter shadow-xl shadow-red-900/20 active:scale-95 transition-all">PRACTICAR</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ВИДЕОПЛЕЕР */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
            <button onClick={() => setActiveVideoUrl(null)} className="absolute top-12 right-6 p-3 bg-white/10 rounded-full text-white z-[210]"><X /></button>
            <video src={activeVideoUrl} controls autoPlay className="w-full max-h-[80vh] object-contain" />
            <p className="mt-4 text-gray-500 font-black text-[10px] uppercase tracking-widest">Clip de película / serie</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center z-[45]">
        <button onClick={() => { setIsDetailView(false); setIsProfileOpen(false); setIsPracticing(false); }} className="flex flex-col items-center gap-1 text-red-600 uppercase font-black text-[10px] tracking-widest">
            <Home size={20} /> Inicio
        </button>
      </nav>

      {/* МОДАЛЬНЫЕ ОКНА */}
      <AnimatePresence>
        {isProfileOpen && (
          <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: progressMap.stats.streak }} favorites={favorites} onSelectIdiom={(id) => { setPracticeIdiom(idioms.find(i => i.id === id)!); setIsDetailView(true); setIsProfileOpen(false); }} />
        )}
        {isPracticing && practiceIdiom && (
          <IdiomPractice idiom={practiceIdiom} onClose={() => setIsPracticing(false)} onFullyLearned={() => { 
            setProgressMap(prev => ({ ...prev, [practiceIdiom.id]: { isLearned: true } }));
            setIsPracticing(false);
            const nextIdx = idioms.findIndex(i => i.id === practiceIdiom.id) + 1;
            setPracticeIdiom(idioms[nextIdx] || idioms[0]);
          }} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
