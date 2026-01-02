import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, X } from 'lucide-react';
import { Idiom } from '@/data/idioms';

interface PracticeProps {
  idiom: Idiom;
  onClose: () => void;
  onFullyLearned: () => void;
}

export const IdiomPractice = ({ idiom, onClose, onFullyLearned }: PracticeProps) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFinish, setShowFinish] = useState(false);

  // Варианты ответов для упражнений (в реальном приложении можно генерировать динамически)
  const exercises = [
    {
      question: `¿Qué significa "${idiom.expression}"?`,
      options: [idiom.meaning, "Comer algo rápido", "Dormir mucho"],
      correct: idiom.meaning
    },
    {
      question: `Completa la frase: "Él siempre ________ porque no presta atención".`,
      options: [idiom.expression, "habla por los codos", "está de mala leche"],
      correct: idiom.expression
    },
    {
      question: `¿En qué situación usarías "${idiom.expression}"?`,
      options: ["Alguien está distraído", "Alguien tiene hambre", "Alguien está feliz"],
      correct: "Alguien está distraído"
    }
  ];

  const currentExercise = exercises[step - 1];

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Запрет повторного клика

    setSelectedOption(option);
    const correct = option === currentExercise.correct;
    setIsCorrect(correct);

    // Звуковая обратная связь через Telegram
    const tg = (window as any).Telegram?.WebApp;
    if (correct) {
      tg?.HapticFeedback?.notificationOccurred('success');
    } else {
      tg?.HapticFeedback?.notificationOccurred('error');
    }

    // Переход к следующему шагу через задержку
    setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowFinish(true);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 w-12 rounded-full transition-colors ${i <= step ? 'bg-red-600' : 'bg-white/10'}`} 
            />
          ))}
        </div>
        <button onClick={onClose} className="text-gray-500"><X /></button>
      </div>

      <AnimatePresence mode="wait">
        {!showFinish ? (
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h2 className="text-sm font-black text-red-600 uppercase tracking-[0.2em] mb-4">Ejercicio {step} de 3</h2>
            <p className="text-2xl font-bold mb-8 leading-tight">{currentExercise.question}</p>

            <div className="space-y-4">
              {currentExercise.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentExercise.correct;
                
                let bgColor = "bg-white/5 border-white/10";
                if (isSelected) {
                  bgColor = isCorrectOption ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500";
                } else if (selectedOption && isCorrectOption) {
                  bgColor = "bg-green-500/20 border-green-500"; // Подсветка правильного, если ошибся
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${bgColor}`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {isSelected && (isCorrectOption ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-black mb-2 uppercase">¡Buen trabajo!</h2>
            <p className="text-gray-400 mb-10 text-lg">Has completado los ejercicios de esta expresión.</p>
            
            <button 
              onClick={onFullyLearned}
              className="w-full bg-red-600 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-2 shadow-xl shadow-red-900/40"
            >
              SIGUIENTE MODISMO <ArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
