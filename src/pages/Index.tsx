import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Search, Volume2, ArrowLeft, RefreshCw, Sparkles, BrainCircuit, Crown } from 'lucide-react';

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
      tg.setBackgroundColor('#0A0A0A');
    }
    const saved = localStorage.getItem('modismo-progress-v1');
    if (saved) { try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); } }
  }, []);

  useEffect(() => {
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    setActiveSessionList(shuffled.slice(0, 10));
  }, [refreshSeed]);

  useEffect(() => {
    localStorage.setItem('modismo-progress-v1', JSON.stringify(progressMap));
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
      (window as any).Telegram?.WebApp?.showAlert("¡Increíble! Сессия MODISMO завершена. ✨");
    }
  };

  const learnedTotal = Object.values(progressMap).filter((p: any) => p.isLearned).length;

  return (
    <motion.div className="min-h-screen bg-[#0A0A0A] text-white select-none font-sans overflow-x-hidden">
      
      {/* ПРЕМИАЛЬНЫЙ ХЕДЕР */}
      <header className="px-6 pt-10 pb-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-40 backdrop-blur-sm">
        <div className="flex flex-col">
          <h1 className="text-4xl font-[900] tracking-[ -0.05em] italic leading-none text-white">
            MODISMO<span className="text-yellow-500 not-italic">.</span>
          </h1>
          <span className="text-[10px] font-bold text-yellow-500/80 tracking-[0.3em] uppercase mt-1">Premium Spanish</span>
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="w-10 h-10 rounded-full border-2 border-yellow-500/30 flex items-center justify-center bg-gradient-to-tr from-yellow-600/20 to-transparent"
        >
          <Crown className="w-5 h-5 text-yellow-500" />
        </button>
      </header>

      <main className="px-6 pb-32">
        <ProgressBar learned={learnedTotal} total={idioms.length} />

        {/* КНОПКА КВИЗА В СТИЛЕ "VIP" */}
        <button 
          onClick={() => {/* логика квиза */}}
          className="w-full mt-8 bg-gradient-to-r from-yellow-600 to-yellow-400 p-[1px] rounded-2xl active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(234,179,8,0.15)]"
        >
          <div className="bg-[#0A0A0A] rounded-[15px] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-6 h-6 text-yellow-500" />
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-widest text-white">Quiz Mode</p>
                <p className="text-[10px] text-gray-500 uppercase">Повторить изученное</p>
              </div>
            </div>
            <span className="text-yellow-500 font-bold text-xs tracking-tighter">START →</span>
          </div>
        </button>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Today's Selection
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="text-gray-500">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {activeSessionList.map((idiom, index) => (
              <motion.div 
                key={`${idiom.id}-${index}`} 
                whileTap={{ scale: 0.95 }}
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="aspect-[16/10] rounded-xl overflow-hidden relative bg-[#151515] border border-white/5 shadow-2xl"
              >
                <img src={idiom.imageUrl} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent flex items-end p-3">
                  <p className="font-bold text-xs tracking-tight uppercase leading-tight">{idiom.expression}</p>
                </div>
                {progressMap[idiom.id]?.isLearned && (
                   <div className="absolute top-2 right-2 p-1 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                      <Crown className="w-2 h-2 text-black" />
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-y-auto"
          >
             <div className="relative h-[50vh]">
               <img src={practiceIdiom.imageUrl} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-8 left-6 bg-white/10 p-3 rounded-full text-white backdrop-blur-xl border border-white/20">
                 <ArrowLeft className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-xl mx-auto px-8 pb-20 -mt-20 relative z-10">
               <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-black rounded uppercase">Premium Phrase</span>
               </div>
               <h2 className="text-5xl font-black mb-4 tracking-tighter leading-[0.9]">{practiceIdiom.expression}</h2>
               <p className="text-yellow-500 font-medium text-xl mb-10 italic opacity-90">{practiceIdiom.meaning}</p>
               
               <div className="flex items-center gap-4 mb-12">
                  <button onClick={() => { /* speak logic */ }} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                    <Volume2 className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    className="flex-1 bg-white text-black py-5 rounded-2xl font-black text-xl active:scale-95 transition-all" 
                    onClick={() => setIsPracticing(true)}
                  >
                    PRACTICE NOW
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
