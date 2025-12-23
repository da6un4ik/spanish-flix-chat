import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, RefreshCw, Sparkles, User } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);

  // 1. Инициализация и загрузка прогресса [cite: 2025-12-22]
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { 
      tg.ready(); 
      tg.expand();
      // Фикс для версии 6.0: используем системный ключ вместо HEX
      try {
        tg.setHeaderColor('bg_color'); 
      } catch (e) {
        console.warn("Header color set to default");
      }
    }
    const saved = localStorage.getItem('modismo-progress-v4');
    if (saved) {
      try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  // 2. Генерация списка на сессию
  useEffect(() => {
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    setActiveSessionList(shuffled.slice(0, 10));
  }, [refreshSeed]);

  // 3. Сохранение прогресса
  useEffect(() => {
    if (Object.keys(progressMap).length > 0) {
      localStorage.setItem('modismo-progress-v4', JSON.stringify(progressMap));
    }
  }, [progressMap]);

  const speak = (text: string, isExample = false) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    if (isExample) u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const handleNextIdiom = () => {
    if (!practiceIdiom) return;
    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom.id);
    if (currentIndex !== -1 && currentIndex < activeSessionList.length - 1) {
      const next = activeSessionList[currentIndex + 1];
      setIsPracticing(false);
      setTimeout(() => {
        setPracticeIdiom(next);
        (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
      }, 150);
    } else {
      setIsPracticing(false);
      setIsDetailView(false);
      setPracticeIdiom(null);
      (window as any).Telegram?.WebApp?.showAlert("¡Increíble! Сессия завершена. 🎉");
    }
  };

  const learnedTotal = Object.values(progressMap).filter((p: any) => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#0A0A0A] text-white select-none font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center bg-[#0A0A0A] sticky top-0 z-40">
        <div className="flex flex-col text-left">
          <h1 className="text-4xl font-black italic tracking-tighter leading-none uppercase">
            Modismo<span className="text-red-600 not-italic">.</span>
          </h1>
          <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mt-1">Испанский в деталях</span>
        </div>
        
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 active:scale-90 transition-transform relative"
        >
           <User className="w-5 h-5 text-gray-400" />
           {learnedTotal > 0 && (
             <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#0A0A0A]" />
           )}
        </button>
      </header>

      <main className="px-6 pb-32">
        <ProgressBar learned={learnedTotal} total={idioms.length} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-red-600" /> Подборка дня
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="text-gray-600 active:rotate-180 transition-transform duration-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* СЕТКА КАРТОЧЕК */}
          <div className="grid grid-cols-2 gap-4">
            {activeSessionList.map((idiom, index) => (
              <motion.div 
                key={`${idiom.id}-${index}`} 
                whileTap={{ scale: 0.96 }}
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="relative aspect-[10/12] rounded-2xl overflow-hidden bg-[#161616] border border-white/5 shadow-2xl"
              >
                {/* КАРТИНКА: Важно проверить пути в idioms.ts */}
                <img 
                  src={idiom.imageUrl} 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity" 
                  alt=""
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=500'; }}
                />
                
                {/* ГРАДИЕНТ ДЛЯ ЧИТАЕМОСТИ ТЕКСТА */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                
                {/* ТЕКСТ ПОВЕРХ КАРТИНКИ (ВЕРНУЛ) */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                  <p className="font-bold text-[13px] leading-tight text-white uppercase text-left tracking-tight drop-shadow-lg">
                    {idiom.expression}
                  </p>
                </div>

                {progressMap[idiom.id]?.isLearned && (
                  <div className="absolute top-3 right-3 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)] z-30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ */}
      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto"
          >
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" alt="" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-12 left-6 bg-black/60 p-3 rounded-full text-white backdrop-blur-md border border-white/10">
                 <ArrowLeft className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-xl mx-auto px-8 pb-20 -mt-16 relative z-10">
               <h2 className="text-4xl font-black mb-2 tracking-tighter text-white uppercase text-left">{practiceIdiom.expression}</h2>
               <p className="text-red-600 font-black text-xl mb-8 text-left leading-tight">{practiceIdiom.meaning}</p>
               
               <div className="bg-white/5 border-l-4 border-red-600 p-5 mb-10 rounded-r-2xl flex justify-between items-start gap-4 shadow-xl">
                  <div className="flex-1 text-left">
                    <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">Пример:</p>
                    <p className="text-gray-200 italic font-medium leading-relaxed">"{practiceIdiom.example}"</p>
                  </div>
                  <button onClick={() => speak(practiceIdiom.example, true)} className="p-2 bg-white/5 rounded-full">
                    <Volume2 className="w-5 h-5 text-red-600" />
                  </button>
               </div>

               <div className="flex items-center gap-4">
                  <button onClick={() => speak(practiceIdiom.expression)} className="p-5 bg-white/5 rounded-2xl border border-white/10 active:bg-white/20">
                    <Volume2 className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    className="flex-1 bg-red-600 text-white py-5 rounded-2xl font-black text-xl active:scale-95 transition-all shadow-lg shadow-red-900/40" 
                    onClick={() => setIsPracticing(true)}
                  >
                    УЧИТЬ ФРАЗУ
                  </button>
               </div>
             </div>

             <AnimatePresence>
               {isPracticing && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#0A0A0A]">
                   <IdiomPractice
                     idiom={practiceIdiom}
                     onClose={() => setIsPracticing(false)}
                     onFullyLearned={() => { 
                      setProgressMap(prev => ({ ...prev, [practiceIdiom.id]: { isLearned: true } }));
                      handleNextIdiom();
                     }}
                     completedExercises={new Set()} onExerciseComplete={() => {}} 
                   />
                 </motion.div>
               )}
             </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ПРОФИЛЬ */}
      <AnimatePresence>
        {isProfileOpen && (
          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            isPremium={false} 
            stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
