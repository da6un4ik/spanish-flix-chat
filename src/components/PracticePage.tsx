import React, { useState } from "react";

const PracticePage = ({
  idiom,
  onClose,
  onFinish,
}: {
  idiom: any;
  onClose: () => void;
  onFinish: () => void;
}) => {
  const exercises = idiom.exercises || [];
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFinished, setShowFinished] = useState(false); // Состояние для экрана успеха

  if (!exercises.length) {
    return (
      <div className="fixed inset-0 bg-black text-white p-6 z-50 flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">No hay ejercicios para esta expresión.</p>
        <button onClick={onClose} className="bg-white/10 px-6 py-2 rounded-xl">Cerrar</button>
      </div>
    );
  }

  // --- ЭКРАН ЗАВЕРШЕНИЯ ---
  if (showFinished) {
    return (
      <div className="fixed inset-0 bg-black text-white p-8 z-[60] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
        <div className="text-7xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold mb-2">¡Increíble!</h2>
        <p className="text-gray-400 mb-8">Has dominado la expresión:<br/>
          <span className="text-white font-bold">"{idiom.expression}"</span>
        </p>
        <button
          onClick={onFinish}
          className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-blue-900/40 active:scale-95 transition"
        >
          Siguiente idioma →
        </button>
      </div>
    );
  }

  const current = exercises[step];

  const handleOptionClick = (opt: string) => {
    if (selected) return; // Защита от повторного клика
    const correct = opt === current.a;
    setSelected(opt);
    setIsCorrect(correct);

    if (correct && navigator.vibrate) {
      navigator.vibrate(50); // Легкая вибрация
    }
  };

  const handleNext = () => {
    const isLast = step === exercises.length - 1;

    if (isLast) {
      setShowFinished(true); // Вместо мгновенного onFinish показываем успех
      return;
    }

    setSelected(null);
    setIsCorrect(null);
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 bg-black text-white p-6 z-50 overflow-y-auto flex flex-col">
      {/* Шапка */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-1 flex-1 mr-4">
          {exercises.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-blue-600" : "bg-white/10"}`}
            />
          ))}
        </div>
        <button onClick={onClose} className="text-gray-400 p-2">✕</button>
      </div>

      <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Práctica</h2>
      <p className="text-xl font-bold mb-8">{idiom.expression}</p>

      {/* Карточка вопроса */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-6">
        <p className="text-lg mb-6 leading-relaxed">{current.q}</p>

        <div className="space-y-3">
          {current.options.map((opt: string) => {
            const isSelected = selected === opt;
            const isCorrectOption = opt === current.a;

            let styles = "bg-white/10 border-white/5 text-white";
            if (selected) {
              if (isSelected && isCorrectOption) styles = "bg-green-600 border-green-500 shadow-lg shadow-green-900/20";
              else if (isSelected && !isCorrectOption) styles = "bg-red-600 border-red-500";
              else if (isCorrectOption) styles = "bg-green-600/20 border-green-600/50 text-green-400";
              else styles = "opacity-40";
            }

            return (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className={`w-full py-4 rounded-2xl text-left px-5 font-medium border transition-all duration-200 ${styles}`}
                disabled={!!selected}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Кнопка "Далее" */}
      <div className="mt-auto">
        {selected && (
           <div className={`mb-4 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
              <span>{isCorrect ? '¡Excelente!' : `La respuesta es: ${current.a}`}</span>
           </div>
        )}
        
        <button
          onClick={handleNext}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${
            selected 
            ? "bg-white text-black shadow-lg" 
            : "bg-white/5 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selected}
        >
          {step === exercises.length - 1 ? "Finalizar" : "Siguiente pregunta"}
        </button>
      </div>
    </div>
  );
};

export default PracticePage;
