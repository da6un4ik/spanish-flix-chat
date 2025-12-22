import { useState } from 'react';
import { Idiom } from '@/data/idioms';
import { RotateCcw, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashCardProps {
  idioms: Idiom[];
  learnedIds: Set<string>;
  onLearn: (id: string) => void;
}

export const FlashCard = ({ idioms, learnedIds, onLearn }: FlashCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentIdiom = idioms[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % idioms.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + idioms.length) % idioms.length);
    }, 200);
  };

  const handleKnow = () => {
    if (!learnedIds.has(currentIdiom.id)) {
      onLearn(currentIdiom.id);
    }
    handleNext();
  };

  const handleDontKnow = () => {
    handleNext();
  };

  if (!currentIdiom) return null;

  return (
    <div className="flex flex-col items-center py-6 animate-fade-in">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {idioms.length}
        </span>
        <div className="flex gap-1">
          {idioms.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-primary w-4'
                  : idx < currentIndex
                  ? 'bg-primary/50'
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div
        className="relative w-full max-w-sm h-[320px] cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-card to-secondary p-6 flex flex-col items-center justify-center backface-hidden border border-border"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs text-primary font-medium mb-4">ИСПАНСКАЯ ИДИОМА</span>
            <h2 className="font-display text-3xl text-center text-foreground mb-4">
              {currentIdiom.spanish}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Буквально: "{currentIdiom.literal}"
            </p>
            <div className="absolute bottom-6 flex items-center gap-2 text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              <span className="text-xs">Нажми, чтобы перевернуть</span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-card p-6 flex flex-col items-center justify-center border border-primary/30"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="text-xs text-primary font-medium mb-4">ЗНАЧЕНИЕ</span>
            <p className="text-xl text-center text-foreground font-medium mb-4">
              {currentIdiom.meaning}
            </p>
            <div className="bg-background/50 rounded-lg p-3 w-full">
              <p className="text-sm text-muted-foreground italic text-center">
                "{currentIdiom.example}"
              </p>
            </div>
            {learnedIds.has(currentIdiom.id) && (
              <span className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
                Изучено ✓
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <button
          onClick={handleDontKnow}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="font-medium">Не знаю</span>
        </button>

        <button
          onClick={handleKnow}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Знаю</span>
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};
