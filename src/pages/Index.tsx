import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { IdiomCard } from '@/components/IdiomCard';
import { CategoryRow } from '@/components/CategoryRow';
import { CategoryFilter } from '@/components/CategoryFilter';
import { idioms, categories } from '@/data/idioms';

const Index = () => {
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const handleLearn = (id: string) => {
    setLearnedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredIdiom = idioms[0];
  
  const filteredIdioms = useMemo(() => {
    if (selectedCategory === 'Все') return idioms;
    return idioms.filter((idiom) => idiom.category === selectedCategory);
  }, [selectedCategory]);

  const idiomsByCategory = useMemo(() => {
    const grouped: Record<string, typeof idioms> = {};
    categories.slice(1).forEach((cat) => {
      grouped[cat] = idioms.filter((idiom) => idiom.category === cat);
    });
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header streak={learnedIds.size} />
      
      <main className="px-4 py-6 pb-20 max-w-4xl mx-auto">
        {/* Featured Idiom */}
        <IdiomCard
          idiom={featuredIdiom}
          featured
          isLearned={learnedIds.has(featuredIdiom.id)}
          onLearn={handleLearn}
        />
        
        {/* Progress */}
        <div className="mt-6">
          <ProgressBar learned={learnedIds.size} total={idioms.length} />
        </div>
        
        {/* Category Filter */}
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        {/* Content based on filter */}
        {selectedCategory === 'Все' ? (
          // Show all categories as rows
          <>
            {categories.slice(1).map((category) => (
              <CategoryRow
                key={category}
                title={category}
                idioms={idiomsByCategory[category]}
                learnedIds={learnedIds}
                onLearn={handleLearn}
              />
            ))}
          </>
        ) : (
          // Show filtered grid
          <div className="mt-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredIdioms.map((idiom) => (
                <IdiomCard
                  key={idiom.id}
                  idiom={idiom}
                  isLearned={learnedIds.has(idiom.id)}
                  onLearn={handleLearn}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border">
        <div className="flex justify-around py-3 max-w-4xl mx-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-[10px] font-medium">Изученные</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
            <span className="text-[10px] font-medium">Настройки</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
