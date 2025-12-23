import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomPractice } from '@/components/IdiomPractice';
import { Profile } from '@/components/Profile';
import { idioms, Idiom } from '@/data/idioms';
import { Volume2, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

const Index = () => {
  const [progressMap, setProgressMap] = useState<Record<string, any>>({});
  const [practiceIdiom, setPracticeIdiom] = useState<Idiom | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);
  
  const [activeSessionList, setActiveSessionList] = useState<Idiom[]>([]);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) { tg.ready(); tg.expand(); }

    const saved = localStorage.getItem('spanish-flix-progress-v4');
    if (saved) {
      try { setProgressMap(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    const shuffled = [...idioms].sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, 10);
    setActiveSessionList(selection);
    console.log("New session list created:", selection.map(i => i.spanish));
  }, [refreshSeed]);

  useEffect(() => {
    if (Object.keys(progressMap).length > 0) {
      localStorage.setItem('spanish-flix-progress-v4', JSON.stringify(progressMap));
    }
  }, [progressMap]);

  const handleNextIdiom = () => {
    if (!practiceIdiom) return;

    const currentIndex = activeSessionList.findIndex(i => i.id === practiceIdiom.id);
    
    console.log(`Finished: ${practiceIdiom.spanish} (Index: ${currentIndex})`);

    if (currentIndex !== -1 && currentIndex < activeSessionList.length - 1) {
      const next = activeSessionList[currentIndex + 1];
      
      console.log(`Moving to next: ${next.spanish}`);

      setIsPracticing(false);
      
      setTimeout(() => {
        setPracticeIdiom(next);
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
    <motion.div className="min-h-screen bg-background text-foreground select-none font-sans">
      <Header streak={0} onProfileClick={() => setIsProfileOpen(true)} />

      <main className="px-6 pb-32">
        <ProgressBar learned={learnedTotal} total={idioms.length} />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-foreground font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary fill-current" />
              Твои 10 идиом на сегодня
            </h3>
            <button onClick={() => setRefreshSeed(s => s + 1)} className="p-2 bg-secondary rounded-full active:rotate-180 transition-transform duration-500">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activeSessionList.map((idiom, index) => (
              <div 
                key={`${idiom.id}-${index}`} 
                onClick={() => { setPracticeIdiom(idiom); setIsDetailView(true); }}
                className="aspect-[16/10] rounded-xl overflow-hidden relative bg-card border border-border cursor-pointer active:scale-95 transition-all"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <span className="text-3xl">🇪🇸</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background flex items-end p-3">
                  <p className="font-bold text-xs leading-tight">{idiom.spanish}</p>
                </div>
                {progressMap[idiom.id]?.isLearned && (
                  <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait">
        {isDetailView && practiceIdiom && (
          <motion.div 
            key={practiceIdiom.id}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background overflow-y-auto"
          >
             <div className="relative h-[40vh] bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center">
               <span className="text-8xl">🇪🇸</span>
               <div className="absolute inset-0 bg-gradient-to-t from-background" />
               <button onClick={() => { setIsDetailView(false); setPracticeIdiom(null); }} className="absolute top-6 left-6 bg-background/50 p-3 rounded-full text-foreground backdrop-blur-md">
                 <ArrowLeft className="w-6 h-6" />
               </button>
             </div>

             <div className="max-w-xl mx-auto px-6 pb-20 -mt-12 relative z-10 text-center">
               <h2 className="text-4xl font-black mb-2 tracking-tighter">{practiceIdiom.spanish}</h2>
               <p className="text-emerald-500 font-bold text-xl mb-8 italic">{practiceIdiom.meaning}</p>
               
               <button onClick={() => {
                 window.speechSynthesis.cancel();
                 const u = new SpeechSynthesisUtterance(practiceIdiom.spanish);
                 u.lang = 'es-ES';
                 window.speechSynthesis.speak(u);
               }} className="mb-10 p-4 bg-secondary rounded-2xl mx-auto block">
                 <Volume2 className="w-6 h-6 text-primary" />
               </button>

               <button 
                className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-black text-xl shadow-[0_0_30px_hsl(var(--primary)/0.3)] active:scale-95 transition-all" 
                onClick={() => setIsPracticing(true)}
               >
                 УЧИТЬ ФРАЗУ
               </button>
             </div>

             <AnimatePresence>
               {isPracticing && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-background">
                   <IdiomPractice
                     idiom={practiceIdiom}
                     onClose={() => setIsPracticing(false)}
                     onFullyLearned={() => { 
                      setProgressMap(prev => ({
                        ...prev,
                        [practiceIdiom.id]: { isLearned: true, lastReview: Date.now() }
                      }));
                      
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
