import React, { useState } from "react";

interface PracticePageProps {
  idiom: any;
  onClose: () => void;
  onFinish: () => void;
}

const PracticePage = ({ idiom, onClose, onFinish }: PracticePageProps) => {
  // Допустим, у нас 2 шага (выбор слова и сборка фразы)
  const [step, setStep] = useState(1); 
  const [isFinished, setIsFinished] = useState(false);

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsFinished(true); // Все шаги пройдены
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col p-6">
      {/* Шапка */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onClose} className="text-gray-400">Cancelar</button>
        <div className="h-2 flex-1 mx-4 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: isFinished ? '100%' : `${(step / 2) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm font-mono">{isFinished ? "✓" : step}</span>
      </div>

      {!isFinished ? (
        <div className="flex-1 flex flex-col justify-center">
          {/* ТУТ ВАША ЛОГИКА УПРАЖНЕНИЙ */}
          <h2 className="text-xl text-center mb-10">Практика: {idiom.expression}</h2>
          
          <button 
            onClick={handleNextStep}
            className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition"
          >
            [Задание {step}] Нажмите, чтобы ответить правильно
          </button>
        </div>
      ) : (
        /* ЭКРАН ЗАВЕРШЕНИЯ */
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">¡Excelente!</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Has dominado esta expresión. <br /> ¿Listo для следующей?
          </p>
          
          <button 
            onClick={onFinish}
            className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-green-900/20 transition-all active:scale-95"
          >
            Siguiente idioma
          </button>

          <button 
            onClick={onClose}
            className="mt-4 text-gray-500 font-medium"
          >
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
