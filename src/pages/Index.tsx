import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, User, PlayCircle, Home, Heart, X, Search } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({ stats: { streak: 0, lastDate: null } });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка данных и настройка голоса
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

  // Функция озвучки (улучшенная для Telegram)
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

  // Фильтрация для поиска
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : idioms.filter(i => 
        i.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const openIdiom = (idiom: Idiom) => {
    setPracticeIdiom(idiom);
    setIsDetailView(true);
    setSearchQuery(''); // Очищаем поиск при переходе
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
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10 active:scale-90 transition-transform">
           <User className="w-6 h-6 text-red-600" />
        </button>
      </header>

      <main className="px-6 relative">
        <ProgressBar learned={learnedTotal} total={idioms.length} />
        
        {/* БЛОК ПОИСКА С РЕЗУЛЬТАТАМИ */}
        <div className="mt-6 relative z-50">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar modismos..." />
          
          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                {searchResults.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto">
                    {searchResults.map((idiom) => (
                      <button 
                        key={idiom.id} 
                        onClick={() => openIdiom(idiom)}
                        className="w-full p-4 flex items-center gap-4 hover:bg-white/5 active:bg-white/10 border-b border-white/5 last:border-0 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                          <img src={idiom.imageUrl} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                          <span className="font-black italic uppercase text-xs text-white truncate">{idiom.expression}</span>
                          <span className="text-[10px] text-gray-500 mt-0.5 truncate">{idiom.meaning}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-8 h-8 text-gray-800 mx-auto mb-2" />
                    <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest">No se encontraron coincidencias</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ОСНОВНАЯ СЕТКА (NETFLIX STYLE) */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {idioms.map((idiom) => (
            <motion.div 
              key={idiom.id} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => openIdiom(idiom)} 
              className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-[#161616]"
            >
              <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] font-black uppercase leading-tight italic">{idiom.expression}</p>
                {progressMap[idiom.id]?.isLearned && <div className="mt-1.5 w-full h-1 bg-red-600 rounded-full" />}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ (ПОЛНОЭКРАННАЯ КАРТОЧКА) */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto"
          >
            <div className="relative h-[48vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 active:scale-90 transition-transform"><ArrowLeft /></button>
            </div>

            <div className="px-8 pb-32 -mt-16 relative text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-4xl font-black uppercase italic leading-none tracking-tighter">{practiceIdiom.expression}</h2>
                    <button onClick={() => speak(practiceIdiom.expression)} className="p-2 bg-white/5 rounded-full text-red-600 border border-white/10 active:scale-125 transition-transform">
                        <Volume2 size={24} />
                    </button>
                </div>
                <button 
                  onClick={() => practiceIdiom.videoUrl && setActiveVideoUrl(practiceIdiom.videoUrl)} 
                  className="p-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-90 transition-transform"
                >
                    <PlayCircle size={24} />
                </button>
              </div>

              <p className="text-red-600 font-bold text-lg mb-6 italic leading-snug">{practiceIdiom.meaning}</p>
              
              <div onClick={() => speak(practiceIdiom.example)} className="bg-white/5 p-6 rounded-3xl border-l-4 border-red-600 mb-10 active:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-2 text-gray-500 uppercase font-black text-[9px] tracking-widest">
                    <span>Ejemplo de uso</span>
                    <Volume2 size={12} />
                </div>
                <p className="text-gray-200 italic text-lg leading-relaxed">"{practiceIdiom.example}"</p>
              </div>

              <button 
                onClick={() => setIsPracticing(true)} 
                className="w-full bg-red-600 py-6 rounded-2xl font-black text-xl tracking-widest shadow-xl shadow-red-900/20 active:scale-95 transition-all uppercase italic"
              >
                Empezar Reto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ВИДЕОПЛЕЕР */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
            <button onClick={() => setActiveVideoUrl(null)} className="absolute top-12 right-6 p-3 bg-white/10 rounded-full text-white z-[210] active:scale-90"><X /></button>
            <video src={activeVideoUrl} controls autoPlay className="w-full max-h-[85vh] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center z-[45]">
        <button onClick={() => { setIsDetailView(false); setIsProfileOpen(false); setIsPracticing(false); }} className="flex flex-col items-center gap-1 text-red-600 uppercase font-black text-[10px] tracking-[0.2em] italic">
            <Home size={22} /> Inicio
        </button>
      </nav>

      {/* MODALS */}
      <AnimatePresence>
        {isProfileOpen && (
          <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: progressMap.stats.streak || 0 }} favorites={favorites} onSelectIdiom={(id) => openIdiom(idioms.find(i => i.id === id)!)} />
        )}
        {isPracticing && practiceIdiom && (
          <IdiomPractice 
            idiom={practiceIdiom} 
            onClose={() => setIsPracticing(false)} 
            onFullyLearned={() => { 
              setProgressMap(prev => ({ ...prev, [practiceIdiom.id]: { isLearned: true } }));
              setIsPracticing(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
