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

  // --- СИНХРОНИЗАЦИЯ ПРИ СТАРТЕ ---
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) setTgUser(tg.initDataUnsafe.user);
    }

    const initData = async () => {
      const uid = tg?.initDataUnsafe?.user?.id;
      
      // Локальные данные для скорости загрузки
      setIsPro(localStorage.getItem("modismo-is-pro") === "true");
      setViewCount(getStoredViews());

      if (uid) {
        try {
          const res = await fetch(`/api/server?action=get-user-data&userId=${uid}`);
          const data = await res.json();
          if (data.isPro) {
            setIsPro(true);
            localStorage.setItem("modismo-is-pro", "true");
          }
          if (data.progress) setProgressMap(data.progress);
        } catch (e) {
          console.error("Sync error");
        }
      }
    };
    initData();
  }, []);

  // --- ЛОГИКА ОПЛАТЫ ЮKASSA ---
  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const uid = tg?.initDataUnsafe?.user?.id;

    if (!uid) return;

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
            tg.showAlert("¡Pago exitoso! Acceso Pro activado.");
          }
        });
      }
    } catch (e) {
      tg?.showAlert("Error al generar el pago");
    }
  };

  // --- ПРОВЕРКА ЛИМИТА ---
  const checkAccess = (action: () => void) => {
    const currentIsPro = localStorage.getItem("modismo-is-pro") === "true";
    const currentViews = getStoredViews();

    if (currentIsPro) {
      action();
      return;
    }

    if (currentViews >= 3) {
      setShowPaywall(true);
    } else {
      const newCount = currentViews + 1;
      localStorage.setItem("modismo-total-views", newCount.toString());
      setViewCount(newCount);
      action();
    }
  };

  const markAsLearned = async (id: string) => {
    const updated = { ...progressMap, [id]: true };
    setProgressMap(updated);
    if (tgUser?.id) {
      fetch(`/api/server?action=save-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: tgUser.id, progressMap: updated })
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modismo</h1>
        {!isPro && <span className="text-xs text-blue-500 uppercase">Gratis: {viewCount}/3</span>}
      </div>

      <SearchBar value="" onChange={() => {}} />

      <div className="grid grid-cols-1 gap-4 mt-8">
        {idioms.slice(0, 10).map((idiom) => (
          <button 
            key={idiom.id}
            onClick={() => checkAccess(() => setSelectedIdiom(idiom))}
            className="text-left p-5 bg-white/5 rounded-2xl border border-white/10 active:bg-white/10"
          >
            {idiom.expression}
          </button>
        ))}
      </div>

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          onClose={() => {
            if (getStoredViews() >= 3 && !isPro) setShowPaywall(true);
            setSelectedIdiom(null);
          }}
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
          onNext={() => {}} // Сюда можно добавить логику переключения
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
