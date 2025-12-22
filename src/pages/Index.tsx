import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { idioms, Idiom } from '@/data/idioms';
import { Search, X, Play } from 'lucide-react';

interface IdiomProgressState {
  completedExercises: Set<string>;
  isLearned: boolean;
}

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, IdiomProgressState>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);

  // Загрузка прогресса из памяти
  useEffect(() => {
    const saved = localStorage.getItem('spanish-flix-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored: Record<string, IdiomProgressState> = {};
        Object.keys(parsed).forEach(id => {
          restored[id] = { 
            isLearned: parsed[id].isLearned, 
            completedExercises: new Set(parsed[id].completedExercises) 
          };
        });
        setProgressMap(restored);
      } catch (e) { console.error(e); }
    }
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    const dataToSave: Record<string, any> = {};
    Object.keys(progressMap).forEach(id => {
      dataToSave[id] = { 
        isLearned: progressMap[id].isLearned, 
        completedExercises: Array.from(progressMap[id].completedExercises) 
      };
    });
    localStorage.setItem('spanish-flix-progress', JSON.stringify(dataToSave));
  }, [progressMap]);

  const getProgress = (idiomId: string) => 
    progressMap[idiomId] || { completedExercises: new Set(), isLearned: false };

  const filteredIdioms = useMemo(() => {
    return idioms.filter(i => 
      i.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Глобальная логика возврата (свайп вправо)
  const onDragEnd = (event: any, info: any) => {
    if (info.offset.x > 80) { // Чувствительность свайпа
      if (isPracticing) {
        setIsPracticing(false);
      } else if (isDetailView) {
        setIsDetailView(false);
        setPracticeIdiom(null);
      }
    }
  };

  const learnedCount = Object.values(progressMap).filter(p => p.isLearned).length;

  return (
    <motion.div 
      className="min-h-screen bg-[#141414] text-white selection:bg-red-600"
      drag="x" 
      dragConstraints={{ left: 0, right: 0 }} 
      onDragEnd={onDragEnd}
    >
      <Header streak={learnedCount} />

      <main className="px-6 pb-20">
        {/* ПОИСК */}
        <div className="pt-6 mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Найти идиому..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#222] border-none rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
            />
          </div>
        </div>

        <ProgressBar learned={learnedCount} total={idioms.length} />

        {/* СЕТКА */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {filteredIdioms.map(idiom => (
            <motion.div 
              key={idiom.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
              className="aspect-video rounded-lg overflow-hidden relative cursor-pointer bg-[#2f2f2f] border border-white/5"
            >
              <img src={idiom.imageUrl} className="w-full h-full object-cover opacity-80" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                <p className="font-bold text-xs sm:text-sm leading-tight">{idiom.expression}</p>
              </div>
              {getProgress(idiom.id).isLearned && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 shadow-lg">
                  <X className="w-3 h-3 text-white rotate-45" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </main>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#141414] overflow-y-auto"
          >
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
               <button 
                onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} 
                className="absolute top-6 left-6 bg-black/40 p-2 rounded-full backdrop-blur-md"
               >
                 <X className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-2xl mx-auto px-6 pb-20 -mt-12 relative z-10">
               <h2 className="text-4xl font-black mb-2 tracking-tight">{practiceIdiom.expression}</h2>
               <p className="text-green-500 font-bold mb-6 italic text-lg">{practiceIdiom.meaning}</p>
               
               <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 shadow-inner">
                 <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">Пример использования</p>
                 <p className="text-xl font-serif italic text-gray-100 leading-snug">"{practiceIdiom.example}"</p>
               </div>

               <button 
                  className="w-full bg-red-600 py-4 rounded-xl font-black text-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20"
                  onClick={() => setIsPracticing(true)}
               >
                 УЧИТЬ
               </button>
               <p className="text-center text-gray-600 text-xs mt-6 uppercase tracking-widest">свайпните вправо, чтобы вернуться</p>
             </div>

             {/* ЭКРАН ПРАКТИКИ */}
             {isPracticing && (
               <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-[#141414]"
               >
                 <IdiomPractice
                   idiom={practiceIdiom}
                   completedExercises={getProgress(practiceIdiom.id).completedExercises}
                   onExerciseComplete={(exId) => {
                     const current = getProgress(practiceIdiom.id);
                     const updated = new Set(current.completedExercises).add(exId);
                     const learned = updated.size === practiceIdiom.exercises.length;
                     setProgressMap(prev => ({...prev, [practiceIdiom.id]: { completedExercises: updated, isLearned: learned }}));
                   }}
                   onClose={() => setIsPracticing(false)}
                   onFullyLearned={() => { setIsPracticing(false); setIsDetailView(false); setPracticeIdiom(null); }}
                 />
               </motion.div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
