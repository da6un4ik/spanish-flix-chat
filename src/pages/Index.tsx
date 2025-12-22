import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Search, Volume2, Calendar, Clock, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

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
  
  // Состояние для "перемешивания" (чтобы можно было обновить 10 идиом вручную)
  const [refreshSeed, setRefreshSeed] = useState(0);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem('spanish-flix-progress-v4');
    if (savedProgress) {
      try { setProgressMap(JSON.parse(savedProgress)); } catch (e) { console.error(e); }
    }
    const savedStreak = localStorage.getItem('spanish-flix-streak') || '0';
    const lastDate = localStorage.getItem('spanish-flix-last-date');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (lastDate) {
      const last = parseInt(lastDate);
      const diff = (today - last) / (1000 * 60 * 60 * 24);
      if (diff === 1) setStreak(parseInt(savedStreak));
      else if (diff > 1) {
        setStreak(0);
        localStorage.setItem('spanish-flix-streak', '0');
      } else setStreak(parseInt(savedStreak));
    }
    localStorage.setItem('spanish-flix-last-date', today.toString());
  }, []);

  useEffect(() => {
    localStorage.setItem('spanish-flix-progress-v4', JSON.stringify(progressMap));
  }, [progressMap]);

  const calculateNextReview = (currentStep: number) => {
    const intervals = [1, 3, 7, 30, 90];
    const daysToAdd = intervals[currentStep] || 120;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.getTime();
  };

  const getIdiomStatus = (id: string) => {
    const p = progressMap[id];
    if (!p) return 'new';
    if (p.nextReviewDate && p.nextReviewDate > Date.now()) return 'waiting';
    if (p.nextReviewDate && p.nextReviewDate <= Date.now()) return 'needs_review';
    return 'new';
  };

  // --- УМНАЯ ЛОГИКА ВЫБОРА 10 ИДИОМ ---
  const sections = useMemo(() => {
    if (searchQuery) {
      const filtered = idioms.filter(i => 
        i.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { daily: filtered, isSearch: true };
    }

    // 1. Идиомы для повторения (needs_review)
    const toReview = idioms.filter(i => getIdiomStatus(i.id) === 'needs_review');
    
    // 2. Новые идиомы (new)
    const neverLearned = idioms.filter(i => getIdiomStatus(i.id) === 'new');
    
    // 3. Выученные, которые просто ждут (waiting) - берем самые старые
    const learnedWaiting = idioms
      .filter(i => getIdiomStatus(i.id) === 'waiting')
      .sort((a, b) => (progressMap[a.id]?.nextReviewDate || 0) - (progressMap[b.id]?.nextReviewDate || 0));

    // Смешиваем: сначала те что ПОРА повторить, потом НОВЫЕ.
    // Если всё выучено, берем те, что давно не видели.
    let pool = [...toReview, ...neverLearned];
    
    // Если пул пустой или маленький, добавляем из режима ожидания
    if (pool.length < 10) {
      pool = [...pool, ...learnedWaiting];
    }

    // Перемешиваем пул на основе refreshSeed, чтобы пользователь мог нажать "Обновить"
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    
    return {
      daily: shuffled.slice(0, 10),
      isSearch: false
    };
  }, [searchQuery, progressMap, refreshSeed]);

  const learnedTotal = Object.values(progressMap).filter(p => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#141414] text-white select-none overflow-x-hidden">
      <Header streak={streak} onProfileClick={() => setIsProfileOpen(true)} />

      <main className="px-6 pb-32">
        {/* ПОИСК */}
        <div className="pt-6 mb-8 sticky top-[72px] z-30 bg-[#141414]/95 backdrop-blur-sm pb-2">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" placeholder="Найти идиому..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#222] border-none rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
            />
          </div>
        </div>

        <ProgressBar learned={learnedTotal} total={idioms.length} />

        {/* СЕКЦИЯ ДНЯ */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-white font-black uppercase tracking-[0.3em] text-[11px] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600 fill-current" />
                {sections.isSearch ? 'Результаты поиска' : 'Твоя подборка на сегодня'}
              </h3>
              {!sections.isSearch && (
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                  10 случайных фраз для практики
                </p>
              )}
            </div>

            {!sections.isSearch && (
              <button 
                onClick={() => setRefreshSeed(s => s + 1)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition active:rotate-180 duration-500"
                title="Обновить список"
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

      {/* МОДАЛКИ (Profile, Detail, Practice) - оставляем как в предыдущем коде */}
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

      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto">
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-6 left-6 bg-black/60 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 border border-white/10 hover:bg-white/20 transition-all group">
                 <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                 <span className="text-sm font-bold uppercase tracking-wider text-white">Назад</span>
               </button>
             </div>

             <div className="max-w-2xl mx-auto px-6 pb-20 -mt-16 relative z-10">
               <div className="flex items-center gap-4 mb-4">
                 <h2 className="text-4xl font-black tracking-tighter">{practiceIdiom.expression}</h2>
                 <button onClick={() => speak(practiceIdiom.expression)} className="p-3 bg-red-600/20 rounded-full hover:bg-red-600/30 transition">
                   <Volume2 className="w-6 h-6 text-red-500" />
                 </button>
               </div>
               <p className="text-green-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-10 relative">
                 <p className="text-[10px] text-gray-500 uppercase font-black mb-3 tracking-widest">Контекст</p>
                 <p className="text-xl font-serif italic text-gray-100 leading-relaxed pr-8">"{practiceIdiom.example}"</p>
                 <button onClick={() => speak(practiceIdiom.example)} className="absolute right-6 bottom-6 text-gray-500 hover:text-white transition">
                   <Volume2 className="w-4 h-4" />
                 </button>
               </div>
               <button className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition shadow-xl active:scale-[0.98]" onClick={() => setIsPracticing(true)}>
                 {getIdiomStatus(practiceIdiom.id) === 'needs_review' ? 'ПОВТОРИТЬ' : 'УЧИТЬ'}
               </button>
             </div>

             {isPracticing && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#141414]">
                 <IdiomPractice
                   idiom={practiceIdiom}
                   onClose={() => setIsPracticing(false)}
                   onFullyLearned={() => { 
                    const current = progressMap[practiceIdiom.id] || { completedExercises: [], isLearned: false, reviewStep: 0 };
                    setProgressMap(prev => ({
                      ...prev,
                      [practiceIdiom.id]: {
                        completedExercises: [], 
                        isLearned: true,
                        reviewStep: current.reviewStep + 1,
                        nextReviewDate: calculateNextReview(current.reviewStep)
                      }
                    }));
                    setIsPracticing(false); 
                    setIsDetailView(false); 
                   }}
                   completedExercises={new Set()} onExerciseComplete={() => {}} 
                 />
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Компонент карточки (IdiomCard)
const IdiomCard = ({ idiom, status, onClick }: { idiom: Idiom, status: string, onClick: () => void }) => (
  <motion.div 
    whileTap={{ scale: 0.96 }} onClick={onClick} 
    className="aspect-[16/10] rounded-xl overflow-hidden relative cursor-pointer bg-[#222] border border-white/5 shadow-lg group"
  >
    <img 
      src={idiom.imageUrl} 
      loading="lazy"
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${status === 'waiting' ? 'opacity-20 grayscale' : 'opacity-70'}`} 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent flex items-end p-4">
      <p className="font-bold text-sm sm:text-base leading-tight tracking-tight">{idiom.expression}</p>
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
