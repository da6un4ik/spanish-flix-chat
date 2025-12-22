import { useState } from 'react';
import { Idiom, Exercise } from '@/data/idioms';
import { X, Check, ArrowRight, Lightbulb, Trophy, ChevronLeft } from 'lucide-react';

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
  onFullyLearned,
}: IdiomPracticeProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showComplete, setShowComplete] = useState(false);

  const exercises = idiom.exercises;
  const currentExercise = exercises[currentExerciseIndex];
  const totalCompleted = exercises.filter((e) => completedExercises.has(e.id)).length;
  const progress = (totalCompleted / exercises.length) * 100;

  const checkAnswer = () => {
    let correct = false;

    if (currentExercise.type === 'multiChoice') {
      correct = selectedOption === currentExercise.answer;
    } else {
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase().trim();
    }

    setIsCorrect(correct);

    if (correct && !completedExercises.has(currentExercise.id)) {
      onExerciseComplete(currentExercise.id);
      
      // Check if all exercises are now complete
      const newCompletedCount = totalCompleted + 1;
      if (newCompletedCount === exercises.length) {
        setTimeout(() => {
          setShowComplete(true);
          onFullyLearned();
        }, 1000);
      }
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowHint(false);
      setIsCorrect(null);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowHint(false);
      setIsCorrect(null);
    }
  };

  if (showComplete) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in border border-border">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Trophy className="w-10 h-10 text-emerald-400" />
          </div>
          
          <h2 className="font-display text-3xl text-foreground mb-2">¡Excelente!</h2>
          <p className="text-muted-foreground mb-4">Идиома изучена!</p>
          
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="font-display text-xl text-primary">{idiom.spanish}</p>
            <p className="text-sm text-muted-foreground mt-1">{idiom.meaning}</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  const renderExercise = () => {
    const isAlreadyCompleted = completedExercises.has(currentExercise.id);

    switch (currentExercise.type) {
      case 'fillBlank':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{currentExercise.question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Введите слово..."
              disabled={isCorrect === true || isAlreadyCompleted}
              className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary text-foreground placeholder:text-muted-foreground outline-none transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && !isCorrect && checkAnswer()}
            />
          </div>
        );

      case 'translate':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{currentExercise.question}</p>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Напишите перевод..."
              disabled={isCorrect === true || isAlreadyCompleted}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary text-foreground placeholder:text-muted-foreground outline-none transition-colors resize-none"
            />
          </div>
        );

      case 'multiChoice':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{currentExercise.question}</p>
            <div className="space-y-2">
              {currentExercise.options?.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === currentExercise.answer;

                let bgClass = 'bg-secondary hover:bg-secondary/80';
                let borderClass = 'border-transparent';

                if (isCorrect !== null || isAlreadyCompleted) {
                  if (isCorrectOption) {
                    bgClass = 'bg-emerald-500/20';
                    borderClass = 'border-emerald-500';
                  } else if (isSelected && !isCorrectOption) {
                    bgClass = 'bg-destructive/20';
                    borderClass = 'border-destructive';
                  }
                } else if (isSelected) {
                  borderClass = 'border-primary';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !isCorrect && !isAlreadyCompleted && setSelectedOption(option)}
                    disabled={isCorrect === true || isAlreadyCompleted}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all ${bgClass} ${borderClass}`}
                  >
                    <span className="text-foreground">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const exerciseTypeLabels = {
    fillBlank: 'Заполни пропуск',
    translate: 'Переведи',
    multiChoice: 'Выбери ответ',
    matchParts: 'Соедини части',
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <div className="text-center">
          <h2 className="font-display text-lg text-foreground">{idiom.spanish}</h2>
          <p className="text-xs text-muted-foreground">{idiom.meaning}</p>
        </div>
        <div className="w-9" />
      </div>

      {/* Progress */}
      <div className="px-4 py-3">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Упражнение {currentExerciseIndex + 1} / {exercises.length}</span>
          <span>{totalCompleted} выполнено</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercise */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <div className="max-w-md mx-auto">
          {/* Exercise type badge */}
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary mb-4">
            {exerciseTypeLabels[currentExercise.type]}
          </span>

          {/* Exercise content */}
          {renderExercise()}

          {/* Hint */}
          {currentExercise.hint && !isCorrect && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? currentExercise.hint : 'Показать подсказку'}
            </button>
          )}

          {/* Feedback */}
          {isCorrect !== null && (
            <div
              className={`mt-4 p-4 rounded-xl animate-fade-in ${
                isCorrect ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-destructive/20 border border-destructive/30'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <X className="w-5 h-5 text-destructive" />
                )}
                <span className={isCorrect ? 'text-emerald-400' : 'text-destructive'}>
                  {isCorrect ? '¡Correcto!' : 'Неправильно'}
                </span>
              </div>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground mt-2">
                  Правильный ответ: <span className="text-foreground">{currentExercise.answer}</span>
                </p>
              )}
            </div>
          )}

          {completedExercises.has(currentExercise.id) && isCorrect === null && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Упражнение уже выполнено
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={prevExercise}
            disabled={currentExerciseIndex === 0}
            className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {isCorrect === null && !completedExercises.has(currentExercise.id) ? (
            <button
              onClick={checkAnswer}
              disabled={
                (currentExercise.type === 'multiChoice' && !selectedOption) ||
                (currentExercise.type !== 'multiChoice' && !userAnswer.trim())
              }
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              Проверить
            </button>
          ) : (
            <button
              onClick={currentExerciseIndex < exercises.length - 1 ? nextExercise : onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <span>{currentExerciseIndex < exercises.length - 1 ? 'Далее' : 'Завершить'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
