import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { SearchBar } from '@/components/SearchBar';
import { VideoSection } from '@/components/VideoSection';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, RefreshCw, Sparkles, User, PlayCircle, Home } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({
    stats: { streak: 0, lastDate: null }
  });
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // 1. Инициализация и Проверка Strike (Дней подряд)
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#0A0A0A'); }

    const saved = localStorage.getItem('modismo-progress-v4');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Логика Strike
      const today = new Date().toDateString();
      const lastDate = parsed.stats?.lastDate;
      let currentStreak = parsed.stats?.streak || 0;

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastDate === yesterday.toDateString()) {
          currentStreak += 1;
        } else {
          currentStreak = 1; // Сброс, если пропустили день
        }
        parsed.stats = { ...parsed.stats, streak: currentStreak, lastDate: today };
      }
      setProgressMap(parsed);
    }
  }, []);

  // Сохранение прогресса (включая идиомы и статистику)
  useEffect(() => {
    localStorage.setItem('modismo-progress-v4', JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    // Формируем список: сначала неизученные
    const unlearned = idioms.filter(i => !progressMap[i.id]?.isLearned);
    const shuffled = [...unlearned].sort(() => 0.5 - Math.random());
    setActiveSessionList(shuffled.length > 0 ? shuffled : idioms.slice(0, 10));
  }, [progressMap]);

  // Озвучка (испанский)
  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    window.speechSynthesis.speak(u);
  }, []);

  const handleNextIdiom = () => {
    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom?.id);
    const next = activeSessionList[currentIndex + 1] || activeSessionList[0];
    
    setIsPracticing(false);
    setPracticeIdiom(next);
    (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };

  const learnedTotal = Object.keys(progressMap).filter(key => progressMap[key].isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#0A0A0A] text-white select-none font-sans pb-24">
      
      {/* HEADER */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            MODISMO<span className="text-red-600">.</span>
          </h1>
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">Aprende Español</span>
        </div>
        
        <button onClick={() => setIsProfileOpen(true)} className="p-2 bg-white/5 rounded-full border border-white/10">
           <User className="w-6 h-6 text-red-600" />
        </button>
      </header>

      <main className="px-6">
        <ProgressBar learned={learnedTotal} total={idioms.length} />
        
        <div className="mt-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Buscar modismos..." />
        </div>

        {/* Секция Netflix-style */}
        <section className="mt-8">
          <h3 className="text-gray-400 font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-red-600" /> Modismo del día
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {activeSessionList.slice(0, 6).map((idiom) => (
              <motion.div 
                key={idiom.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5"
              >
                <img src={idiom.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={idiom.expression} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-xs font-bold uppercase leading-tight">{idiom.expression}</p>
                  {progressMap[idiom.id]?.isLearned && <div className="mt-1 w-full h-0.5 bg-red-600" />}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ЭКРАН КАРТОЧКИ (ДЕТАЛИ) */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto">
            <div className="relative h-[50vh]">
              <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              <button onClick={() => setIsDetailView(false)} className="absolute top-12 left-6 p-3 bg-black/50 rounded-full backdrop-blur-xl">
                <ArrowLeft />
              </button>
            </div>

            <div className="px-8 pb-32 -mt-20 relative text-left">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-5xl font-black uppercase tracking-tighter leading-none flex-1">{practiceIdiom.expression}</h2>
                <div className="flex gap-2">
                   <button onClick={() => speak(practiceIdiom.expression)} className="p-3 bg-white/5 rounded-full"><Volume2 className="text-red-600" /></button>
                   {/* Кнопка видео */}
                   <button onClick={() => setIsVideoOpen(true)} className="p-3 bg-white/5 rounded-full"><PlayCircle className="text-red-600" /></button>
                </div>
              </div>

              {/* Значение на ИСПАНСКОМ */}
              <p className="text-red-600 font-bold text-xl italic mb-6">{practiceIdiom.meaningEs || practiceIdiom.meaning}</p>
              
              <div className="bg-white/5 p-4 rounded-xl border-l-2 border-red-600 mb-8">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Ejemplo:</p>
                <p className="text-gray-200 italic">"{practiceIdiom.exampleEs || practiceIdiom.example}"</p>
                <button onClick={() => speak(practiceIdiom.exampleEs || practiceIdiom.example)} className="mt-2 text-red-600 flex items-center gap-1 text-xs font-bold">
                  <Volume2 size={14}/> Escuchar
                </button>
              </div>

              <button onClick={() => setIsPracticing(true)} className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl shadow-lg shadow-red-900/20">
                PRACTICAR
              </button>
            </div>

            {/* Модалка практики на 3 упражнения */}
            {isPracticing && (
              <IdiomPractice 
                idiom={practiceIdiom} 
                onClose={() => setIsPracticing(false)}
                onFullyLearned={() => {
                  setProgressMap(prev => ({ ...prev, [practiceIdiom.id]: { isLearned: true } }));
                  handleNextIdiom();
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION BAR (Home Button) */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-center z-[60]">
        <button 
          onClick={() => { setIsDetailView(false); setIsProfileOpen(false); setIsPracticing(false); }}
          className="flex flex-col items-center gap-1 text-red-600"
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Inicio</span>
        </button>
      </nav>

      {/* PROFILE MODAL */}
      <Profile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        stats={{ 
          learnedCount: learnedTotal, 
          totalCount: idioms.length, 
          streak: progressMap.stats?.streak || 0 
        }} 
      />
    </motion.div>
  );
};

export default Index;
