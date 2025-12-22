import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Idiom, Exercise } from '@/data/idioms';

interface IdiomPracticeProps {
  idiom: Idiom;
  completedExercises: Set<string>;
  onExerciseComplete: (exerciseId: string) => void;
  onClose: () => void;
  onFullyLearned: () => void;
}

export const IdiomPractice = ({ 
  idiom, 
  completedExercises, 
  onExerciseComplete, 
  onClose, 
  onFullyLearned 
}: IdiomPracticeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const exercise = idiom.exercises[currentStep];

  const handleAnswer = (option: string) => {
    if (isCorrect !== null) return; // Запрет повторного клика
    
    setSelectedOption(option);
    const correct = option === exercise.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      onExerciseComplete(exercise.id);
      setTimeout(() => {
        if (currentStep < idiom.exercises.length - 1) {
          setCurrentStep(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          onFullyLearned();
        }
      }, 1500);
    } else {
      // Если ошибка, даем шанс нажать снова через секунду
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#141414] text-white p-6 pt-12">
      {/* Шапка тренировки */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-1 flex-1 px-4">
          {idiom.exercises.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-red-600' : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
        <button onClick={onClose} className="ml-4 p-2 text-gray-500"><X /></button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full"
        >
          <p className="text-gray-400 uppercase tracking-widest text-xs font-black mb-4">Упражнение {currentStep + 1}</p>
          <h2 className="text-3xl font-bold mb-10 leading-tight">{exercise.question}</h2>

          <div className="space-y-4">
            {exercise.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-6 rounded-2xl text-left text-xl font-medium border-2 transition-all ${
                  selectedOption === option
                    ? isCorrect 
                      ? 'border-green-500 bg-green-500/10 text-green-400' 
                      : 'border-red-600 bg-red-600/10 text-red-500'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  {option}
                  {selectedOption === option && isCorrect && <CheckCircle2 className="text-green-500" />}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="text-center pb-10 text-gray-600 text-xs uppercase tracking-[0.2em]">
        Выбери правильный вариант
      </div>
    </div>
  );
};
