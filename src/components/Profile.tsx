import React from "react";

const Profile = ({
  isOpen,
  onClose,
  stats,
  favorites,
  onSelectIdiom,
  user,
  idioms,
  progressMap, // 👈 ДОБАВЛЕНО: передаем карту прогресса
}: {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    learnedCount: number;
    totalCount: number;
    streak: number;
  };
  favorites: string[];
  onSelectIdiom: (id: string) => void;
  user: any;
  idioms: any[];
  progressMap: Record<string, boolean>; // 👈 Типизация
}) => {
  if (!isOpen) return null;

  // Вычисляем реальный процент прогресса
  const progressPercentage = Math.round((stats.learnedCount / stats.totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mi progreso</h2>
        <button onClick={onClose} className="text-gray-400 text-2xl p-2">✕</button>
      </div>

      {/* USER CARD */}
      <div className="bg-white/10 rounded-3xl p-5 flex items-center gap-4 mb-6 border border-white/5">
        <img
          src={user?.photo_url || "https://i.pravatar.cc/150"}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          alt="Profile"
        />
        <div>
          <p className="text-xl font-bold">{user?.first_name || "Estudiante"}</p>
          <p className="text-gray-400 text-sm">Nivel A2 - Intermedio</p>
          <p className="text-orange-400 font-bold mt-1 flex items-center gap-1">
            🔥 {stats.streak} {stats.streak === 1 ? 'día' : 'días'} seguido
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
          <p className="text-2xl font-bold text-blue-400">{stats.learnedCount}</p>
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Idiomas</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
          <p className="text-2xl font-bold text-green-400">{progressPercentage}%</p>
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Progreso</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
          <p className="text-2xl font-bold text-yellow-400">{(stats.learnedCount * 10)}</p>
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Puntos XP</p>
        </div>
      </div>

      {/* ACHIEVEMENTS (Теперь динамические) */}
      <h3 className="text-lg font-bold mb-3 flex justify-between items-end">
        <span>Logros</span>
        <span className="text-sm text-gray-500 font-normal">{stats.learnedCount} / {stats.totalCount}</span>
      </h3>
      <div className="bg-white/5 p-5 rounded-3xl mb-8 border border-white/5">
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden mb-2">
          <div 
            className="bg-blue-600 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            style={{ width: `${progressPercentage}%` }} 
          />
        </div>
        <p className="text-xs text-gray-400 italic">
          {progressPercentage === 100 ? "¡Felicidades! Has completado todo." : "¡Sigue practicando para hablar como un nativo!"}
        </p>
      </div>

      {/* FAVORITES (С отметкой об изучении) */}
      <h3 className="text-lg font-bold mb-3">Favoritos</h3>
      {favorites.length === 0 ? (
        <div className="bg-white/5 p-8 rounded-3xl text-center border border-white/5 mb-10">
          <p className="text-gray-500">Aún no tienes favoritos. Pulsa ❤️ en una tarjeta.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-10">
          {favorites.map((id) => {
            const idiom = idioms.find((i) => i.id === id);
            const isLearned = progressMap[id]; // Проверяем статус из мапы

            return (
              <button
                key={id}
                onClick={() => onSelectIdiom(id)}
                className={`w-full p-4 rounded-2xl text-left transition flex items-center justify-between group ${
                  isLearned ? "bg-green-500/5 border border-green-500/20" : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{isLearned ? "✅" : "⭐"}</span>
                  <span className={`font-medium ${isLearned ? "text-gray-400 line-through" : "text-white"}`}>
                    {idiom?.expression}
                  </span>
                </div>
                <span className="text-gray-600 group-hover:text-white transition">→</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
