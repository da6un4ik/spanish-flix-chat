import { useEffect, useState } from "react";
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
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // --- 1. Инициализация Telegram Web App ---
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // --- 2. Загрузка данных из LocalStorage ---
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedStreak = localStorage.getItem("streak");
    const savedLastDay = localStorage.getItem("last-active-day");

    let currentProgress: Record<string, number> = {};
    if (savedProgress) {
      try {
        currentProgress = JSON.parse(savedProgress);
        setProgressMap(currentProgress);
      } catch (e) { console.error("Error loading progress", e); }
    }

    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedStreak) setStreak(JSON.parse(savedStreak));

    // --- 3. Логика Стрика (Серия дней) ---
    const today = new Date().toDateString();
    if (savedLastDay && savedLastDay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (savedLastDay === yesterday) {
        const newStreak = (savedStreak ? JSON.parse(savedStreak) : 0) + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", JSON.stringify(newStreak));
      } else {
        setStreak(0);
        localStorage.setItem("streak", "0");
      }
    }
    localStorage.setItem("last-active-day", today);

    // --- 4. Авто-открытие карточки (Рандомная или Старая) ---
    const timer = setTimeout(() => {
      const unlearned = idioms.filter(i => !currentProgress[i.id]);
      if (unlearned.length > 0) {
        // Есть новые идиомы -> берем случайную
        const random = unlearned[Math.floor(Math.random() * unlearned.length)];
        setSelectedIdiom(random);
      } else {
        // Все выучено -> берем ту, что учили дольше всего назад
        const entries = Object.entries(currentProgress);
        if (entries.length > 0) {
          entries.sort((a, b) => a[1] - b[1]);
          const oldest = idioms.find(i => i.id === entries[0][0]);
          if (oldest) setSelectedIdiom(oldest);
        }
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // --- Функции управления ---
  const toggleLearned = (id: string) => {
    const updated = { ...progressMap };
    if (updated[id]) {
      delete updated[id];
    } else {
      updated[id] = Date.now();
    }
    setProgressMap(updated);
    localStorage.setItem("modismo-pro", JSON.stringify(updated));
  };

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("modismo-favs", JSON.stringify(updated));
  };

  const idiomOfTheDay = idioms[new Date().getDate() % idioms.length];

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modismo Pro</h1>
        <button 
          onClick={() => setIsProfileOpen(true)} 
          className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition"
        >
          Perfil
        </button>
      </div>

      {/* SEARCH */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* IDIOMA DEL DÍA */}
      <div className="bg-white/10 rounded-2xl p-4 mt-4 border border-white/5">
        <img src={idiomOfTheDay.imageUrl} className="w-full h-44 object-cover rounded-xl mb-3 shadow-lg" />
        <p className="text-xs text-blue-400 font-bold tracking-wider uppercase">Idioma del día</p>
        <h2 className="text-2xl font-bold mt-1">{idiomOfTheDay.expression}</h2>
        <p className="text-gray-400 mt-1">{idiomOfTheDay.meaning}</p>
        <button 
          onClick={() => setPracticeIdiom(idiomOfTheDay)} 
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl mt-4 font-bold transition shadow-lg active:scale-95"
        >
          Aprender ahora
        </button>
      </div>

      {/* MODAL: PROFILE */}
      <Profile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length }}
        user={tgUser}
        streak={streak}
        favorites={favorites}
        idioms={idioms}
        onSelectIdiom={(id) => {
          setSelectedIdiom(idioms.find(i => i.id === id));
          setIsProfileOpen(false);
        }}
      />

      {/* MODAL: IDIOM PRACTICE (CARD) */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={!!progressMap[selectedIdiom.id]}
          onClose={() => setSelectedIdiom(null)}
          onHome={() => setSelectedIdiom(null)} // Кнопка Inicio теперь работает
          onToggleLearned={() => toggleLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          onOpenVideo={(i: any) => i.videoUrl && setVideoSrc(i.videoUrl)}
          onOpenPractice={() => { 
            setPracticeIdiom(selectedIdiom); 
            setSelectedIdiom(null); 
          }}
          onNext={() => {
            const idx = idioms.findIndex(i => i.id === selectedIdiom.id);
            setSelectedIdiom(idioms[(idx + 1) % idioms.length]);
          }}
        />
      )}

      {/* MODAL: PRACTICE PAGE (EXERCISES) */}
      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            const idx = idioms.findIndex(i => i.id === practiceIdiom.id);
            setPracticeIdiom(null);
            setSelectedIdiom(idioms[(idx + 1) % idioms.length]);
          }}
        />
      )}

      {/* VIDEO PLAYER OVERLAY */}
      {videoSrc && (
        <VideoPlayer 
          src={videoSrc} 
          onClose={() => setVideoSrc(null)} 
        />
      )}
    </div>
  );
};

export default Index;
