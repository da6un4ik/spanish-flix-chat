import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, User, PlayCircle, Home, Heart, X, Search } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Инициализация и прогрев голосов
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0A0A0A'); }
    
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const savedProgress = localStorage.getItem('modismo-pro');
    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    localStorage.setItem('modismo-pro', JSON.stringify(progressMap));
  }, [progressMap]);

  // УЛЬТРА-СИНТЕЗАТОР для Telegram
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;

    const voices = synth.getVoices();
    const bestVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Natural'))) 
                   || voices.find(v => v.lang.includes('es'));
    
    if (bestVoice) utterance.voice = bestVoice;
    
    setTimeout(() => synth.speak(utterance), 50);
    (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const filteredSearch = searchQuery.trim() === '' 
    ? [] 
    : idioms.filter(i => i.expression.toLowerCase().includes(searchQuery.toLowerCase()));

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
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase mt-1">Aprende Español</span>
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10"><User className="text-red-600" /></button>
      </header>

      <main className="px-6">
        <ProgressBar learned={Object.keys(progressMap).length} total={idioms.length} />
        
        <div className="mt-6 relative z-50">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar modismos..." />
          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {filteredSearch.length > 0 ? filteredSearch.map(i => (
                  <button key={i.id} onClick={() => openIdiom(i)} className="w-full p-4 flex items-center gap-4 hover:bg-white/5 border-b border-white/5 last:border-0">
                    <img src={i.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="font-black italic uppercase text-[10px]">{i.expression}</span>
                  </button>
                )) : <div className="p-6 text-center text-[10px] text-gray-600 font-black uppercase">No hay resultados</div>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {idioms.map((idiom) => (
            <motion.div key={idiom.id} whileTap={{ scale: 0.95 }} onClick={() => openIdiom(idiom)} className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-[#161616]">
              <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-[11px] font-black uppercase italic leading-tight">{idiom.expression}</p>
                {progressMap[idiom.id] && <div className="mt-2 w-full h-1 bg-red-600 rounded-full" />}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-y-auto">
            <div className="relative h-[48vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 rounded-full"><ArrowLeft /></button>
            </div>
            <div className="px-8 pb-32 -mt-16 relative text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black uppercase italic leading-none">{practiceIdiom.expression}</h2>
                  <button onClick={() => speak(practiceIdiom.expression)} className="p-2 bg-white/5 rounded-full text-red-600 active:scale-125 transition-transform"><Volume2 size={24} /></button>
                </div>
                <button onClick={() => practiceIdiom.videoUrl && setActiveVideoUrl(practiceIdiom.videoUrl)} className="p-4 bg-red-600 rounded-full shadow-lg"><PlayCircle size={24} /></button>
              </div>
              <p className="text-red-600 font-bold text-lg mb-6 italic">{practiceIdiom.meaning}</p>
              <div onClick={() => speak(practiceIdiom.example)} className="bg-white/5 p-6 rounded-3xl border-l-4 border-red-600 mb-10 active:bg-white/10 transition-colors">
                <p className="text-[9px] font-black uppercase text-gray-500 mb-2 tracking-widest">Ejemplo de uso</p>
                <p className="text-gray-200 italic text-lg leading-relaxed">"{practiceIdiom.example}"</p>
              </div>
              <button onClick={() => setIsPracticing(true)} className="w-full bg-red-600 py-6 rounded-2xl font-black text-xl tracking-widest uppercase italic active:scale-95 transition-all">Empezar Reto</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
            <button onClick={() => setActiveVideoUrl(null)} className="absolute top-12 right-6 p-3 bg-white/10 rounded-full"><X /></button>
            <video src={activeVideoUrl} controls autoPlay className="w-full max-h-[85vh] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center z-[45]">
        <button onClick={() => { setIsDetailView(false); setIsProfileOpen(false); }} className="flex flex-col items-center gap-1 text-red-600 uppercase font-black text-[10px] tracking-widest italic"><Home size={22} /> Inicio</button>
      </nav>

      {/* MODALS */}
      <AnimatePresence>
        {isProfileOpen && <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }} favorites={[]} onSelectIdiom={id => openIdiom(idioms.find(i => i.id === id)!)} />}
        {isPracticing && practiceIdiom && <IdiomPractice idiom={practiceIdiom} onClose={() => setIsPracticing(false)} onFullyLearned={() => { setProgressMap(p => ({...p, [practiceIdiom.id]: true})); setIsPracticing(false); }} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
