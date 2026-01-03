import React from "react";

const Profile = ({
  isOpen,
  onClose,
  stats,
  favorites,
  onSelectIdiom,
  user,
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
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 p-6 overflow-y-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mi progreso</h2>
        <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
      </div>

      {/* USER CARD */}
      <div className="bg-white/10 rounded-2xl p-5 flex items-center gap-4 mb-6">
        <img
          src={user?.photo_url || "https://i.pravatar.cc/150"}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <p className="text-xl font-bold">{user?.first_name || "Usuario"}</p>
          <p className="text-gray-300 text-sm">Aprendiz avanzado</p>
          <p className="text-blue-400 font-semibold mt-1">
            🔥 {stats.streak} días seguidos
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{stats.learnedCount}</p>
          <p className="text-gray-400 text-sm">Idiomas</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">85%</p>
          <p className="text-gray-400 text-sm">Score</p>
        </div>

        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">2.4k</p>
          <p className="text-gray-400 text-sm">XP</p>
        </div>
      </div>

      {/* CONTINUE LEARNING */}
      <h3 className="text-xl font-bold mb-3">Continuar aprendiendo</h3>

      <div className="space-y-3 mb-8">
        <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-semibold">Modismos básicos</p>
            <p className="text-gray-400 text-sm">Quedan 3 min</p>
          </div>
          <span className="text-xl">📘</span>
        </div>

        <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-semibold">Cultura y expresiones</p>
            <p className="text-gray-400 text-sm">Quedan 12 min</p>
          </div>
          <span className="text-xl">🌎</span>
        </div>

        <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-semibold">Romance</p>
            <p className="text-green-400 text-sm">Nuevo</p>
          </div>
          <span className="text-xl">❤️</span>
        </div>
      </div>

      {/* WEEKLY ACTIVITY */}
      <h3 className="text-xl font-bold mb-3">Actividad semanal</h3>

      <div className="bg-white/10 p-4 rounded-xl mb-8">
        <div className="grid grid-cols-7 gap-2 text-center text-gray-400 text-sm mb-3">
          <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>

        <div className="grid grid-cols-7 gap-2 h-24 items-end">
          {[40, 60, 20, 80, 50, 30, 70].map((h, i) => (
            <div
              key={i}
              className="bg-red-500 rounded-md"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <h3 className="text-xl font-bold mb-3">Mis logros</h3>

      <div className="bg-white/10 p-4 rounded-xl mb-8">
        <p className="text-gray-300 mb-2">12 / 50 completados</p>
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
          <div className="bg-green-500 h-3" style={{ width: "24%" }} />
        </div>
      </div>

      {/* FAVORITES */}
      <h3 className="text-xl font-bold mb-3">Favoritos</h3>

      {favorites.length === 0 && (
        <p className="text-gray-400 mb-6">Aún no tienes favoritos.</p>
      )}

      <div className="space-y-3 mb-10">
        {favorites.map((id) => (
          <button
            key={id}
            onClick={() => onSelectIdiom(id)}
            className="w-full bg-white/10 p-4 rounded-xl text-left hover:bg-white/20 transition"
          >
            ⭐ Idioma #{id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
