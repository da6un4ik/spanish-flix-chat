import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomCard } from '@/components/IdiomCard';
import { ModeSelector, AppMode } from '@/components/ModeSelector';
import { FlashCard } from '@/components/FlashCard';
import { QuizMode } from '@/components/QuizMode';
import { IdiomPractice } from '@/components/IdiomPractice';
import { idioms, categories, Idiom } from '@/data/idioms';
import { Home, Layers, Settings, Play, X, Info } from 'lucide-react';

interface IdiomProgressState {
  completedExercises: Set<string>;
  isLearned: boolean;
}

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, IdiomProgressState>>({});
  const [currentMode, setCurrentMode] = useState<AppMode>('browse');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);

  // Функция для генерации авто-картинки на лету
  const getAutoImage = (idiom: Idiom) => {
    if (idiom.imageUrl) return idiom.imageUrl;
    // Используем ключевые слова для более точного поиска
    const query = encodeURIComponent(idiom.expression + " spanish culture");
    return `https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=800&auto=format&fit=crop`; 
    // Заглушка, если API не вернет динамику, но ниже в коде используем динамический URL:
  };

  const dynamicImg = (term: string) => `https://source.unsplash.com/featured/800x450/?${encodeURIComponent(term)}`;

  // --- LOCAL STORAGE LOGIC ---
  useEffect(() => {
    const saved = localStorage.getItem('spanish-flix-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored: Record<string, IdiomProgressState> = {};
        Object.keys(parsed).forEach(id => {
          restored[id] = { ...parsed[id], completedExercises: new Set(parsed[id].completedExercises) };
        });
        setProgressMap(restored);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const dataToSave: Record<string, any> = {};
    Object.keys(progressMap).forEach(id => {
      dataToSave[id] = { ...progressMap[id], completedExercises: Array.from(progressMap[id].completedExercises) };
    });
    localStorage.setItem('spanish-flix-progress', JSON.stringify(dataToSave));
  }, [progressMap]);

  const getProgress = (idiomId: string) => 
    progressMap[idiomId] || { completedExercises: new Set(), isLearned: false };

  const handleOpenDetail = (idiom: Idiom) => {
    setPracticeIdiom(idiom);
    setIsDetailView(true);
  };

  const handleCloseDetail = () => {
    setIsDetailView(false);
    setPracticeIdiom(null);
  };

  // --- SWIPE LOGIC ---
  const onDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) { // Если свайпнули вправо больше чем на 100px
      if (isDetailView) handleCloseDetail();
      else if (currentMode !== 'browse') setCurrentMode('browse');
    }
  };

  const featuredIdiom = idioms[0];
  const learnedCount = Object.values(progressMap).filter(p => p.isLearned).length;

  const renderBrowseMode = () => (
    <div className="space-y-10 pb-32">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`} 
          className="w-full h-full object-cover"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute bottom-16 left-8 right-8 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">TOP 1</span>
            <span className="text-white font-bold text-sm tracking-widest uppercase">Идиома дня</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter italic">
            {featuredIdiom.expression}
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={() => handleOpenDetail(featuredIdiom)}
              className="bg-white text-black px-8 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-gray-200 transition"
            >
              <Play className="fill-current w-5 h-5" /> Смотреть
            </button>
            <button 
              onClick={() => handleOpenDetail(featuredIdiom)}
              className="bg-gray-500/50 text-white px-8 py-2 rounded-md font-bold flex items-center gap-2 backdrop-blur-md hover:bg-gray-500/70 transition"
            >
              <Info className="w-5 h-5" /> Подробнее
            </button>
          </div>
        </div>
      </section>

      {/* PROGRESS BAR */}
      <div className="px-8 -mt-10 relative z-20">
         <ProgressBar learned={learnedCount} total={idioms.length} />
      </div>

      {/* CATEGORY ROWS */}
      {categories.slice(1).map((cat) => (
        <div key={cat} className="pl-8 group">
          <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">{cat}</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pr-8 scroll-smooth">
            {idioms.filter(i => i.category === cat).map(idiom => (
              <motion.div 
                key={idiom.id}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                onClick={() => handleOpenDetail(idiom)}
                className="flex-none w-48 md:w-64 aspect-video rounded-lg overflow-hidden relative cursor-pointer shadow-2xl bg-[#2f2f2f]"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1555621422-969249333da0?auto=format&fit=crop&w=400&q=60`} 
                  className="w-full h-full object-cover" 
                  alt={idiom.expression} 
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-white font-bold text-sm drop-shadow-md">{idiom.expression}</p>
                </div>
                {getProgress(idiom.id).isLearned && (
                   <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 shadow-lg">
                     <X className="w-3 h-3 text-white rotate-45" />
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-[#141414] text-white overflow-x-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
    >
      <Header streak={learnedCount} />

      <main>
        <div className="px-8 mt-4 mb-4">
          <ModeSelector currentMode={currentMode} onModeChange={setCurrentMode} />
        </div>

        {currentMode === 'browse' ? renderBrowseMode() : (
          <div className="p-8">
            {currentMode === 'flashcards' && <FlashCard idioms={idioms} learnedIds={new Set()} onLearn={() => {}} />}
            {currentMode === 'quiz' && <QuizMode idioms={idioms.slice(0, 5)} onLearn={() => {}} />}
          </div>
        )}
      </main>

      {/* DETAIL OVERLAY (Netflix Style) */}
      <AnimatePresence>
        {isDetailView && practiceIdiom && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-[#181818] overflow-y-auto"
          >
             <div className="relative h-[50vh]">
               <img src={`https://images.unsplash.com/photo-1461397821064-32d6b3c91b9f?auto=format&fit=crop&w=1000&q=80`} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
               <button onClick={handleCloseDetail} className="absolute top-6 right-6 bg-black/60 p-3 rounded-full hover:bg-white/20 transition">
                 <X className="w-6 h-6" />
               </button>
             </div>
             
             <div className="max-w-4xl mx-auto px-8 -mt-20 relative z-10 pb-20">
               <h2 className="text-6xl font-black mb-4 tracking-tighter">{practiceIdiom.expression}</h2>
               <div className="flex items-center gap-4 mb-8">
                 <span className="text-green-400 font-bold text-xl">98% Match</span>
                 <span className="text-gray-400 border border-gray-400 px-2 py-0.5 text-xs">A1-C1</span>
                 <span className="text-gray-400">2025</span>
               </div>
               
               <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
                 <span className="text-gray-500 italic block text-sm uppercase tracking-widest mb-2">Значение:</span>
                 {practiceIdiom.meaning}
               </p>
               
               <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-10 shadow-inner">
                 <p className="text-xs text-red-500 uppercase font-black mb-3 tracking-widest">Пример в контексте</p>
                 <p className="text-3xl font-serif italic text-white leading-tight">"{practiceIdiom.example}"</p>
               </div>

               <button 
                  className="w-full bg-red-600 py-5 rounded-xl font-black text-2xl hover:bg-red-700 transition transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-600/30"
                  onClick={() => { /* Тут запуск упражнения */ }}
               >
                 НАЧАТЬ ТРЕНИРОВКУ
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-[#141414] to-transparent pt-10 pb-6 px-10 z-40">
        <div className="flex justify-around max-w-md mx-auto items-center">
          <button onClick={() => setCurrentMode('browse')} className={`flex flex-col items-center transition-all ${currentMode === 'browse' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <Home className="w-7 h-7" />
            <span className="text-[10px] mt-1 font-bold">Главная</span>
          </button>
          <button onClick={() => setCurrentMode('flashcards')} className={`flex flex-col items-center transition-all ${currentMode === 'flashcards' ? 'text-white scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
            <Layers className="w-7 h-7" />
            <span className="text-[10px] mt-1 font-bold">Карточки</span>
          </button>
          <button className="flex flex-col items-center text-gray-700 cursor-not-allowed">
            <Settings className="w-7 h-7" />
            <span className="text-[10px] mt-1 font-bold">Настройки</span>
          </button>
        </div>
      </nav>
    </motion.div>
  );
};

export default Index;
