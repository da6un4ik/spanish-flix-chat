import React from "react";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    learnedCount: number;
    totalCount: number;
    streak: number;
  };
  favorites: string[];
  onSelectIdiom: (id: string) => void;
  user?: any; // Telegram user
}

const Profile: React.FC<ProfileProps> = ({
  isOpen,
  onClose,
  stats,
  favorites,
  onSelectIdiom,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#111] w-[90%] max-w-md rounded-2xl p-6 relative text-white shadow-xl border border-white/10">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* USER INFO */}
        {user && (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user.photo_url || "/default-avatar.png"}
              alt="avatar"
              className="w-16 h-16 rounded-full border border-white/20"
            />
            <div>
              <p className="text-xl font-bold">{user.first_name}</p>
              {user.username && (
                <p className="text-gray-400">@{user.username}</p>
              )}
              {user.is_premium && (
                <p className="text-yellow-400 text-sm">Telegram Premium</p>
              )}
            </div>
          </div>
        )}

        {/* STATS */}
        <div className="bg-white/5 p-4 rounded-xl mb-6">
          <p className="text-lg font-semibold mb-2">Статистика</p>
          <div className="space-y-1 text-gray-300">
            <p>Выучено: {stats.learnedCount} / {stats.totalCount}</p>
            <p>Серия дней: {stats.streak} 🔥</p>
          </div>
        </div>

        {/* FAVORITES */}
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-3">Избранные идиомы</p>

          {favorites.length === 0 && (
            <p className="text-gray-400 text-sm">Нет избранных идиом</p>
          )}

          <div className="space-y-2">
            {favorites.map((id) => (
              <button
                key={id}
                onClick={() => onSelectIdiom(id)}
                className="w-full text-left p-3 bg-white/10 rounded-lg hover:bg-white/20 transition"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
