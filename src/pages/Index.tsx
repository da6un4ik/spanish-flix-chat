import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Paywall from "../components/Paywall";
import SearchBar from "../components/SearchBar";
import IdiomPractice from "../components/IdiomPractice";

const Index = () => {
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [tgUser, setTgUser] = useState<any>(null);

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  // --- 1. ЗАГРУЗКА И СИНХРОНИЗАЦИЯ ---
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    
    const initApp = async () => {
      if (tg) {
        tg.ready();
        // Безопасный expand для версии 6.0
        try { tg.expand(); } catch (e) { console.warn("Expand failed", e); }
        
        const user = tg.initDataUnsafe?.user;
        if (user) {
          setTgUser(user);
          // Тянем прогресс из Vercel KV
          try {
            const res = await fetch(`/api/server?action=get-user-data&userId=${user.id}`);
            const data = await res.json();
            if (data.isPro) {
              setIsPro(true);
              localStorage.setItem("modismo-is-pro", "true");
            }
            if (data.progress) setProgressMap(data.progress);
          } catch (e) { console.error("Cloud sync failed"); }
        }
      }
      setIsPro(localStorage.getItem("modismo-is-pro") === "true");
      setViewCount(getStoredViews());
    };

    initApp();
  }, []);

  // --- 2. ЛОГИКА ОПЛАТЫ (БЕЗОПАСНАЯ ДЛЯ V 6.0) ---
  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const uid = tgUser?.id;

    if (!uid) {
      alert("Por favor, abre la app desde Telegram");
      return;
    }

    try {
      const res = await fetch('/api/server?action=create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid })
      });
      const data = await res.json();

      if (data.link) {
        const version = parseFloat(tg.version || "6.0");
        // Если версия 6.1+ — открываем нативное окно
        if (version >= 6.1) {
          tg.openInvoice(data.link, (status: string) => {
            if (status === 'paid') {
              setIsPro(true);
              setShowPaywall(false);
              localStorage.setItem("modismo-is-pro", "true");
              alert("¡Acceso Pro activado!");
            }
          });
        } else {
          // Если версия 6.0 — открываем ссылку в браузере
          alert("Abriendo enlace de pago...");
          tg.openLink(data.link);
        }
      }
    } catch (e) {
      alert("Error al conectar con el servidor");
    }
  };

  // --- 3. СОХРАНЕНИЕ ПРОГРЕССА В ОБЛАКО ---
  const markAsLearned = async (id: string) => {
    const updated = { ...progressMap, [id]: true };
    setProgressMap(updated);
    // Сохраняем локально для скорости
    localStorage.setItem("modismo-pro", JSON.stringify(updated));
    // Сохраняем в облако навсегда
    if (tgUser?.id) {
      await fetch(`/api/server?action=save-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: tgUser.id, progressMap: updated })
      });
    }
  };

  const checkAccess = (action: () => void) => {
    if (isPro) return action();
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

  return (
    <div className="min-h-screen bg-black text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Modismo</h1>
        {!isPro && <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Бесплатно: {viewCount}/3</span>}
      </div>

      <SearchBar value="" onChange={() => {}} />

      <div className="mt-8 space-y-4">
        {idioms.slice(0, 10).map(i => (
          <div 
            key={i.id} 
            onClick={() => checkAccess(() => setSelectedIdiom(i))} 
            className="p-5 bg-white/5 rounded-2xl border border-white/10 active:scale-95 transition cursor-pointer"
          >
            {i.expression}
          </div>
        ))}
      </div>

      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} onUnlock={handleUnlockPro} />}

      {selectedIdiom && (
        <IdiomPractice 
          idiom={selectedIdiom} 
          isLearned={!!progressMap[selectedIdiom.id]} 
          onClose={() => setSelectedIdiom(null)} 
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
        />
      )}
    </div>
  );
};

export default Index;
