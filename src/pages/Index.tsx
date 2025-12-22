import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Search, Volume2, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

interface IdiomProgressState {
  completedExercises: string[];
  isLearned: boolean;
  nextReviewDate?: number;
  reviewStep: number;
}

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, IdiomProgressState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [refreshSeed, setRefreshSeed] = useState(0);
  
  // ФИКСИРОВАННЫЙ СПИСОК ДЛЯ ТЕКУЩЕЙ СЕССИИ
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);

  // 1. Инициализация Telegram
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#141414');
    }
  }, []);

  // 2. Загрузка прогресса
  useEffect(() => {
    const saved = localStorage.getItem('spanish-flix-progress-v4');
    if (saved) {
      try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  // Сохранение прогресса при каждом изменении
  useEffect(() => {
    localStorage.setItem('spanish-flix-progress-v4', JSON.stringify(progressMap));
  }, [progressMap]);

  // 3. Логика формирования подборки (10 штук)
  const dailySelection = useMemo(() => {
    const toReview = idioms.filter(i => {
      const p = progressMap[i.id];
      return p?.nextReviewDate && p.nextReviewDate <= Date.now();
    });
    const neverLearned = idioms.filter(i => !progressMap[i.id]);
    const learned = idioms.filter(i => progressMap[i.id] && !toReview.find(r => r.id === i.id));

    // Смешиваем всё, но новые и повторение — в начало
    const pool = [...toReview, ...neverLearned, ...learned];
    // Перемешиваем по сиду
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, [refreshSeed, progressMap]); // Добавили progressMap в зависимости

  // Фиксируем список, когда пользователь заходит в первый раз или обновляет
  useEffect(() => {
    if (dailySelection.length > 0) {
      setActiveSessionList(dailySelection);
    }
  }, [dailySelection]);

  // 4. ГЛАВНАЯ ФУНКЦИЯ ПЕРЕХОДА
  const handleNextIdiom = () => {
    if (!practiceIdiom) return;

    // Ищем индекс строго в зафиксированном списке сессии
    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom.id);
    
    if (currentIndex !== -1 && currentIndex < activeSessionList.length - 1) {
      const next = activeSessionList[currentIndex + 1];
      
      // Сначала закрываем экран упражнений (уходим в DetailView следующей идиомы)
      setIsPracticing(false);
      
      // Небольшая задержка, чтобы UI успел переключиться
      setTimeout(() => {
        setPracticeIdiom(next);
        (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
      }, 100);
    } else {
      // Конец списка
      setIsPracticing(false);
      setIsDetailView(false);
      setPracticeIdiom(null);
      (window as any).Telegram?.WebApp?.showAlert("Поздравляем! Сессия из 10 идиом завершена! 🎉");
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    window.speechSynthesis.speak(utterance);
  };

  const learnedTotal = Object.values(progressMap).filter(p => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#141414] text-white select-none font-sans">
      <Header streak={streak} onProfileClick={() => setIsProfileOpen(true)} />

      <main className="px-6 pb-32">
        <div className="pt-6 mb-8 sticky top-[72px] z-30 bg-[#141414]/95 backdrop-blur-sm pb-2">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" placeholder="Поиск фразы..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#222] border-none rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <ProgressBar learned={learnedTotal} total={idioms.length} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600 fill-current" />
              Ваша пачка на сегодня
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="p-2 bg-white/5 rounded-full">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeSessionList.map(idiom => (
              <div 
                key={idiom.id} 
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="aspect-[16/10] rounded-xl overflow-hidden relative bg-[#222] border border-white/5 cursor-pointer active:scale-95 transition-transform"
              >
                <img src={idiom.imageUrl} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-3">
                  <p className="font-bold text-xs">{idiom.expression}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Экран Профиля */}
      <AnimatePresence>
        {isProfileOpen && (
          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            isPremium={false}
            stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: streak }}
          />
        )}
      </AnimatePresence>

      {/* ЭКРАН ДЕТАЛЕЙ (DETAIL VIEW) */}
      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id}
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
               <h2 className="text-4xl font-black mb-2">{practiceIdiom.expression}</h2>
               <p className="text-green-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               
               <button onClick={() => speak(practiceIdiom.expression)} className="mb-10 p-4 bg-white/5 rounded-2xl mx-auto block">
                 <Volume2 className="w-6 h-6 text-red-500" />
               </button>

               <button 
                className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all" 
                onClick={() => setIsPracticing(true)}
               >
                 УЧИТЬ ЭТУ ФРАЗУ
               </button>
             </div>

             {/* ЭКРАН УПРАЖНЕНИЙ (PRACTICE) */}
             <AnimatePresence>
               {isPracticing && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#141414]">
                   <IdiomPractice
                     idiom={practiceIdiom}
                     onClose={() => setIsPracticing(false)}
                     onFullyLearned={() => { 
                      // 1. Сохраняем прогресс
                      setProgressMap(prev => ({
                        ...prev,
                        [practiceIdiom.id]: {
                          completedExercises: [], 
                          isLearned: true,
                          reviewStep: (prev[practiceIdiom.id]?.reviewStep || 0) + 1,
                          nextReviewDate: Date.now() + 86400000 // +1 день
                        }
                      }));
                      
                      // 2. Переходим к следующей идиоме в списке
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
    </motion.div>
  );
};

export default Index;
