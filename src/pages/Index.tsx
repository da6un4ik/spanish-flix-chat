import { useEffect, useState } from "react";
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

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      try { tg.expand(); } catch (e) {}
    }

    // 1. Загружаем статус Pro из памяти телефона
    const savedPro = localStorage.getItem("modismo-is-pro") === "true";
    setIsPro(savedPro);

    // 2. Загружаем прогресс идиом (сохранение прогресса при закрытии)
    const savedProgress = localStorage.getItem("modismo-progress");
    if (savedProgress) {
      setProgressMap(JSON.parse(savedProgress));
    }

    // 3. Загружаем счетчик просмотров
    const views = parseInt(localStorage.getItem("modismo-total-views") || "0");
    setViewCount(views);
  }, []);

  // Функция для сохранения прогресса "изучено"
  const markAsLearned = (id: string) => {
    const updated = { ...progressMap, [id]: true };
    setProgressMap(updated);
    localStorage.setItem("modismo-progress", JSON.stringify(updated));
  };

  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const uid = tg?.initDataUnsafe?.user?.id;

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
        // Fallback для версии 6.0
        const version = parseFloat(tg.version || "6.0");
        if (version >= 6.1) {
          tg.openInvoice(data.link, (status: string) => {
            if (status === 'paid') alert("¡Pago con éxito! Espera el código del bot.");
          });
        } else {
          tg.openLink(data.link);
        }
      }
    } catch (e) {
      alert("Error al conectar con el servidor");
    }
  };

  const checkAccess = (action: () => void) => {
    if (isPro) return action();
    if (viewCount >= 3) {
      setShowPaywall(true);
    } else {
      const next = viewCount + 1;
      localStorage.setItem("modismo-total-views", next.toString());
      setViewCount(next);
      action();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Modismo</h1>
        {!isPro && <span className="text-blue-500 text-xs font-bold uppercase">Gratis: {viewCount}/3</span>}
      </div>

      <SearchBar value="" onChange={() => {}} />

      <div className="mt-8 space-y-4">
        {idioms.slice(0, 10).map(i => (
          <div 
            key={i.id} 
            onClick={() => checkAccess(() => setSelectedIdiom(i))} 
            className="p-5 bg-white/5 rounded-2xl border border-white/10 active:scale-95 transition"
          >
            <div className="flex justify-between items-center">
              <span>{i.expression}</span>
              {progressMap[i.id] && <span className="text-green-500 text-sm">✓</span>}
            </div>
          </div>
        ))}
      </div>

      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={handleUnlockPro} 
        />
      )}

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
