import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import Paywall from "../components/Paywall"; // Импортируем

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // --- НОВОЕ: СОСТОЯНИЯ ПЕЙВОЛА ---
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const savedViews = parseInt(localStorage.getItem("modismo-views") || "0");
    
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
    setProgressMap(initialProgress);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    setIsPro(savedIsPro);
    setViewCount(savedViews);

    // Авто-старт: первая карточка при запуске всегда доступна
    const unlearned = idioms.filter(i => !initialProgress[i.id]);
    const startIdiom = unlearned.length > 0 
      ? unlearned[Math.floor(Math.random() * unlearned.length)] 
      : idioms[0];
    
    setSelectedIdiom(startIdiom);
    
    // Считаем этот первый просмотр, если не Pro
    if (!savedIsPro) {
      const newCount = savedViews + 1;
      setViewCount(newCount);
      localStorage.setItem("modismo-views", newCount.toString());
    }

    window.speechSynthesis.getVoices();
  }, []);

  // --- НОВОЕ: ФУНКЦИЯ ПРОВЕРКИ ЛИМИТА ---
  const checkLimit = (action: () => void) => {
    if (isPro) {
      action();
    } else if (viewCount >= 3) {
      setShowPaywall(true);
    } else {
      const newCount = viewCount + 1;
      setViewCount(newCount);
      localStorage.setItem("modismo-views", newCount.toString());
      action();
    }
  };

  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    if (unlearned.length > 0) {
      return unlearned[Math.floor(Math.random() * unlearned.length)];
    } else {
      const currentIndex = idioms.findIndex(i => i.id === currentId);
      return idioms[(currentIndex + 1) % idioms.length];
    }
  }, []);

  const markAsLearned = (id: string) => {
    setProgressMap((prev) => {
      const updated = { ...prev, [id]: true };
      localStorage.setItem("modismo-pro", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("modismo-favs", JSON.stringify(updated));
      return updated;
    });
  };

  const openVideo = (idiom: any) => {
    if (idiom.videoUrl) setVideoSrc(idiom.videoUrl);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modismo Pro</h1>
          {!isPro && <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Gratis: {3 - viewCount} restantes</p>}
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="px-4 py-2 bg-white/10 rounded-2xl border border-white/5 active:scale-95 transition">
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* ГЛАВНЫЙ ЭКРАН */}
      {!selectedIdiom && !practiceIdiom && (
        <div className="bg-white/10 rounded-3xl p-6 mt-4 border border-white/5">
          <h2 className="text-2xl font-bold mb-2 text-center text-white">¡Sigue así! 🚀</h2>
          <button 
            onClick={() => checkLimit(() => setSelectedIdiom(getNextUnlearned("", progressMap)))} 
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-lg mt-4"
          >
            Continuar aprendiendo
          </button>
        </div>
      )}

      {/* МОДАЛКИ */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }}
        favorites={favorites}
        onSelectIdiom={(id) => checkLimit(() => {
          setSelectedIdiom(idioms.find(i => i.id === id));
          setIsProfileOpen(false);
        })}
        user={tgUser}
        idioms={idioms}
        progressMap={progressMap}
      />

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={!!progressMap[selectedIdiom.id]}
          onNext={() => checkLimit(() => {
            const next = getNextUnlearned(selectedIdiom.id, progressMap);
            setSelectedIdiom(next);
          })}
          onHome={() => setSelectedIdiom(null)}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onOpenVideo={() => openVideo(selectedIdiom)}
        />
      )}

      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            const newProgress = { ...progressMap, [practiceIdiom.id]: true };
            setProgressMap(newProgress);
            localStorage.setItem("modismo-pro", JSON.stringify(newProgress));
            setPracticeIdiom(null);
            
            // После практики проверяем лимит перед следующей
            checkLimit(() => setSelectedIdiom(getNextUnlearned(practiceIdiom.id, newProgress)));
          }}
        />
      )}

      {/* PAYWALL */}
      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={() => {
            setIsPro(true);
            localStorage.setItem("modismo-is-pro", "true");
            setShowPaywall(false);
          }} 
        />
      )}

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
