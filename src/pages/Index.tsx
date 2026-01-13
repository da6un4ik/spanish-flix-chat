import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import SearchBar from "../components/SearchBar";
import Paywall from "../components/Paywall";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  // --- Инициализация ---
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) setTgUser(tg.initDataUnsafe.user);
    }

    const loadData = async () => {
      const uid = tg?.initDataUnsafe?.user?.id;
      
      // Сначала локальные данные
      setIsPro(localStorage.getItem("modismo-is-pro") === "true");
      setViewCount(getStoredViews());

      // Потом облачные (если есть интернет)
      if (uid) {
        try {
          const res = await fetch(`/api/server?action=get-user-data&userId=${uid}`);
          const data = await res.json();
          if (data.isPro) {
            setIsPro(true);
            localStorage.setItem("modismo-is-pro", "true");
          }
          if (data.progress) setProgressMap(data.progress);
        } catch (e) { console.error("Sync failed"); }
      }
    };
    loadData();
  }, []);

  // --- ОПЛАТА ЮKASSA (БЕЗ SHOWPOPUP) ---
  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const uid = tg?.initDataUnsafe?.user?.id;

    if (!uid) {
      alert("Abre Telegram para comprar");
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
        tg.openInvoice(data.link, (status: string) => {
          if (status === 'paid') {
            setIsPro(true);
            setShowPaywall(false);
            localStorage.setItem("modismo-is-pro", "true");
            alert("¡Pro activado!");
          }
        });
      }
    } catch (e) {
      alert("Error de conexión");
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
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Modismo</h1>
        {!isPro && <span className="text-blue-400 text-xs">{viewCount}/3 free</span>}
      </div>

      <SearchBar value="" onChange={() => {}} />

      <div className="space-y-4 mt-6">
        {idioms.slice(0, 10).map(i => (
          <div key={i.id} onClick={() => checkAccess(() => setSelectedIdiom(i))} className="p-4 bg-white/5 rounded-xl border border-white/10">
            {i.expression}
          </div>
        ))}
      </div>

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          onClose={() => setSelectedIdiom(null)}
          onToggleLearned={() => {}} // добавь логику сохранения
        />
      )}

      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={handleUnlockPro} 
        />
      )}
    </div>
  );
};

export default Index;
