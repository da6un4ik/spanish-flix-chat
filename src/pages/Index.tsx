import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { idioms, Idiom } from '@/data/idioms';
import { Search, X, Volume2, Calendar, Clock } from 'lucide-react';

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
  const [streak, setStreak] = useState(0);

  // 1. Озвучка
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // 2. Загрузка данных и расчет Стрика
  useEffect(() => {
    // Загрузка прогресса идиом
    const savedProgress = localStorage.getItem('spanish-flix-progress-v3');
    if (savedProgress) {
      try { setProgressMap(JSON.parse(savedProgress)); } catch (e) { console.error(e); }
    }

    // Логика Стрика
    const savedStreak = localStorage.getItem('spanish-flix-streak') || '0';
    const lastDate = localStorage.getItem('spanish-flix-last-date');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    if (lastDate) {
      const last = parseInt(lastDate);
      const diff = (today - last) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        setStreak(parseInt(savedStreak));
      } else if (diff > 1) {
        setStreak(0);
        localStorage.setItem('spanish-flix-streak', '0');
      } else {
        setStreak(parseInt(savedStreak));
      }
    }
    localStorage.setItem('spanish-flix-last-date', today.toString());
  }, []);

  // 3. Сохранение прогресса
  useEffect(() => {
    localStorage.setItem('spanish-flix-progress-v3', JSON.stringify(progressMap));
  }, [progressMap]);

  // 4. Интервальные повторения (1, 3, 7, 30 дней)
  const calculateNextReview = (currentStep: number) => {
    const intervals = [1, 3, 7, 30, 90];
    const daysToAdd = intervals[currentStep] || 120;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.getTime();
  };

  const handleCompleteIdiom = (id: string) => {
    const current = progressMap[id] || { completedExercises: [], isLearned: false, reviewStep: 0 };
    const nextStep = current.reviewStep + 1;
    
    // Обновляем карту прогресса
    setProgressMap(prev => ({
      ...prev,
      [id]: {
        completedExercises: [], 
        isLearned: true,
        reviewStep: nextStep,
        nextReviewDate: calculateNextReview(current.reviewStep)
      }
    }));

    // Обновляем стрик
    const lastUpdate = localStorage.getItem('spanish-flix-streak-updated');
    const todayStr = new Date().toDateString();
    
    if (lastUpdate !== todayStr) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('spanish-flix-streak', newStreak.toString());
      localStorage.setItem('spanish-flix-streak-updated', todayStr);
    }
  };

  const getIdiomStatus = (id: string) => {
    const p = progressMap[id];
    if (!p) return 'new';
    if (p.nextReviewDate && p.nextReviewDate > Date.now()) return 'waiting';
    if (p.nextReviewDate && p.nextReviewDate <= Date.now()) return 'needs_review';
    return 'new';
  };

  // 5. Поиск и фильтрация
  const sections = useMemo(() => {
    const filtered = idioms.filter(i => 
      i.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      toReview: filtered.filter(i => getIdiomStatus(i.id) === 'needs_review'),
      others: filtered.filter(i => getIdiomStatus(i.id) !== 'needs_review')
    };
  }, [searchQuery, progressMap]);

  const onDragEnd = (event: any, info: any) => {
    if (info.offset.x > 80) {
      if (isPracticing) setIsPracticing(false);
      else if (isDetailView) setIsDetailView(false);
    }
  };

  const learnedTotal = Object.values(progressMap).filter(p => p.isLearned).length;

  return (
    <motion.div 
      className="min-h-screen bg-[#141414] text-white select-none"
      drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd}
    >
      <Header streak={streak} />

      <main className="px-6 pb-32">
        {/* ПОИСК */}
        <div className="pt-6 mb-8 sticky top-[72px] z-30 bg-[#141414]/95 backdrop-blur-sm pb-2">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" placeholder="Найти идиому..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#222] border-none rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all shadow-2xl"
            />
          </div>
        </div>

        <ProgressBar learned={learnedTotal} total={idioms.length} />

        {/* СЕКЦИЯ: НУЖНО ПОВТОРИТЬ */}
        {sections.toReview.length > 0 && (
          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-red-500 font-bold mb-6 uppercase tracking-[0.2em] text-xs">
              <Clock className="w-4 h-4" /> Пора повторить
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sections.toReview.map(idiom => (
                <IdiomCard key={idiom.id} idiom={idiom} status="needs_review" onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }} />
              ))}
            </div>
          </div>
        )}

        {/* СЕКЦИЯ: ВСЕ ОСТАЛЬНЫЕ */}
        <div className="mt-12">
          <h3 className="text-gray-500 font-bold mb-6 uppercase tracking-[0.2em] text-xs">
            {searchQuery ? 'Результаты поиска' : 'Твоя библиотека'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections.others.map(idiom => (
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

      {/* ДЕТАЛЬНЫЙ ПРОСМОТР */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
          >
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
               <button onClick={() => setIsDetailView(false)} className="absolute top-6 left-6 bg-black/40 p-2 rounded-full backdrop-blur-md">
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-2xl mx-auto px-6 pb-20 -mt-16 relative z-10">
               <div className="flex items-center gap-4 mb-4">
                 <h2 className="text-4xl font-black tracking-tighter">{practiceIdiom.expression}</h2>
                 <button onClick={() => speak(practiceIdiom.expression)} className="p-3 bg-red-600/20 rounded-full hover:bg-red-600/30 transition active:scale-90 shadow-lg shadow-red-600/10">
                   <Volume2 className="w-6 h-6 text-red-500" />
                 </button>
               </div>
               
               <p className="text-green-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-10 relative group shadow-inner">
                 <p className="text-[10px] text-gray-500 uppercase font-black mb-3 tracking-widest">Контекст</p>
                 <p className="text-xl font-serif italic text-gray-100 leading-relaxed pr-8">"{practiceIdiom.example}"</p>
                 <button onClick={() => speak(practiceIdiom.example)} className="absolute right-6 bottom-6 text-gray-500 hover:text-white transition">
                   <Volume2 className="w-4 h-4" />
                 </button>
               </div>

               {getIdiomStatus(practiceIdiom.id) === 'waiting' && (
                 <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 flex items-center gap-3 text-sm">
                   <Calendar className="w-4 h-4" />
                   <span>Вы уже учили это. Повторение скоро появится.</span>
                 </div>
               )}

               <button 
                  className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl hover:bg-red-700 transition shadow-xl shadow-red-600/30 active:scale-[0.98]"
                  onClick={() => setIsPracticing(true)}
               >
                 {getIdiomStatus(practiceIdiom.id) === 'needs_review' ? 'ПОВТОРИТЬ' : 'УЧИТЬ'}
               </button>
               <p className="text-center text-gray-600 text-[10px] mt-6 uppercase tracking-[0.3em]">свайпните вправо для возврата</p>
             </div>

             {/* ПРАКТИКА */}
             {isPracticing && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#141414]">
                 <IdiomPractice
                   idiom={practiceIdiom}
                   onClose={() => setIsPracticing(false)}
                   onFullyLearned={() => { 
                     handleCompleteIdiom(practiceIdiom.id);
                     setIsPracticing(false); 
                     setIsDetailView(false); 
                   }}
                   completedExercises={new Set()} 
                   onExerciseComplete={() => {}} 
                 />
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Компонент карточки для сетки
const IdiomCard = ({ idiom, status, onClick }: { idiom: Idiom, status: string, onClick: () => void }) => (
  <motion.div 
    whileTap={{ scale: 0.96 }} 
    onClick={onClick} 
    className="aspect-[16/10] rounded-xl overflow-hidden relative cursor-pointer bg-[#222] border border-white/5 shadow-lg group"
  >
    <img 
      src={idiom.imageUrl} 
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${status === 'waiting' ? 'opacity-20 grayscale' : 'opacity-70'}`} 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-4">
      <p className="font-bold text-sm sm:text-base leading-tight tracking-tight">{idiom.expression}</p>
    </div>
    
    {status === 'waiting' && (
      <div className="absolute top-3 right-3 bg-white/10 px-2 py-1 rounded-md text-[9px] font-black uppercase backdrop-blur-md border border-white/10 text-gray-400">
        Выучено
      </div>
    )}
    
    {status === 'needs_review' && (
      <div className="absolute top-3 right-3 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-sm"></span>
      </div>
    )}
  </motion.div>
);

export default Index;
