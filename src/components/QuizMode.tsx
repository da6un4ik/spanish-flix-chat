import { useState, useMemo } from 'react';
import { Idiom } from '@/data/idioms';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface QuizModeProps {
  idioms: Idiom[];
  onLearn: (id: string) => void;
}

interface Question {
  idiom: Idiom;
  options: string[];
  correctAnswer: string;
}

export const QuizMode = ({ idioms, onLearn }: QuizModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { playCorrectSound, playWrongSound, playSuccessSound } = useSoundEffects();

  const questions: Question[] = useMemo(() => {
    return idioms.map((idiom) => {
      const wrongAnswers = idioms
        .filter((i) => i.id !== idiom.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((i) => i.meaning);

      const options = [...wrongAnswers, idiom.meaning].sort(() => Math.random() - 0.5);

      return {
        idiom,
        options,
        correctAnswer: idiom.meaning,
      };
    });
  }, [idioms]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setScore((prev) => prev + 1);
      onLearn(currentQuestion.idiom.id);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      playSuccessSound();
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="flex flex-col items-center py-12 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-pulse-glow">
          <Trophy className="w-10 h-10 text-primary" />
        </div>

        <h2 className="font-display text-4xl text-foreground mb-2">Результат</h2>
        <p className="text-muted-foreground mb-8">Квиз завершён!</p>

        <div className="bg-card rounded-2xl p-8 w-full max-w-sm text-center border border-border">
          <div className="text-6xl font-display text-primary mb-2">{percentage}%</div>
          <p className="text-foreground text-lg mb-1">
            {score} из {questions.length} правильно
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage >= 80
              ? '¡Excelente! Отличный результат!'
              : percentage >= 50
              ? '¡Bien! Хороший результат!'
              : 'Продолжай практиковаться!'}
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">Начать заново</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 animate-fade-in">
      {/* Progress */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Вопрос {currentIndex + 1} из {questions.length}</span>
          <span>Счёт: {score}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm border border-border mb-6">
        <span className="text-xs text-primary font-medium">ЧТО ОЗНАЧАЕТ?</span>
        <h2 className="font-display text-2xl text-foreground mt-2">
          {currentQuestion.idiom.spanish}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Буквально: "{currentQuestion.idiom.literal}"
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm space-y-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === currentQuestion.correctAnswer;

          let bgClass = 'bg-secondary hover:bg-secondary/80';
          let borderClass = 'border-transparent';

          if (selectedAnswer) {
            if (isCorrectOption) {
              bgClass = 'bg-emerald-500/20';
              borderClass = 'border-emerald-500';
            } else if (isSelected && !isCorrect) {
              bgClass = 'bg-destructive/20';
              borderClass = 'border-destructive';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${borderClass} ${
                selectedAnswer ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {selectedAnswer && isCorrectOption && (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
                {selectedAnswer && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {selectedAnswer && (
        <div className="mt-6 animate-fade-in">
          <p
            className={`text-center mb-4 font-medium ${
              isCorrect ? 'text-emerald-400' : 'text-destructive'
            }`}
          >
            {isCorrect ? '¡Correcto! Правильно!' : '¡Incorrecto! Неправильно'}
          </p>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mx-auto"
          >
            <span className="font-medium">
              {currentIndex < questions.length - 1 ? 'Следующий' : 'Результаты'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
