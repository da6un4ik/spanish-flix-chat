import { useState } from 'react';
import { Idiom } from '@/data/idioms';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface IdiomCardProps {
  idiom: Idiom;
  onLearn?: (id: string) => void;
  isLearned?: boolean;
  featured?: boolean;
}

export const IdiomCard = ({ idiom, onLearn, isLearned, featured = false }: IdiomCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    beginner: 'bg-emerald-500/20 text-emerald-400',
    intermediate: 'bg-amber-500/20 text-amber-400',
    advanced: 'bg-rose-500/20 text-rose-400',
  };

  const difficultyLabels = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  if (featured) {
    return (
      <div className="relative rounded-xl overflow-hidden hero-gradient p-6 md:p-8 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-1 rounded bg-primary/20 text-primary">
              Идиома дня
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${difficultyColors[idiom.difficulty]}`}>
              {difficultyLabels[idiom.difficulty]}
            </span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-3">
            {idiom.spanish}
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            Буквально: "{idiom.literal}"
          </p>
          
          <div className="bg-card/50 backdrop-blur rounded-lg p-4 mb-4">
            <p className="text-foreground font-medium mb-2">{idiom.meaning}</p>
            <p className="text-sm text-muted-foreground italic">"{idiom.example}"</p>
          </div>
          
          <button
            onClick={() => onLearn?.(idiom.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isLearned
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow'
            }`}
          >
            {isLearned ? (
              <>
                <Check className="w-4 h-4" />
                Изучено
              </>
            ) : (
              'Отметить как изученное'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="idiom-card card-shine min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] flex-shrink-0"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${difficultyColors[idiom.difficulty]}`}>
            {difficultyLabels[idiom.difficulty]}
          </span>
          {isLearned && <Check className="w-4 h-4 text-emerald-400" />}
        </div>
        
        <h3 className="font-display text-lg md:text-xl text-foreground leading-tight mb-1">
          {idiom.spanish}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-2">
          {idiom.category}
        </p>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">
              Буквально: {idiom.literal}
            </p>
            <p className="text-sm text-foreground mb-2">{idiom.meaning}</p>
            <p className="text-xs text-muted-foreground italic">"{idiom.example}"</p>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLearn?.(idiom.id);
              }}
              className={`mt-3 w-full flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                isLearned
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {isLearned ? 'Изучено ✓' : 'Изучить'}
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};
