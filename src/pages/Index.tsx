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

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      // Безопасный вызов расширения
      if (tg.version && parseFloat(tg.version) >= 6.0) {
        tg.expand();
      }
      // Убираем setHeaderColor, так как он вызывает ошибку в 6.0
    }

    // Загрузка локальных данных
    setIsPro(localStorage.getItem("modismo-is-pro") === "true");
    setViewCount(getStoredViews());
  }, []);

  // ФУНКЦИЯ ОПЛАТЫ (Безопасная версия)
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
        // Проверяем поддержку openInvoice (нужна версия 6.1+)
        if (tg.version && parseFloat(tg.version) >= 6.1) {
          tg.openInvoice(data.link, (status: string) => {
            if (status === 'paid') {
              setIsPro(true);
              setShowPaywall(false);
              localStorage.setItem("modismo-is-pro", "true");
              alert("¡Acceso Pro activado!");
            }
          });
        } else {
          // Если версия 6.0, открываем ссылку просто в браузере или через tg.openLink
          alert("Tu versión de Telegram es antigua. Intenta pagar a través del enlace que se abrirá.");
          tg.openLink(data.link);
        }
      }
    } catch (e) {
      alert("Error al conectar con el servidor");
    }
  };

  const checkAccess = (action: () => void) => {
    if (isPro) return action();
    const currentViews = getStoredViews();
    if (currentViews >= 3) {
      setShowPaywall(true);
    } else {
      const newCount = currentViews + 1;
      localStorage.setItem("modismo-total-views", newCount.toString());
      setViewCount(newCount);
      action();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Modismo Pro</h1>
        {!isPro && <span className="text-[10px] text-blue-500 font-bold">VISTAS: {viewCount}/3</span>}
      </div>

      <SearchBar value="" onChange={() => {}} />

      <div className="mt-8 space-y-4">
        {idioms.slice(0, 5).map(idiom => (
          <div 
            key={idiom.id} 
            onClick={() => checkAccess(() => setSelectedIdiom(idiom))}
            className="p-5 bg-white/5 rounded-2xl border border-white/10 active:scale-[0.98] transition"
          >
            {idiom.expression}
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
          onClose={() => setSelectedIdiom(null)} 
          isLearned={false}
          onToggleLearned={() => {}}
        />
      )}
    </div>
  );
};

export default Index;
