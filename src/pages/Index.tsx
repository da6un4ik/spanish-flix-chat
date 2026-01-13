import { useEffect, useState, useMemo } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import DonationModal from "../components/DonationModal";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Идиома дня (всегда сверху, меняется ежедневно)
  const idiomOfTheDay = useMemo(() => {
    const todayIndex = new Date().getDate() % idioms.length;
    return idioms[todayIndex];
  }, []);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      try { tg.setHeaderColor("#0A0A0A"); } catch (e) {}
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // Загрузка прогресса
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

  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark class='bg-yellow-400 text-black'>$1</mark>");
  };

  const filteredIdioms = idioms.filter((idiom) => {
    const q = searchQuery.toLowerCase();
    return (
      idiom.expression.toLowerCase().includes(q) ||
      idiom.meaning.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Modismo</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsDonationOpen(true)}
            className="px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-xl font-bold text-sm border border-yellow-500/20 active:scale-95 transition"
          >
            ☕ Apoyar
          </button>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="px-4 py-2 bg-white/10 rounded-xl active:scale-95 transition text-sm font-bold"
          >
            Perfil
          </button>
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* IDIOMA DEL DÍA */}
      {!searchQuery && (
        <div className="bg-white/10 rounded-3xl p-5 mt-6 border border-white/5 shadow-2xl">
          <div className="relative">
            <img src={idiomOfTheDay.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-4" alt={idiomOfTheDay.expression} />
            <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Recomendado</div>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Idioma del día</p>
          <h2 className="text-2xl font-bold mt-1 leading-tight">{idiomOfTheDay.expression}</h2>
          <div className="flex gap-3 mt-5">
            <button onClick={() => setPracticeIdiom(idiomOfTheDay)} className="flex-1 bg-blue-600 py-3 rounded-2xl font-bold active:scale-95 transition">Practicar</button>
            <button onClick={() => setSelectedIdiom(idiomOfTheDay)} className="flex-1 bg-white/10 py-3 rounded-2xl font-bold active:scale-95 transition">Detalles</button>
          </div>
        </div>
      )}

      {/* LISTA COMPLETA */}
      <div className="mt-8 space-y-3">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">
          {searchQuery ? "Resultados" : "Explorar expresiones"}
        </h3>
        {(searchQuery ? filteredIdioms : idioms).map((idiom) => (
          <div
            key={idiom.id}
            onClick={() => setSelectedIdiom(idiom)}
            className="p-5 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center transition cursor-pointer active:scale-[0.98]"
          >
            <span className={progressMap[idiom.id] ? "text-gray-500 line-through decoration-white/20" : "text-white"}>
              <span dangerouslySetInnerHTML={{ __html: highlight(idiom.expression, searchQuery) }} />
            </span>
            {progressMap[idiom.id] && <span className="text-green-500 text-sm font-bold">✓</span>}
          </div>
        ))}
      </div>

      {/* MODALS */}
      {isDonationOpen && (
        <DonationModal 
          user={tgUser}
          onClose={() => setIsDonationOpen(false)} 
        />
      )}

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => toggleLearned(selectedIdiom.id)}
          onToggleFavorite={() => toggleFavorite(selectedIdiom.id)}
          isFavorite={favorites.includes(selectedIdiom.id)}
          isLearned={progressMap[selectedIdiom.id] || false}
          onNext={() => {
            const idx = idioms.findIndex((i) => i.id === selectedIdiom.id);
            setSelectedIdiom(idioms[(idx + 1) % idioms.length]);
          }}
          onHome={() => setSelectedIdiom(null)}
          onOpenPractice={() => { setPracticeIdiom(selectedIdiom); setSelectedIdiom(null); }}
          onOpenVideo={() => { if (selectedIdiom.videoUrl) setVideoSrc(selectedIdiom.videoUrl); }}
        />
      )}

      {practiceIdiom && (
        <PracticePage 
          idiom={practiceIdiom} 
          onClose={() => setPracticeIdiom(null)} 
          onFinish={() => setPracticeIdiom(null)} 
        />
      )}

      <Profile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }} 
        favorites={favorites} 
        user={tgUser} 
        idioms={idioms}
        onSelectIdiom={(id) => {
          const found = idioms.find(i => i.id === id);
          if (found) setSelectedIdiom(found);
          setIsProfileOpen(false);
        }}
      />

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
