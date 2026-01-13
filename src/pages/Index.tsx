import { useEffect, useState, useCallback } from "react";
import { idioms } from "../data/idioms";
import Profile from "../components/Profile";
import IdiomPractice from "../components/IdiomPractice";
import PracticePage from "../components/PracticePage";
import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import Paywall from "../components/Paywall";

const Index = () => {
  const [selectedIdiom, setSelectedIdiom] = useState<any>(null);
  const [practiceIdiom, setPracticeIdiom] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tgUser, setTgUser] = useState<any>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // --- СОСТОЯНИЯ ПЕЙВОЛА ---
  const [isPro, setIsPro] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const getStoredViews = () => parseInt(localStorage.getItem("modismo-total-views") || "0");

  // 1. ФУНКЦИЯ ОПЛАТЫ ЧЕРЕЗ ЮKASSA
  const handleUnlockPro = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const uid = tg?.initDataUnsafe?.user?.id;

    if (!uid) {
      tg?.showAlert("Abre la app desde Telegram para comprar");
      return;
    }

    try {
      // Запрашиваем ссылку на инвойс у нашего бэкенда
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
            tg.showAlert("¡Felicidades! Ahora tienes acceso Pro.");
          }
        });
      }
    } catch (e) {
      tg?.showAlert("Error al generar el pago");
    }
  };

  // 2. ПРОВЕРКА ДОСТУПА
  const checkAccess = useCallback((action: () => void) => {
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
  }, []);

  // 3. ИНИЦИАЛИЗАЦИЯ И СИНХРОНИЗАЦИЯ С ОБЛАКОМ
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor("#0A0A0A");
      if (tg.initDataUnsafe?.user) setTgUser(tg.initDataUnsafe.user);
    }

    const initData = async () => {
      const uid = tg?.initDataUnsafe?.user?.id;
      
      // Загрузка локальных данных
      const savedIsPro = localStorage.getItem("modismo-is-pro") === "true";
      setIsPro(savedIsPro);
      setViewCount(getStoredViews());

      // Синхронизация с Vercel KV
      if (uid) {
        try {
          const res = await fetch(`/api/server?action=get-user-data&userId=${uid}`);
          const data = await res.json();
          
          if (data.isPro) {
            setIsPro(true);
            localStorage.setItem("modismo-is-pro", "true");
          }
          if (data.progress) {
            setProgressMap(data.progress);
            localStorage.setItem("modismo-pro", JSON.stringify(data.progress));
          }
        } catch (e) {
          console.error("Cloud sync failed");
          const localProgress = localStorage.getItem("modismo-pro");
          if (localProgress) setProgressMap(JSON.parse(localProgress));
        }
      }

      // Стартовая идиома
      checkAccess(() => {
        const unlearned = idioms.filter(i => !progressMap[i.id]);
        const startIdiom = unlearned.length > 0 ? unlearned[Math.floor(Math.random() * unlearned.length)] : idioms[0];
        setSelectedIdiom(startIdiom);
      });
    };

    initData();
  }, [checkAccess]);

  const markAsLearned = async (id: string) => {
    const updated = { ...progressMap, [id]: true };
    setProgressMap(updated);
    localStorage.setItem("modismo-pro", JSON.stringify(updated));

    // Отправка прогресса в облако (согласно твоему пожеланию сохранять прогресс)
    if (tgUser?.id) {
      await fetch(`/api/server?action=save-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: tgUser.id, progressMap: updated })
      });
    }
  };

  // Остальная логика (getNextUnlearned, toggleFavorite) остается прежней...
  const getNextUnlearned = useCallback((currentId: string, currentProgress: Record<string, boolean>) => {
    const unlearned = idioms.filter(i => !currentProgress[i.id] && i.id !== currentId);
    if (unlearned.length > 0) return unlearned[Math.floor(Math.random() * unlearned.length)];
    const currentIndex = idioms.findIndex(i => i.id === currentId);
    return idioms[(currentIndex + 1) % idioms.length];
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-10 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modismo Pro</h1>
          {!isPro && (
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">
              Vistas gratis: {viewCount}/3
            </p>
          )}
        </div>
        <button onClick={() => setIsProfileOpen(true)} className="px-4 py-2 bg-white/10 rounded-2xl border border-white/5 active:scale-95 transition">
          Perfil
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {selectedIdiom && (
        <IdiomPractice
          idiom={selectedIdiom}
          isLearned={!!progressMap[selectedIdiom.id]}
          isFavorite={favorites.includes(selectedIdiom.id)}
          onClose={() => {
            if (getStoredViews() >= 3 && !isPro) setShowPaywall(true);
            setSelectedIdiom(null);
          }}
          onNext={() => checkAccess(() => {
            setSelectedIdiom(getNextUnlearned(selectedIdiom.id, progressMap));
          })}
          onOpenPractice={() => {
            setPracticeIdiom(selectedIdiom);
            setSelectedIdiom(null);
          }}
          onToggleLearned={() => markAsLearned(selectedIdiom.id)}
          onToggleFavorite={() => {}}
          onHome={() => setSelectedIdiom(null)}
          onOpenVideo={() => {
            if (selectedIdiom.videoUrl) setVideoSrc(selectedIdiom.videoUrl);
          }}
        />
      )}

      {/* Прочие компоненты (PracticePage, Profile) остаются без изменений */}

      {showPaywall && (
        <Paywall 
          onClose={() => setShowPaywall(false)} 
          onUnlock={handleUnlockPro} 
        />
      )}

      {videoSrc && <VideoPlayer src={videoSrc} onClose={() => setVideoSrc(null)} />}
    </div>
  );
};

export default Index;
