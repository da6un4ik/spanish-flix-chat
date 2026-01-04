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
  const [progressMap, setProgressMap] = useState<Record<string, number>>({}); // Теперь храним timestamp
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // --- 1. Инициализация Telegram ---
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
    const savedXP = localStorage.getItem("xp");
    const savedStreak = localStorage.getItem("streak");
    const savedLastDay = localStorage.getItem("last-active-day");

    let currentProgress: Record<string, number> = {};
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Обработка миграции со старого формата (boolean -> number)
        currentProgress = Object.keys(parsed).reduce((acc, key) => {
          acc[key] = typeof parsed[key] === 'number' ? parsed[key] : Date.now();
          return acc;
        }, {} as Record<string, number>);
        setProgressMap(currentProgress);
      } catch (e) { console.error("Error parsing progress", e); }
    }

    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedXP) setXp(JSON.parse(savedXP));
    if (savedStreak) setStreak(JSON.parse(savedStreak));

    // --- 3. Логика Streak (Серия дней) ---
    const today = new Date().toDateString();
    if (!savedLastDay) {
      localStorage.setItem("last-active-day", today);
    } else if (savedLastDay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (savedLastDay === yesterday) {
        const newStreak = (savedStreak ? JSON.parse(savedStreak) : 0) + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", JSON.stringify(newStreak));
      } else {
        setStreak(0);
        localStorage.setItem("streak", "0");
      }
      localStorage.setItem("last-active-day", today);
    }

    // --- 4. УМНЫЙ ВЫБОР КАРТОЧКИ ПРИ СТАРТЕ ---
    const selectInitialIdiom = () => {
      const unlearned = idioms.filter(i => !currentProgress[i.id]);

      if (unlearned.length > 0) {
        // Есть неизученные -> случайная
        const random = unlearned[Math.floor(Math.random() * unlearned.length)];
        setSelectedIdiom(random);
      } else {
        // Все изучены -> ищем самую старую (минимальный timestamp)
        const entries = Object.entries(currentProgress);
        if (entries.length > 0) {
          entries.sort((a, b) => a[1] - b[1]);
          const oldestId = entries[0][0];
          const oldestIdiom = idioms.find(i => i.id === oldestId);
          if (oldestIdiom) setSelectedIdiom(oldestIdiom);
        }
      }
    };

    // Задержка для плавности появления
    const timer = setTimeout(selectInitialIdiom, 600);
    return () => clearTimeout(timer);
  }, []);

  // --- Функции управления ---
  const addXP = (amount: number) => {
    const updated = xp + amount;
    setXp(updated);
    localStorage.setItem("xp", JSON.stringify(updated));
    localStorage.setItem("last-active-day", new Date().toDateString());
    
    // Виброотклик Telegram
    (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };

  const toggleLearned = (id: string) => {
    const updated = { ...progressMap };
    if (updated[id]) {
      delete updated[id];
    } else {
      updated[id] = Date.now(); // Сохраняем время изучения
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

  const openIdiom = (idiom: any) => setSelectedIdiom(idiom);
  const openPractice = (idiom: any) => setPracticeIdiom(idiom);

  const openVideo = (idiom: any) => {
    setVideoSrc(idiom.videoUrl || "/videos/default.mp4");
    addXP(5);
  };

  const idiomOfTheDay = idioms[new Date().getDate() % idioms.length];

  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark class='bg-yellow-400 text-black'>$1</mark>");
  };

  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return (
      idiom.expression.toLowerCase().includes(q) ||
      idiom.meaning.toLowerCase().includes(q) ||
      idiom.category.toLowerCase().includes(q)
    );
  });

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

      {/* SEARCH BAR */}
      <div className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* IDIOMA DEL DÍA */}
      <div className="bg-white/10 rounded-2xl p-4 mt-2">
        <img src={idiomOfTheDay.imageUrl} className="w-full h-44 object-cover rounded-xl mb-3" />
        <p className="text-sm text-gray-300">IDIOMA DEL DÍA</p>
        <h2 className="text-2xl font-bold mt-1">{idiomOfTheDay.expression}</h2>
        <p className="text-gray-400 mt-1">{idiomOfTheDay.meaning}</p>
        <div className="flex gap-3 mt-4">
          <button onClick={() => openPractice(idiomOfTheDay)} className="flex-1 bg-blue-600 py-2 rounded-xl font-semibold">
            Aprender ahora
          </button>
          <button onClick={() => openIdiom(idiomOfTheDay)} className="flex-1 bg-white/20 py-2 rounded-xl font-semibold">
            Ver tarjeta
          </button>
        </div>
      </div>

      {/* MODALS & OVERLAYS */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length }}
        favorites={favorites}
        onSelectIdiom={(id) => openIdiom(idioms.find((i) => i.id === id)!)}
        user={tgUser}
        idioms={idioms}
        xp={xp}
        streak={streak}
      />

      {searchQuery.trim() !== "" && (
        <div className="fixed left-0 right-0 top-[110px] bottom-0 bg-black/95 z-50 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Resultados</h2>
          {filteredIdioms.length === 0 && <p className="text-gray-400 text-center mt-10">No se encontraron...</p>}
          <div className="space-y-3">
            {filteredIdioms.map((idiom) => (
              <div key={idiom.id} onClick={() => { openIdiom(idiom); setSearchQuery(""); }} className="p-4 bg-white/10 rounded-xl cursor-pointer">
                <p className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: highlight(idiom.expression, searchQuery) }} />
                <p className="text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: highlight(idiom.meaning, searchQuery) }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => { toggleLearned(selectedIdiom.id); addXP(15); }}
          onToggleFavorite={() => { toggleFavorite(selectedIdiom.id); addXP(3); }}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={!!progressMap[selectedIdiom.id]}
          onNext={() => setSelectedIdiom(idioms[(idioms.findIndex(i => i.id === selectedIdiom.id) + 1) % idioms.length])}
          onHome={() => setSelectedIdiom(null)}
          onOpenPractice={() => { setPracticeIdiom(selectedIdiom); setSelectedIdiom(null); }}
          onOpenVideo={(idiom) => openVideo(idiom)}
        />
      )}

      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            const nextIdx = (idioms.findIndex(i => i.id === practiceIdiom.id) + 1) % idioms.length;
            setPracticeIdiom(null);
            setSelectedIdiom(idioms[nextIdx]);
            addXP(20);
          }}
          addXP={addXP}
        />
      )}

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
