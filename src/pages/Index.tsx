import { useEffect, useState } from "react";
import idioms from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import SearchBar from "../components/SearchBar";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);

  // INIT TELEGRAM
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

  // SAVE PROGRESS
  const toggleLearned = (id: string) => {
    const updated = { ...progressMap, [id]: !progressMap[id] };
    setProgressMap(updated);
    localStorage.setItem("modismo-pro", JSON.stringify(updated));
  };

  // FAVORITES
  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("modismo-favs", JSON.stringify(updated));
  };

  // OPEN IDIOM
  const openIdiom = (idiom: any) => {
    setSelectedIdiom(idiom);
  };

  // NEXT IDIOM
  const openNextIdiom = () => {
    if (!selectedIdiom) return;

    const currentIndex = idioms.findIndex((i) => i.id === selectedIdiom.id);
    const nextIndex = (currentIndex + 1) % idioms.length;
    setSelectedIdiom(idioms[nextIndex]);
  };

  // FILTER
  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return (
      idiom.expression.toLowerCase().includes(q) ||
      idiom.meaning.toLowerCase().includes(q) ||
      idiom.example.toLowerCase().includes(q)
    );
  });

  // IDIOMA DEL DÍA
  const todayIndex = new Date().getDate() % idioms.length;
  const idiomOfTheDay = idioms[todayIndex];

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

      {/* SEARCH */}
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* IDIOMA DEL DÍA */}
      <div
        onClick={() => openIdiom(idiomOfTheDay)}
        className="bg-white/10 rounded-2xl p-4 mb-8 cursor-pointer hover:bg-white/20 transition"
      >
        <img
          src={idiomOfTheDay.imageUrl}
          className="w-full h-44 object-cover rounded-xl mb-3"
        />

        <p className="text-sm text-gray-300">IDIOMA DEL DÍA</p>
        <h2 className="text-2xl font-bold mt-1">{idiomOfTheDay.expression}</h2>
        <p className="text-gray-400 mt-1">{idiomOfTheDay.meaning}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openIdiom(idiomOfTheDay);
          }}
          className="mt-4 w-full bg-blue-600 py-2 rounded-xl font-semibold"
        >
          Aprender ahora
        </button>
      </div>

      {/* SEARCH RESULTS */}
      {searchQuery.trim() !== "" && (
        <div className="space-y-3 mb-10">
          {filteredIdioms.map((idiom) => (
            <div
              key={idiom.id}
              onClick={() => openIdiom(idiom)}
              className="p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition"
            >
              <p className="text-lg font-semibold">{idiom.expression}</p>
              <p className="text-sm text-gray-400">{idiom.meaning}</p>
            </div>
          ))}

          {filteredIdioms.length === 0 && (
            <p className="text-gray-400 text-center mt-4">
              No se encontraron resultados…
            </p>
          )}
        </div>
      )}

      {/* CONTINUAR APRENDIENDO */}
      {searchQuery.trim() === "" && (
        <>
          <h3 className="text-xl font-bold mb-3">Continuar aprendiendo</h3>

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

      {/* IDIOM PRACTICE MODAL */}
      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => toggleLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={progressMap[selectedIdiom.id]}
          onNext={openNextIdiom}
          onHome={() => setSelectedIdiom(null)}
        />
      )}

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-3 flex justify-around text-center text-sm z-50">
        <button className="flex flex-col items-center text-white">
          <span className="text-xl">🏠</span>
          <span>Inicio</span>
        </button>

        <button
          onClick={() => {
            const input = document.querySelector("input[type='text']");
            if (input) input.focus();
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
