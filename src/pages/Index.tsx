import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Search, Volume2, ArrowLeft, RefreshCw, Sparkles, BrainCircuit } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { 
      tg.ready(); 
      tg.expand();
      tg.setHeaderColor('#0A0A0A');
    }
    const saved = localStorage.getItem('modismo-progress-v4');
    if (saved) { try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); } }
  }, []);

  useEffect(() => {
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    setActiveSessionList(shuffled.slice(0, 10));
  }, [refreshSeed]);

  useEffect(() => {
    localStorage.setItem('modismo-progress-v4', JSON.stringify(progressMap));
  }, [progressMap]);

  const handleNextIdiom = () => {
    if (!practiceIdiom) return;
    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom.id);
    if (currentIndex !== -1 && currentIndex < activeSessionList.length - 1) {
      const next = activeSessionList[currentIndex + 1];
      setIsPracticing(false);
      setTimeout(() => {
        setPracticeIdiom(next);
        (window as any).Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
      }, 100);
    } else {
      setIsPracticing(false);
      setIsDetailView(false);
      setPracticeIdiom(null);
      (window as any).Telegram?.WebApp?.showAlert("¡Hecho! Ты прошла подборку. 🇪🇸");
    }
  };

  const learnedTotal = Object.values(progressMap).filter((p: any) => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#0A0A0A] text-white select-none font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-[#0A0A0A] sticky top-0 z-40 border-b border-white/5">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black italic tracking-tighter leading-none">
            MODISMO<span className="text-red-600 not-italic">.</span>
          </h1>
          <span className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase mt-1">Испанские идиомы</span>
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5"
        >
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
        </button>
      </header>

      <main className="px-6 pb-32">
        <ProgressBar learned={learnedTotal} total={idioms.length} />

        {/* QUIZ BUTTON */}
        <button 
          onClick={() => {/* логика квиза */}}
          className="w-full mt-8 bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl flex items-center justify-between active:scale-95 transition-all"
        >
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-red-600" />
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-widest">Режим Квиза</p>
              <p className="text-[10px] text-gray-500 uppercase">Повтор изученного</p>
            </div>
          </div>
          <span className="text-red-600 font-bold text-xs underline decoration-2 underline-offset-4">START</span>
        </button>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-red-600" />
              Подборка на сегодня
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="text-gray-600">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {activeSessionList.map((idiom, index) => (
              <motion.div 
                key={`${idiom.id}-${index}`} 
                whileTap={{ scale: 0.95 }}
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="aspect-[16/10] rounded-xl overflow-hidden relative bg-[#111] border border-white/5 shadow-2xl"
              >
                <img src={idiom.imageUrl} className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-3">
                  <p className="font-bold text-[13px] leading-tight text-white drop-shadow-lg">{idiom.expression}</p>
                </div>
                {progressMap[idiom.id]?.isLearned && (
                   <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* DETAIL VIEW */}
      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto"
          >
             <div className="relative h-[45vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-8 left-6 bg-black/50 p-3 rounded-full text-white backdrop-blur-md border border-white/10">
                 <ArrowLeft className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-xl mx-auto px-8 pb-20 -mt-16 relative z-10">
               <h2 className="text-4xl font-black mb-2 tracking-tighter leading-tight text-white">{practiceIdiom.expression}</h2>
               <p className="text-red-600 font-bold text-xl mb-6">{practiceIdiom.meaning}</p>
               
               {/* НОВЫЙ БЛОК: ПРИМЕР */}
               <div className="bg-white/5 border-l-2 border-red-600 p-4 mb-10 rounded-r-xl">
                  <p className="text-xs text-gray-500 uppercase font-black mb-1">Пример использования:</p>
                  <p className="text-gray-200 italic font-medium leading-relaxed">
                    "{practiceIdiom.example || 'Пример скоро появится...'}"
                  </p>
               </div>

               <div className="flex items-center gap-4">
                  <button onClick={() => {
                    const u = new SpeechSynthesisUtterance(practiceIdiom.expression);
                    u.lang = 'es-ES';
                    window.speechSynthesis.speak(u);
                  }} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <Volume2 className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    className="flex-1 bg-red-600 text-white py-5 rounded-2xl font-black text-xl active:scale-95 transition-all shadow-lg shadow-red-900/20" 
                    onClick={() => setIsPracticing(true)}
                  >
                    УЧИТЬ
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
    </motion.div>
  );
};

export default Index;
