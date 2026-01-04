import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // --- 1. ЗАГРУЗКА И АВТОМАТИЧЕСКИЙ СТАРТ ---
  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // Загрузка данных из localStorage
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
    setProgressMap(initialProgress);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    // Логика выбора первой карточки при запуске
    const unlearned = idioms.filter(i => !initialProgress[i.id]);
    
    if (unlearned.length > 0) {
      // Выбираем случайную из НЕИЗУЧЕННЫХ
      const startIdiom = unlearned[Math.floor(Math.random() * unlearned.length)];
      setSelectedIdiom(startIdiom);
    } else {
      // Если всё выучено, берем любую случайную
      setSelectedIdiom(idioms[Math.floor(Math.random() * idioms.length)]);
    }

    window.speechSynthesis.getVoices();
  }, []);

  // --- 2. ФУНКЦИЯ ПОИСКА СЛЕДУЮЩЕЙ КАРТОЧКИ ---
  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    // Фильтруем: не изучена + не является текущей
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    
    if (unlearned.length > 0) {
      // Берем случайную из списка новых
      return unlearned[Math.floor(Math.random() * unlearned.length)];
    } else {
      // Если все выучены, идем по кругу
      const currentIndex = idioms.findIndex(i => i.id === currentId);
      return idioms[(currentIndex + 1) % idioms.length];
    }
  }, []);

  // --- 3. УПРАВЛЕНИЕ ПРОГРЕССОМ ---
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

  // --- 4. ПОИСК ---
  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return idiom.expression.toLowerCase().includes(q) || idiom.meaning.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modismo Pro</h1>
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Aprende español real</p>
        </div>
        <button 
          onClick={() => setIsProfileOpen(true)} 
          className="px-4 py-2 bg-white/10 rounded-2xl border border-white/5 active:scale-95 transition"
        >
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* ГЛАВНЫЙ ЭКРАН (показывается только если все модалки закрыты) */}
      {!selectedIdiom && !practiceIdiom && (
        <div className="bg-white/10 rounded-3xl p-6 mt-4 border border-white/5 animate-in fade-in zoom-in duration-500">
          <h2 className="text-2xl font-bold mb-2 text-center">¡Buen trabajo! 🎉</h2>
          <p className="text-gray-400 text-center mb-6">Has revisado las recomendaciones de hoy.</p>
          <button 
            onClick={() => {
              const next = getNextUnlearned("", progressMap);
              setSelectedIdiom(next);
            }} 
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 active:scale-95 transition"
          >
            Continuar aprendiendo
          </button>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ПРОФИЛЯ */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{ 
          learnedCount: Object.keys(progressMap).length, 
          totalCount: idioms.length, 
          streak: 0 
        }}
        favorites={favorites}
        onSelectIdiom={(id) => {
          setSelectedIdiom(idioms.find(i => i.id === id));
          setIsProfileOpen(false);
        }}
        user={tgUser}
        idioms={idioms}
        progressMap={progressMap}
      />

      {/* КАРТОЧКА ИДИОМЫ (ОБУЧЕНИЕ) */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={!!progressMap[selectedIdiom.id]}
          onNext={() => {
            const next = getNextUnlearned(selectedIdiom.id, progressMap);
            setSelectedIdiom(next);
          }}
          onHome={() => setSelectedIdiom(null)}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onOpenVideo={() => openVideo(selectedIdiom)}
        />
      )}

      {/* СТРАНИЦА ПРАКТИКИ (ТЕСТЫ) */}
      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            // Важно: создаем новый объект прогресса для мгновенного обновления
            const newProgress = { ...progressMap, [practiceIdiom.id]: true };
            
            // Сохраняем в стейт и память
            setProgressMap(newProgress);
            localStorage.setItem("modismo-pro", JSON.stringify(newProgress));

            // Ищем следующую на базе ОБНОВЛЕННЫХ данных
            const next = getNextUnlearned(practiceIdiom.id, newProgress);
            
            setPracticeIdiom(null);
            setSelectedIdiom(next);
          }}
        />
      )}

      {/* ПЛЕЕР ВИДЕО */}
      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
