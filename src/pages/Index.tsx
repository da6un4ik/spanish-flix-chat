import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0A0A0A'); }
    
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const savedProgress = localStorage.getItem('modismo-progress-v4');
    const savedFavs = localStorage.getItem('modismo-favs');
    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    const voices = synth.getVoices();
    const premiumVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Natural')));
    utterance.voice = premiumVoice || voices.find(v => v.lang.includes('es')) || null;
    synth.speak(utterance);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const learnedTotal = Object.keys(progressMap).filter(key => progressMap[key].isLearned).length;

  // Логика фильтрации поиска
  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : idioms.filter(i => i.expression.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white select-none pb-24">
      <header className="px-6 pt-12 pb-6 flex justify-between items-center sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">MODISMO<span className="text-red-600">.</span></h1>
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mt-1">Aprende Español</span>
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10">
           <User className="w-6 h-6 text-red-600" />
        </button>
      </header>

      <main className="px-6">
        <ProgressBar learned={learnedTotal} total={idioms.length} />
        
        {/* КОНТЕЙНЕР ПОИСКА С ВЫПАДАЮЩИМ СПИСКОМ */}
        <div className="mt-6 relative z-50">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar modismos..." />
          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl max-h-[300px] overflow-y-auto">
                {filteredSearch.length > 0 ? filteredSearch.map(idiom => (
                  <button key={idiom.id} onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); setSearchQuery(''); }} className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/5 border-b border-white/5 last:border-0">
                    <img src={idiom.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-black italic uppercase text-[10px] text-white">{idiom.expression}</span>
                  </button>
                )) : <div className="p-6 text-center text-[10px] font-black uppercase text-gray-600">No hay resultados</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* СЕТКА КАРТОЧЕК */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {idioms.map((idiom) => (
            <motion.div key={idiom.id} whileTap={{ scale: 0.95 }} onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }} className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-[#161616]">
              <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] font-black uppercase leading-tight italic">{idiom.expression}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ (БЕЗ ИЗМЕНЕНИЙ) */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto">
             {/* ... (код экрана деталей из предыдущего ответа) ... */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ВИДЕОПЛЕЕР (БЕЗ ИЗМЕНЕНИЙ) */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
             <button onClick={() => setActiveVideoUrl(null)} className="absolute top-12 right-6 p-3 bg-white/10 rounded-full text-white z-[210]"><X /></button>
             <video src={activeVideoUrl} controls autoPlay className="w-full max-h-[80vh] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
