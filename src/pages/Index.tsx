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

  // --- 1. ИНИЦИАЛИЗАЦИЯ И АВТО-СТАРТ ---
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

    // Загрузка данных (читаем всё синхронно для точности)
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const currentTotalViews = parseInt(localStorage.getItem("modismo-total-views") || "0");
    
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
    
    setProgressMap(initialProgress);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    setIsPro(savedIsPro);
    setViewCount(currentTotalViews);

    // ЛОГИКА АВТО-СТАРТА ПРИ ЗАПУСКЕ
    if (!savedIsPro && currentTotalViews >= 3) {
      // Если лимит уже исчерпан — показываем пейвол сразу, ничего не открывая
      setShowPaywall(true);
    } else {
      // Иначе находим идиому для показа
      const unlearned = idioms.filter(i => !initialProgress[i.id]);
      const startIdiom = unlearned.length > 0 
        ? unlearned[Math.floor(Math.random() * unlearned.length)] 
        : idioms[0];
      
      setSelectedIdiom(startIdiom);

      // Важно: Считаем этот автоматический просмотр
      if (!savedIsPro) {
        const newCount = currentTotalViews + 1;
        localStorage.setItem("modismo-total-views", newCount.toString());
        setViewCount(newCount);
      }
    }

    window.speechSynthesis.getVoices();
  }, []);

  // --- 2. ФУНКЦИЯ ПРОВЕРКИ ДОСТУПА (ГЛАВНЫЙ СТРАЖ) ---
  const checkAccess = (action: () => void) => {
    // Читаем напрямую из localStorage, чтобы избежать лагов стейта
    const currentIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const currentViews = parseInt(localStorage.getItem("modismo-total-views") || "0");

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
  };

  // --- 3. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ---
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

      {/* ГЛАВНЫЙ ЭКРАН (если всё закрыто) */}
      {!selectedIdiom && !practiceIdiom && (
        <div className="bg-white/10 rounded-3xl p-6 mt-4 border border-white/5 text-center animate-in fade-in">
          <h2 className="text-2xl font-bold mb-4">¿Quieres aprender más?</h2>
          <button 
            onClick={() => checkAccess(() => setSelectedIdiom(getNextUnlearned("", progressMap)))} 
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30"
          >
            Siguiente idioma
          </button>
        </div>
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

      {/* КАРТОЧКА ИДИОМЫ */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          isFavorite={favorites.includes(selectedIdiom.id)}
          onClose={() => {
            // Если при закрытии мы видим, что лимит исчерпан — показываем пейвол
            const finalViews = parseInt(localStorage.getItem("modismo-total-views") || "0");
            if (finalViews >= 3 && !isPro) {
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

            // Сразу пытаемся открыть следующую через проверку лимита
            checkAccess(() => {
              const next = getNextUnlearned(practiceIdiom.id, newProgress);
              setSelectedIdiom(next);
            });
          }}
        />
      )}

      {/* ПЕЙВОЛ */}
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
