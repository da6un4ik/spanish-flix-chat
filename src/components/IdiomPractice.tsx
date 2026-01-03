import React from "react";

const IdiomPractice = ({
  idiom,
  onClose,
  onToggleLearned,
  onToggleFavorite,
  isFavorite,
  isLearned,
  onNext,
  onHome,
  onOpenPractice,
  onOpenVideo,
  addXP,
}: {
  idiom: any;
  onClose: () => void;
  onToggleLearned: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  isLearned: boolean;
  onNext: () => void;
  onHome: () => void;
  onOpenPractice: () => void;
  onOpenVideo: () => void;
  addXP: (amount: number) => void;
}) => {
  const playAudio = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    speechSynthesis.speak(u);

    // ⭐ Хочешь — могу добавить XP за прослушивание
    // addXP(1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black text-white max-w-md w-full rounded-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{idiom.expression}</h2>
            <p className="text-sm text-blue-400 mt-1">📂 {idiom.category}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>

        {/* IMAGE */}
        <img
          src={idiom.imageUrl}
          alt={idiom.expression}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        {/* MEANING */}
        <p className="text-gray-300 mb-4">{idiom.meaning}</p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => playAudio(idiom.expression)}
            className="flex-1 bg-blue-600 py-2 rounded-xl font-semibold"
          >
            Escuchar
          </button>

          <button
            onClick={() => {
              onToggleLearned();
              addXP(15); // ⭐ XP за "выучено"
            }}
            className="flex-1 bg-white/20 py-2 rounded-xl font-semibold"
          >
            {isLearned ? "✔️ Aprendido" : "⭕ Marcar aprendido"}
          </button>

          <button
            onClick={() => {
              onToggleFavorite();
              addXP(3); // ⭐ XP за избранное
            }}
            className="flex-1 bg-white/20 py-2 rounded-xl font-semibold"
          >
            {isFavorite ? "⭐ Favorito" : "☆ Guardar"}
          </button>
        </div>

        {/* EXAMPLE */}
        <h3 className="text-lg font-bold mb-2">Ejemplo</h3>

        <div className="bg-white/5 p-3 rounded-xl mb-6">
          <p>{idiom.example}</p>
          <button
            onClick={() => playAudio(idiom.example)}
            className="mt-2 text-sm text-blue-400"
          >
            ▶ Escuchar ejemplo
          </button>
        </div>

        {/* EXTRA ACTIONS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={onOpenPractice}
            className="flex-1 bg-green-600 py-2 rounded-xl font-semibold"
          >
            Practicar
          </button>

          {idiom.videoUrl && (
            <button
              onClick={() => {
                addXP(5); // ⭐ XP за просмотр видео
                onOpenVideo();
              }}
              className="flex-1 bg-white/15 py-2 rounded-xl font-semibold"
            >
              Ver video
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 bg-white/10 py-2 rounded-xl font-semibold"
          >
            Inicio
          </button>

          <button
            onClick={onNext}
            className="flex-1 bg-blue-600 py-2 rounded-xl font-semibold"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdiomPractice;

