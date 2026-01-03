import { useEffect, useState } from "react";
import idioms from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import SearchBar from "../components/SearchBar";
import ProgressBar from "../components/ProgressBar";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);

  // INIT TELEGRAM WEBAPP + LOAD USER
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTgUser(user);
        console.log("Telegram user:", user);
      }
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

  // FILTER IDIOMS — FIXED!
  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return (
      idiom.expression.toLowerCase().includes(q) ||
      idiom.meaning.toLowerCase().includes(q) ||
      idiom.example.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Modismo Pro</h1>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition"
        >
          Профиль
        </button>
      </div>

      {/* SEARCH */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* PROGRESS */}
      <ProgressBar
        learned={Object.keys(progressMap).length}
        total={idioms.length}
      />

      {/* IDIOMS LIST */}
      <div className="mt-4 space-y-3">
        {filteredIdioms.map((idiom) => (
          <div
            key={idiom.id}
            onClick={() => openIdiom(idiom)}
            className="p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{idiom.expression}</p>
                <p className="text-sm text-gray-400">{idiom.meaning}</p>
              </div>

              <div className="flex gap-3">
                {/* FAVORITE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(idiom.id);
                  }}
                >
                  {favorites.includes(idiom.id) ? "⭐" : "☆"}
                </button>

                {/* LEARNED */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLearned(idiom.id);
                  }}
                >
                  {progressMap[idiom.id] ? "✔️" : "⭕"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
        />
      )}
    </div>
  );
};

export default Index;
