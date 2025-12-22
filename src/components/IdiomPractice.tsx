import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react'; // Убрали X, добавили ArrowLeft
import { Idiom } from '@/data/idioms';

interface IdiomPracticeProps {
  idiom: Idiom;
  completedExercises: Set<string>;
  onExerciseComplete: (exerciseId: string) => void;
  onClose: () => void;
  onFullyLearned: () => void;
}

export const IdiomPractice = ({ 
  idiom, 
  onClose, 
  onFullyLearned 
}: IdiomPracticeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const exercise = idiom.exercises[currentStep];

  const handleAnswer = (option: string) => {
    if (isCorrect !== null) return;
    
    setSelectedOption(option);
    const correct = option === exercise.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        if (currentStep < idiom.exercises.length - 1) {
          setCurrentStep(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          onFullyLearned();
        }
      }, 1200);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#141414] text-white p-6 pt-12">
      {/* ШАПКА ТРЕНИРОВКИ С КНОПКОЙ НАЗАД */}
      <div className="flex items-center mb-10">
        <button 
          onClick={onClose} 
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Назад</span>
        </button>

        <div className="flex gap-1.5 flex-1 px-8">
          {idiom.exercises.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                idx <= currentStep ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
        
        {/* Пустой блок справа для центровки прогресс-бара */}
        <div className="w-16" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full"
        >
          <p className="text-red-600 uppercase tracking-[0.3em] text-[10px] font-black mb-4">Упражнение {currentStep + 1}</p>
          <h2 className="text-3xl font-bold mb-12 leading-tight tracking-tight">{exercise.question}</h2>

          <div className="space-y-4">
            {exercise.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-6 rounded-2xl text-left text-lg font-bold border-2 transition-all active:scale-[0.98] ${
                  selectedOption === option
                    ? isCorrect 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : 'border-red-600 bg-red-600/10 text-red-500'
                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  {option}
                  {selectedOption === option && isCorrect && <CheckCircle2 className="text-green-500 w-6 h-6" />}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="text-center pb-8 text-gray-700 text-[10px] uppercase font-black tracking-[0.4em]">
        Spanish Flix Academy
      </div>
    </div>
  );
};
