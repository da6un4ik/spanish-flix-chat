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

    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    window.speechSynthesis.getVoices();
  }, []);

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
  };

  const todayIndex = new Date().getDate() % idioms.length;
  const idiomOfTheDay = idioms[todayIndex];

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
    <div className="min-h-screen bg-black text-white p-4 pb-24">

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

      {/* CONTINUAR APRENDIENDO */}
      {searchQuery.trim() === "" && (
        <>
          <h3 className="text-xl font-bold mt-8 mb-3">Continuar aprendiendo</h3>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {idioms.slice(1, 4).map((idiom) => (
              <div
                key={idiom.id}
                onClick={() => openIdiom(idiom)}
                className="bg-white/10 rounded-xl overflow-hidden cursor-pointer hover:bg-white/20 transition"
              >
                <img
                  src={idiom.imageUrl}
                  className="w-full h-24 object-cover"
                />
                <p className="text-sm p-2">{idiom.expression}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PROFILE MODAL */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={{
          learnedCount: Object.keys(progressMap).length,
          totalCount: idioms.length,
          streak: 0,
        }}
        favorites={favorites}
        onSelectIdiom={(id) => openIdiom(idioms.find((i) => i.id === id)!)}
        user={tgUser}
      />

      {/* SEARCH OVERLAY — BELOW SEARCH BAR */}
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
                <p className="text-lg font-semibold">{idiom.expression}</p>
                <p className="text-sm text-gray-400">{idiom.meaning}</p>
                <p className="text-xs text-blue-400 mt-1">📂 {idiom.category}</p>
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
          onToggleLearned={() => toggleLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
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
          onOpenVideo={() => openVideo(selectedIdiom)}
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
          }}
        />
      )}

      {/* VIDEO PLAYER */}
      {videoSrc && (
        <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />
      )}

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-3 flex justify-around text-center text-sm z-40">
        <button
          className="flex flex-col items-center text-white"
          onClick={() => {
            setSelectedIdiom(null);
            setPracticeIdiom(null);
            setSearchQuery("");
          }}
        >
          <span className="text-xl">🏠</span>
          <span>Inicio</span>
        </button>

        <button
          onClick={() => {
            const input = document.querySelector("input[type='text']");
            if (input) (input as HTMLInputElement).focus();
          }}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">🔍</span>
          <span>Buscar</span>
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">⭐</span>
          <span>Mi lista</span>
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center text-white"
        >
          <span className="text-xl">👤</span>
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
