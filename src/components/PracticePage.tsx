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

  if (!exercises.length) {
    return (
      <div className="fixed inset-0 bg-black text-white p-6 z-50">
        <button onClick={onClose} className="text-gray-400 text-xl mb-4">✕</button>
        <p>No hay ejercicios para esta expresión.</p>
      </div>
    );
  }

  const current = exercises[step];

  const handleOptionClick = (opt: string) => {
    const correct = opt === current.a;

    setSelected(opt);
    setIsCorrect(correct);

    // ⭐ Вибрация при правильном ответе
    if (correct && navigator.vibrate) {
      navigator.vibrate(120);
    }
  };

  const handleNext = () => {
    const isLast = step === exercises.length - 1;

    if (isLast) {
      onFinish();
      return;
    }

    setSelected(null);
    setIsCorrect(null);
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 bg-black text-white p-6 z-50 overflow-y-auto">
      <button onClick={onClose} className="text-gray-400 text-xl mb-4">✕</button>

      <h2 className="text-2xl font-bold mb-2">Práctica</h2>
      <p className="text-lg text-blue-300 mb-6">{idiom.expression}</p>

      <div className="bg-white/10 p-4 rounded-xl mb-4">
        <p className="mb-4">{current.q}</p>

        <div className="space-y-3">
          {current.options.map((opt: string) => {
            const isSelected = selected === opt;
            const correct = opt === current.a;

            let bg = "bg-white/20";
            if (selected) {
              if (isSelected && correct) bg = "bg-green-600";
              else if (isSelected && !correct) bg = "bg-red-600";
              else if (!isSelected && correct) bg = "bg-green-800/40";
            }

            return (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className={`w-full py-2 rounded-xl text-left px-3 ${bg}`}
                disabled={!!selected}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {isCorrect !== null && (
        <div className="mb-4">
          {isCorrect ? (
            <p className="text-green-400">¡Correcto!</p>
          ) : (
            <p className="text-red-400">
              Incorrecto. Respuesta correcta:{" "}
              <span className="font-semibold">{current.a}</span>
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 py-2 rounded-xl font-semibold mt-2"
        disabled={isCorrect === null}
      >
        Siguiente pregunta →
      </button>
    </div>
  );
};

export default PracticePage;
