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
  const [isPremium] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);

  // --- 1. ИНИЦИАЛИЗАЦИЯ TELEGRAM ---
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#141414');
      tg.setBackgroundColor('#141414');
    }
  }, []);

  // --- 2. ЗАГРУЗКА И СОХРАНЕНИЕ ---
  useEffect(() => {
    const savedProgress = localStorage.getItem('spanish-flix-progress-v4');
    if (savedProgress) {
      try { setProgressMap(JSON.parse(savedProgress)); } catch (e) { console.error(e); }
    }
    const savedStreak = localStorage.getItem('spanish-flix-streak') || '0';
    setStreak(parseInt(savedStreak));
  }, []);

  useEffect(() => {
    localStorage.setItem('spanish-flix-progress-v4', JSON.stringify(progressMap));
  }, [progressMap]);

  // --- 3. ФУНКЦИИ-ПОМОЩНИКИ ---
  const calculateNextReview = (currentStep: number) => {
    const intervals = [1, 3, 7, 30, 90];
    return new Date().setDate(new Date().getDate() + (intervals[currentStep] || 120));
  };

  const getIdiomStatus = (id: string) => {
    const p = progressMap[id];
    if (!p) return 'new';
    if (p.nextReviewDate && p.nextReviewDate > Date.now()) return 'waiting';
    return p.nextReviewDate && p.nextReviewDate <= Date.now() ? 'needs_review' : 'new';
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // --- 4. УМНАЯ ВЫБОРКА (ВСЕГДА 10 ШТУК) ---
  const sections = useMemo(() => {
    if (searchQuery) {
      const filtered = idioms.filter(i => 
        i.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { daily: filtered, isSearch: true };
    }

    // Приоритеты: Повторение -> Новые -> Остальные
    const toReview = idioms.filter(i => getIdiomStatus(i.id) === 'needs_review');
    const neverLearned = idioms.filter(i => getIdiomStatus(i.id) === 'new');
    const learnedWaiting = idioms.filter(i => getIdiomStatus(i.id) === 'waiting');

    // Собираем всё в один список
    const fullPool = [...toReview, ...neverLearned, ...learnedWaiting];

    // Перемешиваем на основе сида
    const shuffled = [...fullPool].sort(() => 0.5 - Math.random());
    
    // Возвращаем первые 10
    return { daily: shuffled.slice(0, 10), isSearch: false };
  }, [searchQuery, progressMap, refreshSeed]);

  // --- 5. ЛОГИКА АВТО-ПЕРЕХОДА (ПОТОК) ---
  const handleNextIdiom = () => {
    if (!practiceIdiom) return;
    const currentIndex = sections.daily.findIndex(i => i.id === practiceIdiom.id);
    
    if (currentIndex !== -1 && currentIndex < sections.daily.length - 1) {
      const next = sections.daily[currentIndex + 1];
      
      // Сначала закрываем режим ТЕСТА
      setIsPracticing(false);
      
      // Переключаем контент КАРТОЧКИ (Detail View остается открытым)
      setTimeout(() => {
        setPracticeIdiom(next);
        (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
      }, 100);
    } else {
      // Подборка закончилась
      setIsPracticing(false);
      setIsDetailView(false);
      setPracticeIdiom(null);
      (window as any).Telegram?.WebApp?.showAlert("¡Felicidades! Ты прошла всю подборку на сегодня! 🎉");
    }
  };

  const learnedTotal = Object.values(progressMap).filter(p => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#141414] text-white select-none overflow-x-hidden font-sans">
      <Header streak={streak} onProfileClick={() => setIsProfileOpen(true)} />

      <main className="px-6 pb-32">
        <div className="pt-6 mb-8 sticky top-[72px] z-30 bg-[#141414]/95 backdrop-blur-sm pb-2">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" placeholder="Найти идиому..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#222] border-none rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-600 outline-none"
            />
          </div>
        </div>

        <ProgressBar learned={learnedTotal} total={idioms.length} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-black uppercase tracking-[0.3em] text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600 fill-current" />
              {sections.isSearch ? 'Результаты' : 'Подборка на сегодня'}
            </h3>
            {!sections.isSearch && (
              <button 
                onClick={() => {
                  setRefreshSeed(s => s + 1);
                  (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                }}
                className="p-3 bg-white/5 rounded-full"
              >
                <RefreshCw className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sections.daily.map(idiom => (
              <IdiomCard 
                key={idiom.id} 
                idiom={idiom} 
                status={getIdiomStatus(idiom.id)} 
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }} 
              />
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isProfileOpen && (
          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            isPremium={isPremium}
            stats={{ learnedCount: learnedTotal, totalCount: idioms.length, streak: streak }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id} // Ключ для анимации смены идиом
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
          >
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414]" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-6 left-6 bg-black/60 px-4 py-2 rounded-full border border-white/10 text-white flex items-center gap-2">
                 <ArrowLeft className="w-5 h-5" />
                 <span className="text-xs font-bold uppercase tracking-widest">Назад</span>
               </button>
             </div>

             <div className="max-w-2xl mx-auto px-6 pb-20 -mt-16 relative z-10 text-center">
               <h2 className="text-4xl font-black mb-2 tracking-tighter">{practiceIdiom.expression}</h2>
               <p className="text-green-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               
               <div className="flex justify-center gap-4 mb-10">
                 <button onClick={() => speak(practiceIdiom.expression)} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10">
                   <Volume2 className="w-6 h-6 text-red-500" />
                 </button>
               </div>

               <button className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-transform" onClick={() => setIsPracticing(true)}>
                 {getIdiomStatus(practiceIdiom.id) === 'needs_review' ? 'ПОВТОРИТЬ' : 'УЧИТЬ'}
               </button>
             </div>

             <AnimatePresence>
               {isPracticing && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#141414]">
                   <IdiomPractice
                     idiom={practiceIdiom}
                     onClose={() => setIsPracticing(false)}
                     onFullyLearned={() => { 
                      const current = progressMap[practiceIdiom.id] || { completedExercises: [], isLearned: false, reviewStep: 0 };
                      (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
                      
                      setProgressMap(prev => ({
                        ...prev,
                        [practiceIdiom.id]: {
                          completedExercises: [], isLearned: true,
                          reviewStep: current.reviewStep + 1,
                          nextReviewDate: calculateNextReview(current.reviewStep)
                        }
                      }));
                      
                      // После успешного теста — идем к следующей КАРТОЧКЕ
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

const IdiomCard = ({ idiom, status, onClick }: { idiom: Idiom, status: string, onClick: () => void }) => (
  <motion.div 
    whileTap={{ scale: 0.96 }} 
    onClick={() => {
      onClick();
      (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    }}
    className="aspect-[16/10] rounded-xl overflow-hidden relative bg-[#222] border border-white/5 shadow-lg group"
  >
    <img src={idiom.imageUrl} loading="lazy" className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${status === 'waiting' ? 'opacity-20 grayscale' : 'opacity-70'}`} />
    <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-4">
      <p className="font-bold text-sm leading-tight">{idiom.expression}</p>
    </div>
    {status === 'needs_review' && (
      <div className="absolute top-3 right-3 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
      </div>
    )}
  </motion.div>
);

export default Index;
