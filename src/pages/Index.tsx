import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, User, PlayCircle, Home, Heart, X } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#0A0A0A');
    }

    const savedProgress = localStorage.getItem('modismo-pro');
    const savedFavs = localStorage.getItem('modismo-favs');
    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => {
    localStorage.setItem('modismo-pro', JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    localStorage.setItem('modismo-favs', JSON.stringify(favorites));
  }, [favorites]);

  const speak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    synth.speak(utterance);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(id);
      return isFav ? prev.filter(f => f !== id) : [...prev, id];
    });
  };

  const handleNextIdiom = () => {
    if (!practiceIdiom) return;

    // Ищем неизученные (исключая текущую)
    const unlearned = idioms.filter(i => !progressMap[i.id] && i.id !== practiceIdiom.id);
    
    let next: Idiom;
    if (unlearned.length > 0) {
      next = unlearned[0];
    } else {
      // Если все изучены, берем любую другую случайную
      const others = idioms.filter(i => i.id !== practiceIdiom.id);
      next = others[Math.floor(Math.random() * others.length)];
    }

    // Сначала закрываем практику, затем меняем идиому
    setIsPracticing(false);
    setTimeout(() => {
      setPracticeIdiom(next);
      setIsDetailView(true);
    }, 100);
  };

  const openIdiom = (idiom: Idiom) => {
    setPracticeIdiom(idiom);
    setIsDetailView(true);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white select-none pb-24 font-sans">
      <header className="px-6 pt-12 pb-6 flex justify-between items-center sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">MODISMO<span className="text-red-600">.</span></h1>
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10">
           <User className="w-6 h-6 text-red-600" />
        </button>
      </header>

      <main className="px-6">
        <ProgressBar learned={Object.keys(progressMap).length} total={idioms.length} />
        
        <div className="mt-6 relative z-50">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar..." />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {idioms.map((idiom) => (
            <motion.div key={idiom.id} whileTap={{ scale: 0.95 }} onClick={() => openIdiom(idiom)} className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-[#161616]">
              <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              <button 
                onClick={(e) => toggleFavorite(idiom.id, e)} 
                className="absolute top-3 right-3 z-30 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
              >
                <Heart size={14} className={favorites.includes(idiom.id) ? "text-red-600 fill-red-600" : "text-white"} />
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] font-black uppercase italic leading-tight">{idiom.expression}</p>
                {progressMap[idiom.id] && <div className="mt-2 w-full h-1 bg-red-600 rounded-full" />}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ДЕТАЛЬНЫЙ ПРОСМОТР */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto">
            <div className="relative h-[45vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 rounded-full"><ArrowLeft /></button>
            </div>
            
            <div className="px-8 pb-32 -mt-12 relative text-left">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-black uppercase italic leading-none">{practiceIdiom.expression}</h2>
                <button onClick={() => practiceIdiom.videoUrl && setActiveVideoUrl(practiceIdiom.videoUrl)} className="p-4 bg-red-600 rounded-full shadow-lg"><PlayCircle size={24} /></button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                 <button onClick={(e) => speak(practiceIdiom.expression, e)} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest text-red-500 border border-white/5">
                   <Volume2 size={16} /> Escuchar
                 </button>
              </div>

              <p className="text-red-600 font-bold text-lg mb-6 italic">{practiceIdiom.meaning}</p>
              
              {/* КЛИКАБЕЛЬНЫЙ ПРИМЕР С ОЗВУЧКОЙ */}
              <div onClick={(e) => speak(practiceIdiom.example, e)} className="bg-white/5 p-6 rounded-3xl border-l-4 border-red-600 mb-10 active:bg-white/10 transition-colors cursor-pointer">
                <p className="text-[9px] font-black uppercase text-gray-500 mb-2 tracking-widest italic flex items-center gap-2">
                  <Volume2 size={10} /> Ejemplo de uso
                </p>
                <p className="text-gray-200 italic text-lg leading-relaxed">"{practiceIdiom.example}"</p>
              </div>

              <button onClick={() => setIsPracticing(true)} className="w-full bg-red-600 py-6 rounded-2xl font-black text-xl tracking-widest uppercase italic active:scale-95 shadow-xl shadow-red-900/20">Empezar Reto</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ПРАКТИКА И ПРОФИЛЬ */}
      <AnimatePresence>
        {isPracticing && practiceIdiom && (
          <IdiomPractice 
            idiom={practiceIdiom} 
            onClose={() => setIsPracticing(false)} 
            onFullyLearned={() => { 
              setProgressMap(prev => ({...prev, [practiceIdiom.id]: true}));
              handleNextIdiom();
            }} 
          />
        )}
        {isProfileOpen && (
          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }} 
            favorites={favorites} 
            onSelectIdiom={id => openIdiom(idioms.find(i => i.id === id)!)} 
          />
        )}
      </AnimatePresence>

      {/* ВИДЕОПЛЕЕР */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
            <button onClick={() => setActiveVideoUrl(null)} className="absolute top-12 right-6 p-3 bg-white/10 rounded-full"><X /></button>
            <video src={activeVideoUrl} controls autoPlay className="w-full max-h-[80vh]" />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center z-[45]">
        <button onClick={() => { setIsDetailView(false); setIsProfileOpen(false); }} className="flex flex-col items-center gap-1 text-red-600 uppercase font-black text-[10px] tracking-widest italic"><Home size={22} /> Inicio</button>
      </nav>
    </div>
  );
};

export default Index;
