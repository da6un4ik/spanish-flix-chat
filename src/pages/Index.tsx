import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import Paywall from "../components/Paywall";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // --- СОСТОЯНИЯ ПЕЙВОЛА ---
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  // Вспомогательная функция: Получить текущие просмотры прямо из памяти
  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  // 1. ЕДИНАЯ ФУНКЦИЯ ПРОВЕРКИ ДОСТУПА
  const checkAccess = useCallback((action: () => void) => {
    const currentIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const currentViews = getStoredViews();

    if (currentIsPro) {
      action();
      return;
    }

    if (currentViews >= 3) {
      setShowPaywall(true);
    } else {
      const newCount = currentViews + 1;
      localStorage.setItem("modismo-total-views", newCount.toString());
      setViewCount(newCount);
      action();
    }
  }, []);

  // 2. ИНИЦИАЛИЗАЦИЯ
  useEffect(() => {
    // Настройка Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // Загрузка базовых данных
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedIsPro = localStorage.getItem("modismo-is-pro") === "true";
    
    setIsPro(savedIsPro);
    setViewCount(getStoredViews());
    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    // АВТО-СТАРТ ПРИ ЗАПУСКЕ (через систему доступа)
    checkAccess(() => {
      const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
      const unlearned = idioms.filter(i => !initialProgress[i.id]);
      const startIdiom = unlearned.length > 0 
        ? unlearned[Math.floor(Math.random() * unlearned.length)] 
        : idioms[0];
      setSelectedIdiom(startIdiom);
    });

    window.speechSynthesis.getVoices();
  }, [checkAccess]);

  // 3. ЛОГИКА ПОИСКА СЛЕДУЮЩЕЙ
  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    if (unlearned.length > 0) {
      return unlearned[Math.floor(Math.random() * unlearned.length)];
    }
    const currentIndex = idioms.findIndex(i => i.id === currentId);
    return idioms[(currentIndex + 1) % idioms.length];
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

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modismo Pro</h1>
          {!isPro && (
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">
              Vistas gratis: {viewCount}/3
            </p>
          )}
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)} 
          className="px-4 py-2 bg-white/10 rounded-2xl border border-white/5 active:scale-95 transition"
        >
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* КАРТОЧКА ИДИОМЫ */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          isFavorite={favorites.includes(selectedIdiom.id)}
          onClose={() => {
            // Если уже 3 просмотра, при закрытии покажем пейвол
            if (getStoredViews() >= 3 && !isPro) {
              setShowPaywall(true);
            }
            setSelectedIdiom(null);
          }}
          onNext={() => checkAccess(() => {
            const next = getNextUnlearned(selectedIdiom.id, progressMap);
            setSelectedIdiom(next);
          })}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          onHome={() => setSelectedIdiom(null)}
          onOpenVideo={() => {
            if (selectedIdiom.videoUrl) setVideoSrc(selectedIdiom.videoUrl);
          }}
        />
      )}

      {/* ПРАКТИКА */}
      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            const newProgress = { ...progressMap, [practiceIdiom.id]: true };
            setProgressMap(newProgress);
            localStorage.setItem("modismo-pro", JSON.stringify(newProgress));
            setPracticeIdiom(null);

            checkAccess(() => {
              const next = getNextUnlearned(practiceIdiom.id, newProgress);
              setSelectedIdiom(next);
            });
          }}
        />
      )}

      {/* ПРОФИЛЬ */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }}
        favorites={favorites}
        onSelectIdiom={(id) => checkAccess(() => {
          setSelectedIdiom(idioms.find(i => i.id === id));
          setIsProfileOpen(false);
        })}
        user={tgUser}
        idioms={idioms}
        progressMap={progressMap}
      />

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
