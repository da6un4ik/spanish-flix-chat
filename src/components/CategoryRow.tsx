import { Idiom } from '@/data/idioms';
import { IdiomCard } from './IdiomCard';
import { ChevronRight } from 'lucide-react';

interface CategoryRowProps {
  title: string;
  idioms: Idiom[];
  learnedIds: Set<string>;
  onLearn: (id: string) => void;
}

export const CategoryRow = ({ title, idioms, learnedIds, onLearn }: CategoryRowProps) => {
  if (idioms.length === 0) return null;

  return (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="font-display text-xl md:text-2xl text-foreground">{title}</h2>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          Все <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="category-row -mx-4 px-4">
        {idioms.map((idiom) => (
          <IdiomCard
            key={idiom.id}
            idiom={idiom}
            isLearned={learnedIds.has(idiom.id)}
            onLearn={onLearn}
          />
        ))}
      </div>
    </div>
  );
};
