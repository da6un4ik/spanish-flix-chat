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

  // --- ЛОГИКА ПЕЙВОЛА ---
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const savedViews = parseInt(localStorage.getItem("modismo-total-views") || "0");
    
    setProgressMap(savedProgress ? JSON.parse(savedProgress) : {});
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    setIsPro(savedIsPro);
    setViewCount(savedViews);

    // Авто-старт при запуске
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
    const unlearned = idioms.filter(i => !initialProgress[i.id]);
    const startIdiom = unlearned.length > 0 ? unlearned[Math.floor(Math.random() * unlearned.length)] : idioms[0];
    
    // ПРОВЕРКА: Если лимит уже исчерпан при старте, не открываем карточку, а копим просмотр
    if (savedViews >= 3 && !savedIsPro) {
      setShowPaywall(true);
    } else {
      setSelectedIdiom(startIdiom);
      if (!savedIsPro) {
        updateViewCount(savedViews + 1);
      }
    }
  }, []);

  // Вспомогательная функция обновления счетчика
  const updateViewCount = (newCount: number) => {
    setViewCount(newCount);
    localStorage.setItem("modismo-total-views", newCount.toString());
  };

  // Функция проверки доступа перед открытием
  const checkAccess = (action: () => void) => {
    if (isPro) {
      action();
      return;
    }
    if (viewCount >= 3) {
      setShowPaywall(true);
    } else {
      updateViewCount(viewCount + 1);
      action();
    }
  };

  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    if (unlearned.length > 0) {
      return unlearned[Math.floor(Math.random() * unlearned.length)];
    }
    const currentIndex = idioms.findIndex(i => i.id === currentId);
    return idioms[(currentIndex + 1) % idioms.length];
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modismo Pro</h1>
        <button onClick={() => setIsProfileOpen(true)} className="px-4 py-2 bg-white/10 rounded-2xl">Perfil</button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* ГЛАВНЫЙ ЭКРАН */}
      {!selectedIdiom && !practiceIdiom && (
        <div className="mt-10 text-center">
          <button 
            onClick={() => checkAccess(() => setSelectedIdiom(getNextUnlearned("", progressMap)))}
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold"
          >
            Ver idioma ({3 - viewCount} gratis)
          </button>
        </div>
      )}

      {/* КАРТОЧКА ИДИОМЫ */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          isFavorite={favorites.includes(selectedIdiom.id)}
          onClose={() => {
            // Если это была 3-я карточка, при закрытии покажем пейвол
            if (viewCount >= 3 && !isPro) {
              setShowPaywall(true);
              setSelectedIdiom(null);
            } else {
              setSelectedIdiom(null);
            }
          }}
          onNext={() => checkAccess(() => {
            setSelectedIdiom(getNextUnlearned(selectedIdiom.id, progressMap));
          })}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onToggleLearned={() => {
            const updated = { ...progressMap, [selectedIdiom.id]: true };
            setProgressMap(updated);
            localStorage.setItem("modismo-pro", JSON.stringify(updated));
          }}
          onToggleFavorite={() => {}}
          onHome={() => setSelectedIdiom(null)}
          onOpenVideo={() => {}}
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
            // Проверка перед следующей карточкой
            checkAccess(() => setSelectedIdiom(getNextUnlearned(practiceIdiom.id, newProgress)));
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
        idioms={idioms}
        progressMap={progressMap}
        user={tgUser}
      />

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
    </div>
  );
};

export default Index;
