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

  // 1. Инициализация при запуске
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
    
    const initialProgress = savedProgress ? JSON.parse(savedProgress) : {};
    setProgressMap(initialProgress);
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    // АВТО-ОТКРЫТИЕ ПРИ ЗАПУСКЕ: Ищем рандомную НЕизученную
    const unlearned = idioms.filter(i => !initialProgress[i.id]);
    if (unlearned.length > 0) {
      const startIdiom = unlearned[Math.floor(Math.random() * unlearned.length)];
      setSelectedIdiom(startIdiom);
    } else {
      // Если все выучено, берем любую
      setSelectedIdiom(idioms[Math.floor(Math.random() * idioms.length)]);
    }

    window.speechSynthesis.getVoices();
  }, []);

  // 2. Умная функция поиска следующей карточки
  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    
    if (unlearned.length > 0) {
      // Выбираем СЛУЧАЙНУЮ из неизученных
      return unlearned[Math.floor(Math.random() * unlearned.length)];
    } else {
      // Если новых нет, берем просто следующую по списку для повторения
      const currentIndex = idioms.findIndex(i => i.id === currentId);
      return idioms[(currentIndex + 1) % idioms.length];
    }
  }, []);

  // 3. Сохранение прогресса
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

  // Фильтр для поиска
  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark class='bg-yellow-400 text-black'>$1</mark>");
  };

  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return idiom.expression.toLowerCase().includes(q) || idiom.meaning.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modismo Pro</h1>
        <button onClick={() => setIsProfileOpen(true)} className="px-4 py-2 bg-white/10 rounded-xl transition active:scale-95">
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* IDIOMA DEL DÍA (Блок на главном экране) */}
      {!selectedIdiom && !practiceIdiom && (
        <div className="bg-white/10 rounded-2xl p-4 mt-4 border border-white/5 animate-in fade-in">
          <p className="text-xs text-blue-400 font-bold uppercase mb-2">Continuar aprendizaje</p>
          <h2 className="text-2xl font-bold mb-4">¿Listo para una nueva frase?</h2>
          <button 
            onClick={() => {
              const next = getNextUnlearned("", progressMap);
              setSelectedIdiom(next);
            }} 
            className="w-full bg-blue-600 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20"
          >
            Siguiente reto 🚀
          </button>
        </div>
      )}

      {/* PROFILE */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }}
        favorites={favorites}
        onSelectIdiom={(id) => {
          setSelectedIdiom(idioms.find(i => i.id === id));
          setIsProfileOpen(false);
        }}
        user={tgUser}
        idioms={idioms}
      />

      {/* КАРТОЧКА ИДИОМЫ */}
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

      {/* ПРАКТИКА (ОБНОВЛЕННАЯ ЛОГИКА ONFINISH) */}
      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            // 1. Сразу создаем актуальный стейт прогресса
            const newProgress = { ...progressMap, [practiceIdiom.id]: true };
            
            // 2. Обновляем и сохраняем
            setProgressMap(newProgress);
            localStorage.setItem("modismo-pro", JSON.stringify(newProgress));

            // 3. Выбираем следующую на основе НОВОГО прогресса
            const next = getNextUnlearned(practiceIdiom.id, newProgress);
            
            setPracticeIdiom(null);
            setSelectedIdiom(next);
          }}
        />
      )}

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
