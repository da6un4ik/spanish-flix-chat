import React from "react";

interface IdiomPracticeProps {
  idiom: any;
  isFavorite: boolean;
  isLearned: boolean;
  onClose: () => void;
  onHome: () => void;
  onToggleLearned: () => void;
  onToggleFavorite: () => void;
  onOpenVideo: (idiom: any) => void;
  onOpenPractice: () => void;
  onNext: () => void;
}

const IdiomPractice = ({
  idiom,
  isFavorite,
  isLearned,
  onClose,
  onHome,
  onToggleLearned,
  onToggleFavorite,
  onOpenVideo,
  onOpenPractice,
  onNext,
}: IdiomPracticeProps) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Изображение и верхняя панель */}
      <div className="relative h-2/5">
        <img src={idiom.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={onHome} className="bg-black/50 p-2 rounded-full backdrop-blur-md">
             {/* Иконка Домой */}
             <span className="text-white px-2">Inicio</span>
          </button>
          <button onClick={onToggleFavorite} className="bg-black/50 p-2 rounded-full backdrop-blur-md">
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 bg-black rounded-t-3xl -mt-6 p-6 flex flex-col border-t border-white/10">
        <h2 className="text-3xl font-bold mb-2">{idiom.expression}</h2>
        <p className="text-blue-400 font-medium mb-4">{idiom.category}</p>
        <p className="text-gray-300 text-lg mb-6">{idiom.meaning}</p>

        <div className="space-y-3 mt-auto">
          {/* КНОПКА ВИДЕО — ПРОВЕРКА ТУТ */}
          {idiom.videoUrl && (
            <button
              onClick={() => onOpenVideo(idiom)}
              className="w-full bg-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition"
            >
              <span>▶</span> Ver ejemplo en video
            </button>
          )}

          <button
            onClick={onOpenPractice}
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-xl transition active:scale-95"
          >
            Practicar
          </button>

          <div className="flex gap-3">
            <button
              onClick={onToggleLearned}
              className={`flex-1 py-3 rounded-xl font-semibold border ${
                isLearned ? "bg-green-600 border-green-600" : "border-white/20"
              }`}
            >
              {isLearned ? "✓ Aprendido" : "Marcar como aprendido"}
            </button>
            <button
              onClick={onNext}
              className="px-6 py-3 bg-white/10 rounded-xl font-semibold"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdiomPractice;
