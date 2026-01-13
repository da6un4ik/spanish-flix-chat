import { useEffect, useState, useMemo } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import Paywall from "../components/Paywall"; // Импортируем наш новый Paywall

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // НОВЫЕ СОСТОЯНИЯ ДЛЯ ОПЛАТЫ
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      // Убираем tg.setHeaderColor("#0A0A0A") если версия 6.0, 
      // либо оставляем, так как мы добавили обработку ошибок в коде выше
      try { tg.setHeaderColor("#0A0A0A"); } catch(e) {}
      
      const user = tg.initDataUnsafe?.user;
      if (user) setTgUser(user);
    }

    // Загрузка данных из localStorage [2025-12-22]
    const savedProgress = localStorage.getItem("modismo-pro");
    const savedFavs = localStorage.getItem("modismo-favs");
    const savedProStatus = localStorage.getItem("modismo-is-pro") === "true";

    if (savedProgress) setProgressMap(JSON.parse(savedProgress));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    setIsPro(savedProStatus);
    setViewCount(getStoredViews());

    window.speechSynthesis.getVoices();
  }, []);

  // --- ЛОГИКА ОГРАНИЧЕНИЙ ---
  const checkAccess = (idiom: any, action: () => void) => {
    // Идиома дня ВСЕГДА доступна
    if (idiom.id === idiomOfTheDay.id || isPro) {
      return action();
    }

    const currentViews = getStoredViews();
    if (currentViews >= 3) {
      setShowPaywall(true);
    } else {
      const next = currentViews + 1;
      localStorage.setItem("modismo-total-views", next.toString());
      setViewCount(next);
      action();
    }
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

  // Остальные функции (toggleLearned, toggleFavorite и т.д.) остаются без изменений
  const toggleLearned = (id: string) => {
    const updated = { ...progressMap, [id]: !progressMap[id] };
    setProgressMap(updated);
    localStorage.setItem("modismo-pro", JSON.stringify(updated));
  };

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("modismo-favs", JSON.stringify(updated));
  };

  // ИДИОМА ДНЯ
  const todayIndex = new Date().getDate() % idioms.length;
  const idiomOfTheDay = idioms[todayIndex];

  // ... (highlight, filteredIdioms остаются без изменений)
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
      idiom.example.toLowerCase().includes(q) ||
      idiom.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Modismo</h1>
           {!isPro && <p className="text-blue-500 text-[10px] font-bold">VISTAS GRATIS: {viewCount}/3</p>}
        </div>
        <button
          onClick={() => setIsProfileOpen(true)}
          className="px-4 py-2 bg-white/10 rounded-xl active:scale-95 transition"
        >
          Perfil
        </button>
      </div>

      <div className="mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* IDIOMA DEL DÍA (Всегда доступна) */}
      <div className="bg-white/10 rounded-3xl p-5 mt-2 border border-white/5 shadow-xl">
        <div className="relative">
          <img src={idiomOfTheDay.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-4 shadow-inner" alt={idiomOfTheDay.expression} />
          <div className="absolute top-3 left-3 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Hoy</div>
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Idioma del día</p>
        <h2 className="text-2xl font-bold mt-1 leading-tight">{idiomOfTheDay.expression}</h2>
        <div className="flex gap-3 mt-5">
          <button onClick={() => checkAccess(idiomOfTheDay, () => setPracticeIdiom(idiomOfTheDay))} className="flex-1 bg-blue-600 py-3 rounded-2xl font-bold active:scale-95 transition shadow-lg shadow-blue-900/20">Practicar</button>
          <button onClick={() => checkAccess(idiomOfTheDay, () => setSelectedIdiom(idiomOfTheDay))} className="flex-1 bg-white/10 py-3 rounded-2xl font-bold active:scale-95 transition">Detalles</button>
        </div>
      </div>

      {/* КАТЕГОРИИ ИЛИ СПИСОК (Пример ограниченного доступа) */}
      <div className="mt-8 space-y-3">
         <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Explorar más</h3>
         {idioms.slice(0, 10).map(idiom => (
             <div 
               key={idiom.id} 
               onClick={() => checkAccess(idiom, () => setSelectedIdiom(idiom))}
               className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center active:scale-[0.98] transition cursor-pointer"
             >
                <span className={progressMap[idiom.id] ? "text-gray-500" : "text-white"}>{idiom.expression}</span>
                {progressMap[idiom.id] && <span className="text-green-500 text-sm">✓</span>}
             </div>
         ))}
      </div>

      {/* MODALS */}
      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={handleUnlockPro} 
          onSuccess={() => {
            setIsPro(true);
            setShowPaywall(false);
          }}
        />
      )}

      {/* Твои существующие модалки (Profile, IdiomPractice, PracticePage, VideoPlayer) остаются такими же */}
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} stats={{ learnedCount: Object.keys(progressMap).length, totalCount: idioms.length, streak: 0 }} favorites={favorites} onSelectIdiom={(id) => { const found = idioms.find((i) => i.id === id); if (found) checkAccess(found, () => setSelectedIdiom(found)); setIsProfileOpen(false); }} user={tgUser} idioms={idioms} />

      {selectedIdiom && (
        <IdiomPractice 
           idiom={selectedIdiom} 
           onClose={() => setSelectedIdiom(null)} 
           onToggleLearned={() => toggleLearned(selectedIdiom.id)} 
           onToggleFavorite={() => toggleFavorite(selectedIdiom.id)} 
           isFavorite={favorites.includes(selectedIdiom.id)} 
           isLearned={progressMap[selectedIdiom.id] || false} 
           onNext={() => { const idx = idioms.findIndex((i) => i.id === selectedIdiom.id); checkAccess(idioms[(idx + 1) % idioms.length], () => setSelectedIdiom(idioms[(idx + 1) % idioms.length])); }} 
           onHome={() => setSelectedIdiom(null)} 
           onOpenPractice={() => setPracticeIdiom(selectedIdiom)} 
           onOpenVideo={() => { if (selectedIdiom.videoUrl) setVideoSrc(selectedIdiom.videoUrl); }} 
        />
      )}

      {practiceIdiom && (
        <PracticePage idiom={practiceIdiom} onClose={() => setPracticeIdiom(null)} onFinish={() => { const idx = idioms.findIndex((i) => i.id === practiceIdiom.id); setPracticeIdiom(null); checkAccess(idioms[(idx + 1) % idioms.length], () => setSelectedIdiom(idioms[(idx + 1) % idioms.length])); }} />
      )}

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
