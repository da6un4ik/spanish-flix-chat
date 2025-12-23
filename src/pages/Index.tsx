import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Search, Volume2, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);
  
  // ФИКСИРОВАННЫЙ СПИСОК СЕССИИ (чтобы не менялся во время учебы)
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);

  // 1. Инициализация Telegram и загрузка прогресса
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); }

    const saved = localStorage.getItem('spanish-flix-progress-v4');
    if (saved) {
      try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  // 2. Формирование списка сессии (ТОЛЬКО при загрузке или нажатии кнопки "Обновить")
  useEffect(() => {
    // Берем все идиомы, перемешиваем их
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    // Берем первые 10
    const selection = shuffled.slice(0, 10);
    setActiveSessionList(selection);
    console.log("New session list created:", selection.map(i => i.expression));
  }, [refreshSeed]); // Зависит только от кнопки обновления

  // 3. Сохранение прогресса
  useEffect(() => {
    if (Object.keys(progressMap).length > 0) {
      localStorage.setItem('spanish-flix-progress-v4', JSON.stringify(progressMap));
    }
  }, [progressMap]);

  // 4. ЛОГИКА ПЕРЕХОДА
  const handleNextIdiom = () => {
    if (!practiceIdiom) return;

    // Находим индекс в нашем СТАБИЛЬНОМ списке
    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom.id);
    
    console.log(`Finished: ${practiceIdiom.expression} (Index: ${currentIndex})`);

    if (currentIndex !== -1 && currentIndex < activeSessionList.length - 1) {
      const next = activeSessionList[currentIndex + 1];
      
      console.log(`Moving to next: ${next.expression}`);

      // ВАЖНО: сначала закрываем тест
      setIsPracticing(false);
      
      // Небольшая задержка перед сменой контента для плавности анимации
      setTimeout(() => {
        setPracticeIdiom(next);
        // Мы НЕ закрываем DetailView, просто меняем идиому внутри него
        (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
      }, 100);
    } else {
      console.log("End of session reached");
      setIsPracticing(false);
      setIsDetailView(false);
      setPracticeIdiom(null);
      (window as any).Telegram?.WebApp?.showAlert("¡Increíble! Ты прошла всю подборку! 🎉");
    }
  };

  const learnedTotal = Object.values(progressMap).filter((p: any) => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#141414] text-white select-none font-sans">
      <Header streak={0} onProfileClick={() => setIsProfileOpen(true)} />

      <main className="px-6 pb-32">
        <ProgressBar learned={learnedTotal} total={idioms.length} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600 fill-current" />
              Твои 10 идиом на сегодня
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="p-2 bg-white/5 rounded-full active:rotate-180 transition-transform duration-500">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeSessionList.map((idiom, index) => (
              <div 
                key={`${idiom.id}-${index}`} 
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="aspect-[16/10] rounded-xl overflow-hidden relative bg-[#222] border border-white/5 cursor-pointer active:scale-95 transition-all"
              >
                <img src={idiom.imageUrl} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-3">
                  <p className="font-bold text-xs leading-tight">{idiom.expression}</p>
                </div>
                {progressMap[idiom.id]?.isLearned && (
                  <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ЭКРАН ДЕТАЛЕЙ */}
      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id} // Ключ заставляет React обновлять экран при смене идиомы
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
          >
             <div className="relative h-[40vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414]" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-6 left-6 bg-black/50 p-3 rounded-full text-white backdrop-blur-md">
                 <ArrowLeft className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-xl mx-auto px-6 pb-20 -mt-12 relative z-10 text-center">
               <h2 className="text-4xl font-black mb-2 tracking-tighter">{practiceIdiom.expression}</h2>
               <p className="text-green-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               
               <button onClick={() => {
                 window.speechSynthesis.cancel();
                 const u = new SpeechSynthesisUtterance(practiceIdiom.expression);
                 u.lang = 'es-ES';
                 window.speechSynthesis.speak(u);
               }} className="mb-10 p-4 bg-white/5 rounded-2xl mx-auto block">
                 <Volume2 className="w-6 h-6 text-red-500" />
               </button>

               <button 
                className="w-full bg-red-600 py-5 rounded-3xl font-black text-xl shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-95 transition-all" 
                onClick={() => setIsPracticing(true)}
               >
                 УЧИТЬ ФРАЗУ
               </button>
             </div>

             {/* ЭКРАН ПРАКТИКИ */}
             <AnimatePresence>
               {isPracticing && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#141414]">
                   <IdiomPractice
                     idiom={practiceIdiom}
                     onClose={() => setIsPracticing(false)}
                     onFullyLearned={() => { 
                      // Сохраняем прогресс
                      setProgressMap(prev => ({
                        ...prev,
                        [practiceIdiom.id]: { isLearned: true, lastReview: Date.now() }
                      }));
                      
                      // ПЕРЕХОД К СЛЕДУЮЩЕЙ
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
