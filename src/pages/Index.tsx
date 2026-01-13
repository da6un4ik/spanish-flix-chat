import { useEffect, useState, useMemo } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import Paywall from "../components/Paywall";

const Index = () => {
  // --- СОСТОЯНИЯ ИЗ ТВОЕГО ДИЗАЙНА ---
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // --- СОСТОЯНИЯ ОГРАНИЧЕНИЙ И PRO ---
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  // Идиома дня (меняется раз в сутки, всегда бесплатна)
  const idiomOfTheDay = useMemo(() => {
    const todayIndex = new Date().getDate() % idioms.length;
    return idioms[todayIndex];
  }, []);

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      try { tg.setHeaderColor("#0A0A0A"); } catch (e) {}
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // Загрузка всех данных из памяти устройства
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedProStatus = localStorage.getItem("modismo-is-pro") === "true";
    const savedViews = getStoredViews();

    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    setIsPro(savedProStatus);
    setViewCount(savedViews);

    window.speechSynthesis.getVoices();
  }, []);

  // --- ЛОГИКА БЛОКИРОВКИ (ГЛАВНОЕ) ---
  const checkAccess = (idiom: any, action: () => void) => {
    // 1. Если Pro или это идиома дня — пускаем без вопросов
    if (isPro || idiom.id === idiomOfTheDay.id) {
      return action();
    }

    // 2. Если уже изучено (есть галочка) — тоже пускаем
    if (progressMap[idiom.id]) {
      return action();
    }

    // 3. Проверяем лимит
    const currentViews = getStoredViews();
    if (currentViews >= 3) {
      setShowPaywall(true); // БЛОКИРУЕМ
    } else {
      const next = currentViews + 1;
      localStorage.setItem("modismo-total-views", next.toString());
      setViewCount(next);
      action(); // ПУСКАЕМ
    }
  };

  // --- ФУНКЦИИ УПРАВЛЕНИЯ ---
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

  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    if (!tgUser?.id) return alert("Por favor, abre desde Telegram");

    try {
      const res = await fetch('/api/server?action=create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: tgUser.id })
      });
      const data = await res.json();
      if (data.link) {
        if (parseFloat(tg.version || "6.0") >= 6.1) {
          tg.openInvoice(data.link);
        } else {
          tg.openLink(data.link);
        }
      }
    } catch (e) {
      alert("Error al conectar con el servidor");
    }
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modismo</h1>
          {!isPro && (
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1">
              Vistas gratis: {viewCount}/3
            </p>
          )}
        </div>
        <button
          onClick={() => setIsProfileOpen(true)}
          className="px-4 py-2 bg-white/10 rounded-xl active:scale-95 transition text-sm font-bold"
        >
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* IDIOMA DEL DÍA */}
      <div className="bg-white/10 rounded-3xl p-5 mt-6 border border-white/5 shadow-2xl">
        <div className="relative">
          <img src={idiomOfTheDay.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-4" alt={idiomOfTheDay.expression} />
          <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Recomendado</div>
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Idioma del día</p>
        <h2 className="text-2xl font-bold mt-1">{idiomOfTheDay.expression}</h2>
        <div className="flex gap-3 mt-5">
          <button onClick={() => setPracticeIdiom(idiomOfTheDay)} className="flex-1 bg-blue-600 py-3 rounded-2xl font-bold active:scale-95 transition">Practicar</button>
          <button onClick={() => setSelectedIdiom(idiomOfTheDay)} className="flex-1 bg-white/10 py-3 rounded-2xl font-bold active:scale-95 transition">Detalles</button>
        </div>
      </div>

      {/* EXPLORAR MÁS (СПИСОК С БЛОКИРОВКОЙ) */}
      <div className="mt-8 space-y-3">
        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Explorar</h3>
        {idioms.slice(0, 15).map((idiom) => {
          const isLocked = !isPro && viewCount >= 3 && idiom.id !== idiomOfTheDay.id && !progressMap[idiom.id];
          return (
            <div
              key={idiom.id}
              onClick={() => checkAccess(idiom, () => setSelectedIdiom(idiom))}
              className={`p-5 rounded-2xl border border-white/5 flex justify-between items-center transition cursor-pointer active:scale-[0.98] ${isLocked ? 'bg-white/[0.02] opacity-40' : 'bg-white/5'}`}
            >
              <span className={progressMap[idiom.id] ? "text-gray-500" : "text-white"}>
                {idiom.expression}
              </span>
              {isLocked ? <span className="text-xs">🔒</span> : (progressMap[idiom.id] && <span className="text-green-500 text-sm">✓</span>)}
            </div>
          );
        })}
      </div>

      {/* SEARCH OVERLAY */}
      {searchQuery.trim() !== "" && (
        <div className="fixed inset-0 top-[120px] bg-black/95 z-50 p-4 overflow-y-auto">
          {filteredIdioms.map((idiom) => (
            <div
              key={idiom.id}
              onClick={() => checkAccess(idiom, () => { setSelectedIdiom(idiom); setSearchQuery(""); })}
              className="p-4 bg-white/5 rounded-2xl mb-3 border border-white/5"
            >
              <p className="font-bold" dangerouslySetInnerHTML={{ __html: highlight(idiom.expression, searchQuery) }} />
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}
      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={handleUnlockPro} 
          onSuccess={() => { setIsPro(true); setShowPaywall(false); localStorage.setItem("modismo-is-pro", "true"); }} 
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
            const nextIdiom = idioms[(idx + 1) % idioms.length];
            checkAccess(nextIdiom, () => setSelectedIdiom(nextIdiom));
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
          onFinish={() => { setPracticeIdiom(null); }} 
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
          if (found) checkAccess(found, () => setSelectedIdiom(found));
          setIsProfileOpen(false);
        }}
      />

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
