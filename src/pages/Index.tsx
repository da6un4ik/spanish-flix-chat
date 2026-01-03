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
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // ⭐ Новые состояния для XP и streak
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

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
    const savedXP = localStorage.getItem("xp");
    const savedStreak = localStorage.getItem("streak");
    const savedLastDay = localStorage.getItem("last-active-day");

    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedXP) setXp(JSON.parse(savedXP));
    if (savedStreak) setStreak(JSON.parse(savedStreak));

    // ⚡ Инициализируем голоса для озвучки
    window.speechSynthesis.getVoices();

    // 🔥 Логика streak по дням
    const today = new Date().toDateString();

    if (!savedLastDay) {
      // Первый запуск — просто записываем сегодня как активный день
      localStorage.setItem("last-active-day", today);
    } else if (savedLastDay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (savedLastDay === yesterday) {
        // Вчера был активный день → продолжаем streak
        const baseStreak = savedStreak ? JSON.parse(savedStreak) : 0;
        const newStreak = baseStreak + 1;
        setStreak(newStreak);
        localStorage.setItem("streak", JSON.stringify(newStreak));
      } else {
        // Пропуск дня → сбрасываем streak
        setStreak(0);
        localStorage.setItem("streak", "0");
      }

      localStorage.setItem("last-active-day", today);
    }
  }, []);

  // ⭐ Функция начисления XP
  const addXP = (amount: number) => {
    const updated = xp + amount;
    setXp(updated);
    localStorage.setItem("xp", JSON.stringify(updated));

    // Любая активность обновляет дату последней активности
    localStorage.setItem("last-active-day", new Date().toDateString());
  };

  const toggleLearned = (id: string) => {
    const updated = { ...progressMap, [id]: !progressMap[id] };
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
    const src = idiom.videoUrl || "/videos/default.mp4";
    setVideoSrc(src);
    // ✅ XP за просмотр видео (например, 5 XP)
    addXP(5);
  };

  const todayIndex = new Date().getDate() % idioms.length;
  const idiomOfTheDay = idioms[todayIndex];

  // ⭐ Подсветка совпадений
  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(
      regex,
      "<mark class='bg-yellow-400 text-black'>$1</mark>"
    );
  };

  // 🔍 Поиск по выражению, значению, примеру и категории
  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return (
      idiom.expression.toLowerCase().includes(q) ||
      idiom.meaning.toLowerCase().includes(q) ||
      idiom.example.toLowerCase().includes(q) ||
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
        <img
          src={idiomOfTheDay.imageUrl}
          className="w-full h-44 object-cover rounded-xl mb-3"
        />

        <p className="text-sm text-gray-300">IDIOMA DEL DÍA</p>
        <h2 className="text-2xl font-bold mt-1">{idiomOfTheDay.expression}</h2>
        <p className="text-gray-400 mt-1">{idiomOfTheDay.meaning}</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => openPractice(idiomOfTheDay)}
            className="flex-1 bg-blue-600 py-2 rounded-xl font-semibold"
          >
            Aprender ahora
          </button>
          <button
            onClick={() => openIdiom(idiomOfTheDay)}
            className="flex-1 bg-white/20 py-2 rounded-xl font-semibold"
          >
            Ver tarjeta
          </button>
        </div>
      </div>

      {/* PROFILE MODAL */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{
          learnedCount: Object.keys(progressMap).length,
          totalCount: idioms.length,
        }}
        favorites={favorites}
        onSelectIdiom={(id) => openIdiom(idioms.find((i) => i.id === id)!)}
        user={tgUser}
        idioms={idioms}
        xp={xp}
        streak={streak}
      />

      {/* SEARCH OVERLAY */}
      {searchQuery.trim() !== "" && (
        <div
          className="
            fixed 
            left-0 
            right-0 
            top-[110px] 
            bottom-0 
            bg-black/95 
            z-50 
            p-4 
            overflow-y-auto
          "
        >
          <h2 className="text-xl font-bold mb-4">Resultados</h2>

          {filteredIdioms.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              No se encontraron resultados…
            </p>
          )}

          <div className="space-y-3">
            {filteredIdioms.map((idiom) => (
              <div
                key={idiom.id}
                onClick={() => {
                  openIdiom(idiom);
                  setSearchQuery("");
                }}
                className="p-4 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition"
              >
                <p
                  className="text-lg font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: highlight(idiom.expression, searchQuery),
                  }}
                />

                <p
                  className="text-sm text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: highlight(idiom.meaning, searchQuery),
                  }}
                />

                <p
                  className="text-xs text-blue-400 mt-1"
                  dangerouslySetInnerHTML={{
                    __html: highlight(idiom.category, searchQuery),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IDIOM CARD */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => {
            toggleLearned(selectedIdiom.id);
            // ✅ XP за отметку "выучено"
            addXP(15);
          }}
          onToggleFavorite={() => {
            toggleFavorite(selectedIdiom.id);
            // ✅ XP за добавление в избранное
            addXP(3);
          }}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={progressMap[selectedIdiom.id]}
          onNext={() => {
            const idx = idioms.findIndex((i) => i.id === selectedIdiom.id);
            const nextIdx = (idx + 1) % idioms.length;
            setSelectedIdiom(idioms[nextIdx]);
          }}
          onHome={() => setSelectedIdiom(null)}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onOpenVideo={(idiom) => openVideo(idiom)}
        />
      )}

      {/* PRACTICE PAGE */}
      {practiceIdiom && (
        <PracticePage
          idiom={practiceIdiom}
          onClose={() => setPracticeIdiom(null)}
          onFinish={() => {
            const idx = idioms.findIndex((i) => i.id === practiceIdiom.id);
            const nextIdx = (idx + 1) % idioms.length;

            setPracticeIdiom(null);
            setSelectedIdiom(idioms[nextIdx]);
            // ✅ XP за завершение упражнения
            addXP(20);
          }}
          addXP={addXP}
        />
      )}

      {/* VIDEO PLAYER */}
      {videoSrc && (
        <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />
      )}
    </div>
  );
};

export default Index;
